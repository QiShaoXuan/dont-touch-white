class topSpeed {
  constructor(options) {
    this.container = document.querySelector(options.container)
    this.scoreContainer = document.querySelector(options.scoreContainer)

    this.overModal = document.querySelector(options.over.modal)
    this.scoreSpan = document.querySelector(options.over.score)
    this.historyscoreSpan = document.querySelector(options.over.historyScore)

    this.containerHeight = this.container.getClientRects()[0]['height']
    this.bodyHeight = document.body.getClientRects()[0]['height']

    this.frame = null

    this.step = 3

    this.status = 0 // 0 暂停 ， 1 正在进行

    this.score = 0

    // this.historyClassicsScore = localStorage.getItem('donttouchwhiteClassics') ? Number(localStorage.getItem('donttouchwhiteClassics')) : 0 // 经典模式历史记录
    this.historyScore = localStorage.getItem('donttouchwhiteTopspeed') ? Number(localStorage.getItem('donttouchwhiteTopspeed')) : 0 // 极速模式历史记录

    // 初始正确六个难度增加（速度加快），每次增加 basic 累加 2
    // increaseBasic 用于记录上次累加
    this.increaseBasic = 6
    this.lastIncrease = 0

    // this.init()
  }

  init() {
    const that = this

    this.container.innerHTML = ''
    this.container.appendChild(this.setRow(1))

    this.increaseBasic = 6
    this.lastIncrease = 0

    this.initScore()

    this.container.onclick = function (e) {
      e.stopPropagation()

      if (e.target.classList.contains('cube')) {
        if (e.target.classList.contains('black')) {
          e.target.classList.remove('black')
          that.updateScore()
          that.checkIncreaseifficulty()
        } else {
          that.gameover()
        }
      }
    }
  }


  initScore() {
    this.score = 0
    this.scoreContainer.innerHTML = this.score

  }

  updateScore() {
    this.score += 1
    this.scoreContainer.innerHTML = this.score
  }

  checkIncreaseifficulty() {
    if (this.score - this.lastIncrease === this.increaseBasic) {
      this.lastIncrease = this.score

      this.increaseBasic += 1
      this.step += .5
    }
  }

  start() {
    this.status = 1

    this.init()

    this.animateTopspeed()
  }

  animateTopspeed() {
    this.checkToAppend()

    const rows = this.container.querySelectorAll('.row')
    const that = this

    rows.forEach((row) => {
      let y = Number(row.dataset['y'])
      row.style.transform = `translateY(${y + this.step}px)`
      row.dataset['y'] = y + this.step
    })

    this.container.lastElementChild
    this.frame = requestAnimationFrame(function () {
      that.animateTopspeed()
    })
    this.checkBlackToBottom()
    this.checkToRemove()
  }

  checkBlackToBottom() {
    const first = this.container.firstElementChild

    if (Number(first.dataset['y']) > this.bodyHeight && ([].filter.call(first.childNodes, (cube) => cube.classList.contains('black')).length) === 1) {
      this.gameover()
    }
  }

  gameover() {
    this.pause()
    this.overModal.style.display = 'flex'

    if(this.score > this.historyScore){
      this.updateHistoryScore(this.score)
      this.historyScore = this.score
    }

    this.scoreSpan.innerHTML =  this.score
    this.historyscoreSpan.innerHTML = this.historyScore
  }
  updateHistoryScore(score){
    localStorage.setItem('donttouchwhiteTopspeed',score)
  }
  pause() {
    this.status = 0
    cancelAnimationFrame(this.frame)
  }

  checkToAppend() {
    const last = this.container.lastElementChild
    if (Number(last.dataset['y']) + this.step >= this.containerHeight) {
      this.container.appendChild(this.setRow(1))
    }
  }

  checkToRemove() {
    const first = this.container.firstElementChild
    if (Number(first.dataset['y']) > (this.bodyHeight + this.containerHeight)) {
      this.container.removeChild(first)
    }
  }

  setRow(line = 1) {
    const dom = document.createElement('div')
    let rowStr = ''
    for (let i = 0; i < line; i++) {
      rowStr += `<div class="row" data-y="0">${this.setCube(this.getRandom())}</div>`
    }
    dom.innerHTML = rowStr
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
