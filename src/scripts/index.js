function $(selector, all = false) {
  return all ? document.querySelectorAll(selector) : document.querySelector(selector)
}

function initGame(type) {
  switch (type){
    case 'topspeed':
      $('.score-container.topspeed').style.display = 'block'
      $('.score-container.classics').style.display = 'none'
      break
    case 'classics':
      $('.score-container.topspeed').style.display = 'none'
      $('.score-container.classics').style.display = 'block'
      break
  }
}

let topspeed = new topSpeed({
  container: '.container',
  scoreContainer: '.score-container.topspeed',
  over: {
    modal: '#score-modal',
    score: '#score',
    historyScore: '#history-score'
  }
})

const topSpeedBtn = $('#topspeed-btn')//初始页面极速模式开始
const disableBtns = $('.modal-btn.disable', true)//开发中按钮
const closeBtns = $('.modal-close-btn', true)//关闭弹窗按钮
const backBtns = $('.back-btn', true) //返回首页按钮
const topspeedResetBtn = $('#topspeed-reset')//极速模式重新开始
const historyBtn = $('#history-btn')

const initModal = $('#init-modal')//  初始弹窗

disableBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    $('#coding-modal').style.display = 'flex'
  })
})

closeBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    $(this.dataset.modal).style.display = 'none'
  })
})

topSpeedBtn.addEventListener('click', function () {
  initGame('topspeed')
  initModal.style.display = 'none'
  topspeed.start()
})

backBtns.forEach((btn) => {

  btn.addEventListener('click', function () {
    $(this.dataset.modal).style.display = 'none'
    initModal.style.display = 'flex'
  })
})
topspeedResetBtn.addEventListener('click', function () {
  $(this.dataset.modal).style.display = 'none'
  topspeed.start()
})

historyBtn.addEventListener('click', function () {
  initModal.style.display = 'none'
  $('#history-modal').style.display = 'flex'
  $('#topspeed-score').innerHTML = topspeed.historyScore
})
