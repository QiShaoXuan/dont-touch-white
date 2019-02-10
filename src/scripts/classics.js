class Classics {
  constructor(options) {
    this.container = document.querySelector(options.container)
    this.scoreContainer = document.querySelector(options.scoreContainer)
    this.timeContainer = document.querySelector(options.timeContainer)

    this.overModal = document.querySelector(options.over.modal)
    this.scoreSpan = document.querySelector(options.over.score)
    this.historyscoreSpan = document.querySelector(options.over.historyScore)

    this.containerHeight = this.container.getClientRects()[0]['height']
    this.bodyHeight = document.body.getClientRects()[0]['height']

    this.frame = null

    this.status = 0 // 0 暂停 ， 1 正在进行

    this.score = 0

    this.historyScore = localStorage.getItem('donttouchwhiteClassics') ? Number(localStorage.getItem('donttouchwhiteClassics')) : 0 // 经典模式历史记录

  }

  init() {
    const that = this
    this.score = 0

    this.container.innerHTML = ''
    this.scoreContainer.innerHTML = this.score

    this.container.onclick = function (e) {
      e.stopPropagation()
      var index = [].indexOf.call(e.target.parentNode.parentNode.querySelectorAll(e.target.tagName), e.target.parentNode)

      if (e.target.classList.contains('cube')) {
        if (e.target.classList.contains('black') && index === 5) {
          that.updateScore()
          that.animate()
        } else {
          that.gameover()
        }
      }
    }
  }

  updateScore() {
    this.score += 1
    this.scoreContainer.innerHTML = this.score
  }

  timeout(container, second) {
    let sec = second - 1

    if (this.status === 0) return

    if (sec >= 0) {
      setTimeout(() => {
        container.innerText = sec
        this.timeout(container, sec)
      }, 1000)
    } else {
      this.gameover()
    }
  }

  animate() {
    this.container.appendChild(this.setRow())
    this.container.removeChild(this.container.firstElementChild)
  }

  gameover() {
    this.status = 0
    this.overModal.style.display = 'flex'

    if (this.score > this.historyScore) {
      this.updateHistoryScore(this.score)
      this.historyScore = this.score
    }

    this.scoreSpan.innerHTML = this.score
    this.historyscoreSpan.innerHTML = this.historyScore
  }

  updateHistoryScore(score) {
    localStorage.setItem('donttouchwhiteClassics', score)
  }

  start() {
    this.status = 1
    this.init()

    const lines = 7
    for (let i = 0; i < lines; i++) {
      this.container.appendChild(this.setRow())
    }


    this.timeout(this.timeContainer, 60)
  }

  setRow() {
    const dom = document.createElement('div')
    dom.innerHTML = `<div class="row">${this.setCube(this.getRandom())}</div>`
    return dom.firstChild
  }

  setCube(random, num = 4) {
    let cubeStr = ''
    for (let i = 0; i < num; i++) {
      cubeStr += `<div class="cube ${i === random ? 'black' : ''}"></div>`
    }
    return cubeStr
  }

  getRandom() {
    return parseInt(Math.random() * 4, 10)
  }
}
