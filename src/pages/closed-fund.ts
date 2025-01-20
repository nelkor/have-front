import { BlockchainConnection } from '../types'

const tokenSymbolSpan = document.querySelector('#close-token-symbol') as HTMLElement
const tokenAmountSpan = document.querySelector('#close-token-amount') as HTMLElement
const priceSpan = document.querySelector('#close-price') as HTMLElement

export const initClosedFund = (connection: BlockchainConnection) => {
  Object.defineProperty(window, 'connection', { value: connection })

  priceSpan.innerHTML = connection.price
  tokenSymbolSpan.innerHTML = connection.tokenSymbol

  connection.getTokenBalance().then(result => {
    tokenAmountSpan.innerHTML = parseFloat(result).toString()
  })
}
