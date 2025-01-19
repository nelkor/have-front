import {
  goToOpenFundPage,
  goToClosedFundPage,
  goToInstructionPage,
} from './router'
import { connect } from './connect'
import { initOpenFund, initClosedFund } from './pages'

const init = async () => {
  try {
    const connection = await connect()

    if (connection.isOpen) {
      goToOpenFundPage()
      initOpenFund(connection)
    } else {
      goToClosedFundPage()
      initClosedFund(connection)
    }
  } catch (e) {
    goToInstructionPage()
  }
}

void init()
