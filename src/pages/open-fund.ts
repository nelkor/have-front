import { BlockchainConnection } from '../types'

const dollarSymbolSpan = document.querySelector('#open-dollar-symbol') as HTMLElement
const dollarAmountSpan = document.querySelector('#open-dollar-amount') as HTMLElement
const tokenSymbolSpan = document.querySelector('#open-token-symbol') as HTMLElement
const tokenAmountSpan = document.querySelector('#open-token-amount') as HTMLElement
const dollarPriceSymbolSpan = document.querySelector('#open-dollar-price-symbol') as HTMLElement
const tokenPriceSymbolSpan = document.querySelector('#open-token-price-symbol') as HTMLElement
const priceSpan = document.querySelector('#open-price') as HTMLElement
const sellInput = document.querySelector('#input-sell') as HTMLInputElement
const sellButton = document.querySelector('#button-sell') as HTMLButtonElement

const renderBalance = (connection: BlockchainConnection) => Promise.all([
  connection.getDollarBalance(),
  connection.getTokenBalance(),
]).then(([dollars, tokens]) => {
  dollarAmountSpan.innerHTML = parseFloat(dollars).toString()
  tokenAmountSpan.innerHTML = parseFloat(tokens).toString()
})

const createSellHandler = (connection: BlockchainConnection) => () => {
  const amount = Number(sellInput.value)
  const stringAmount = amount.toString()

  if (stringAmount !== sellInput.value) {
    alert('Неверный формат числа')

    sellInput.value = ''
  }

  sellInput.disabled = true
  sellButton.disabled = true

  connection.sell(stringAmount).then(success => {
    sellInput.value = ''
    sellInput.disabled = false
    sellButton.disabled = false

    if (success) {
      void renderBalance(connection)

      alert('Акции успешно проданы!')
    } else {
      alert('Попытка продажи акций завершилась неудачей')
    }
  })
}

export const initOpenFund = (connection: BlockchainConnection) => {
  Object.defineProperty(window, 'connection', { value: connection })

  dollarSymbolSpan.innerHTML = connection.dollarSymbol
  tokenSymbolSpan.innerHTML = connection.tokenSymbol
  dollarPriceSymbolSpan.innerHTML = connection.dollarSymbol
  tokenPriceSymbolSpan.innerHTML = connection.tokenSymbol
  priceSpan.innerHTML = parseFloat(connection.price).toString()

  void renderBalance(connection)

  sellButton.addEventListener('click', createSellHandler(connection))
}
