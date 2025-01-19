import { ethers, Eip1193Provider } from 'ethers'

import { fundAbi } from './fund-abi'
import { tokenAbi } from './token-abi'
import { BlockchainConnection } from '../types'
import { unscaleAmount, createCallFunction } from './utils'

const NETWORK_ID = 43113n
const TOKEN_DECIMALS = 18
const FUND_ADDRESS = '0x27DDEc5cFF2DDC87CDd89084f533292333D15Fa2'

export const connect = async (): Promise<BlockchainConnection> => {
  if (!('ethereum' in window)) {
    throw new Error('No wallet found')
  }

  const provider = new ethers.BrowserProvider(ethereum as Eip1193Provider)

  const { chainId } = await provider.getNetwork()

  if (chainId !== NETWORK_ID) {
    throw new Error('Wrong network')
  }

  const signer = await provider.getSigner()

  const fundContract = new ethers.Contract(FUND_ADDRESS, fundAbi, signer)

  const dollarAddress = await fundContract['dollar']()
  const tokenAddress = await fundContract['fundToken']()

  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer)
  const dollarContract = new ethers.Contract(dollarAddress, tokenAbi, signer)

  const isOpen = await fundContract['isOpen']()
  const tokenSymbol = await tokenContract['symbol']()
  const dollarSymbol = await dollarContract['symbol']()
  const dollarDecimals = Number(await dollarContract['decimals']())
  const price = unscaleAmount(await fundContract['price'](), TOKEN_DECIMALS)

  const call = createCallFunction(provider)

  return {
    price,
    isOpen,
    tokenSymbol,
    dollarSymbol,
    approveDollar(amount: string) {
      const scaledAmount = ethers.parseUnits(amount, dollarDecimals)

      return call(() => dollarContract['approve'](FUND_ADDRESS, scaledAmount))
    },
    buy(amount: string) {
      const scaledAmount = ethers.parseUnits(amount, dollarDecimals)

      return call(() => fundContract['buy'](scaledAmount))
    },
    sell(amount: string) {
      const scaledAmount = ethers.parseUnits(amount, TOKEN_DECIMALS)

      return call(() => fundContract['sell'](scaledAmount))
    },
    async getDollarBalance() {
      return unscaleAmount(
        await dollarContract['balanceOf'](signer.address),
        dollarDecimals,
      )
    },
    async getTokenBalance() {
      return unscaleAmount(
        await tokenContract['balanceOf'](signer.address),
        TOKEN_DECIMALS,
      )
    },
  }
}
