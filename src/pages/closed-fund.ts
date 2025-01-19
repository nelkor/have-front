import { BlockchainConnection } from '../types'

export const initClosedFund = (connection: BlockchainConnection) => {
  Object.defineProperty(window, 'connection', { value: connection })
}
