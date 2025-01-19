import { TransactionResponse } from 'ethers'

export type TransactionFn = () => Promise<TransactionResponse>

export interface BlockchainConnection {
  price: string
  isOpen: boolean
  tokenSymbol: string
  dollarSymbol: string
  getTokenBalance: () => Promise<string>
  getDollarBalance: () => Promise<string>
  buy: (amount: string) => Promise<boolean>
  sell: (amount: string) => Promise<boolean>
  approveDollar: (amount: string) => Promise<boolean>
}
