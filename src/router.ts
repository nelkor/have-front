const openFundPage = document.getElementById('page-open') as HTMLElement
const loadingPage = document.getElementById('page-loading') as HTMLElement
const closedFundPage = document.getElementById('page-close') as HTMLElement
const instructionPage = document.getElementById('page-instruction') as HTMLElement

export const goToInstructionPage = () => {
  loadingPage.classList.add('hidden')
  instructionPage.classList.remove('hidden')
}

export const goToOpenFundPage = () => {
  loadingPage.classList.add('hidden')
  openFundPage.classList.remove('hidden')
}

export const goToClosedFundPage = () => {
  loadingPage.classList.add('hidden')
  closedFundPage.classList.remove('hidden')
}
