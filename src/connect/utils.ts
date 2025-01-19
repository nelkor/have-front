import { JsonRpcApiProvider } from 'ethers'

import { TransactionFn } from '../types'

export const createCallFunction = (provider: JsonRpcApiProvider) =>
  async (fn: TransactionFn) => {
    try {
      await provider.waitForTransaction((await fn()).hash)

      return true
    } catch (e) {
      return false
    }
  }

export const unscaleAmount = (amount: bigint, decimals: number) => {
  const rawBalance = amount.toString().padStart(decimals + 1, '0')

  return rawBalance.slice(0, -decimals) + '.' + rawBalance.slice(-decimals)
}
