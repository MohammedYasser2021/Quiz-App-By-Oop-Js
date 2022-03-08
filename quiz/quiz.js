import Question from './questions.js'
import Final from './final.js'
class Quiz {
  constructor(quizElement, amount, questions) {
    this.quizElement = quizElement
    this.currentElement = document.querySelector('.current')
    this.totalElement = document.querySelector('.total')
    this.finalElement = document.querySelector('.final')
    this.nextBtn = document.querySelector('#next')

    this.totalAmount = amount
    this.answeredAmount = 0
    // is array of objects , every object is class of question
    this.questions = this.setQuestions(questions)

    // on click on nextBtn will get next question
    this.nextBtn.addEventListener('click', this.nextQuestion)

    // run function renderQuestion to show first question when start quiz
    this.renderQuestion()
  }
  // function to get copy of class of question in file "questions.js"
  setQuestions(questions) {
    return questions.map((question) => new Question(question))
  }

  // function to show current question
  renderQuestion() {
    this.questions[this.answeredAmount].render()
    this.currentElement.innerHTML = this.answeredAmount + 1
    this.totalElement.innerHTML = this.totalAmount
  }

  // function to show next question
  nextQuestion = () => {
    const checkElement = this.questions[
      this.answeredAmount
    ].answerElements.filter((ele) => ele.firstChild.checked)
    if (checkElement.length == 0) {
      alert('check element')
    } else {
      this.questions[this.answeredAmount].answer(checkElement)
      this.answeredAmount++
      this.answeredAmount < this.totalAmount
        ? this.renderQuestion()
        : this.endQuizApp()
    }
  }

  // function end quiz app and show final
  endQuizApp() {
    this.quizElement.style.display = 'none'
    this.finalElement.style.display = 'block'
    const correct = this.countCorrectAnswers()
    new Final(correct, this.totalAmount)
  }

  // function to count number of correct answers
  countCorrectAnswers() {
    let count = 0
    this.questions.forEach((ele) => {
      if (ele.isCorrect) {
        count++
      }
    })
    return count
  }
}

export default Quiz
