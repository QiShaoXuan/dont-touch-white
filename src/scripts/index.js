class dtwc {
  constructor(container) {
    this.container = document.querySelector(container)

    this.containerHeight = this.container.getClientRects()[0]['height']
    this.bodyHeight = document.body.getClientRects()[0]['height']

    this.pile = 4

    this.frame = null

    this.step = 1

    this.status = 0 // 0 暂停 ， 1 正在进行

    this.init()
  }

  init() {
    this.container.appendChild(this.setRow(1))

    this.container.addEventListener('touchstart', function (e) {
      e.stopPropagation()

      if (e.target.classList.contains('cube') && e.target.classList.contains('black')) {
        e.target.classList.add('toWhite')
      }
    })

  }

  start() {
    this.status = 1
    this.animate()
  }

  animate() {
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
      that.animate()
    })

    this.checkToRemove()
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
