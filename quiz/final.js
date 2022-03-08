class Final {
  constructor(correctAnswers, totalAmount) {
    this.scoreElement = document.querySelector('.score')
    this.tryAgainBtn = document.querySelector('#again')

    this.render(correctAnswers, totalAmount)
    this.tryAgainBtn.addEventListener('click', this.startAgain)
  }
  startAgain() {
    location.reload()
  }
  render(correctAnswers, totalAmount) {
    this.scoreElement.innerHTML = `You Answered ${correctAnswers} Out Of ${totalAmount} Correct`
  }
}

export default Final
