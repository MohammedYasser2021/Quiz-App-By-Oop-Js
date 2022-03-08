import Quiz from './quiz.js'
class Settings {
  constructor() {
    // setting variables
    this.settingsDom = document.querySelector('.settings')
    this.quizDom = document.querySelector('.quiz')
    this.categoryDom = document.getElementById('category')
    this.nQuestions = document.querySelector('#nQuestions')
    this.startBtn = document.getElementById('start')
    this.difficultyDom = [
      document.querySelector('#easy'),
      document.querySelector('#medium'),
      document.querySelector('#hard'),
    ]
    this.quiz = {}
    // excute function startQuizApp on click on startBtn
    this.startBtn.addEventListener('click', this.startQuizApp)
  }

  // function start quiz app
  startQuizApp = async () => {
    try {
      const amount = this.getAmount()
      const categoryId = this.categoryDom.value
      const difficulty = this.getDifficulty()

      const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}`
      let { results } = await this.fetchData(url)
      console.log(results)
      this.quiz = new Quiz(this.quizDom, amount, results)
      this.toggleElements()
    } catch (err) {
      alert(err)
    }
  }

  // function to hide settings and show quiz on click on start
  toggleElements = () => {
    this.quizDom.style.display = 'block'
    this.settingsDom.style.display = 'none'
  }

  // function to choose level of difficulty of quiz
  getDifficulty = () => {
    const choosenItems = this.difficultyDom.filter((item) => item.checked)
    if (choosenItems.length === 1) {
      document.querySelector('.hint').style.display = 'none'
      return choosenItems[0].id
    } else {
      document.querySelector('.hint').style.display = 'block'
      document.querySelector('.hint').innerHTML = 'Please Level of Difficulty'
    }
  }

  // function to get number of questions that i want to show it in quiz
  getAmount = () => {
    const amount = this.nQuestions.value
    if (amount > 0 && amount < 20) {
      document.querySelector('.hint').style.display = 'none'
      return amount
    } else {
      document.querySelector('.hint').style.display = 'block'
      document.querySelector('.hint').innerHTML = 'Please Enter Valid Number'
    }
  }

  // function fetch data from api
  fetchData = async (url) => {
    const response = await fetch(url)
    const result = await response.json()
    return result
  }
}

// export class of settings to import it in file "main.js"
export default Settings
