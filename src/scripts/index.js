function $(selector, all = false) {
  return all ? document.querySelectorAll(selector) : document.querySelector(selector)
}
let gameType = ''
function initGame(type) {
  gameType = type
  switch (type){
    case 'topspeed':
      $('.topspeed-container').classList.remove('hide')
      $('.classics-container').classList.add('hide')
      break
    case 'classics':
      $('.topspeed-container').classList.add('hide')
      $('.classics-container').classList.remove('hide')
      break
  }
}

const topspeed = new Topspeed({
  container: '#topspeed-container',
  scoreContainer: '.score-container.topspeed',
  over: {
    modal: '#score-modal',
    score: '#score',
    historyScore: '#history-score'
  }
})

const classics = new Classics({
  container: '#classics-container',
  timeContainer:'#remaining-time',
  scoreContainer: '#classics-score',
  over: {
    modal: '#score-modal',
    score: '#score',
    historyScore: '#history-score'
  }
})

const topSpeedBtn = $('#topspeed-btn')//初始页面极速模式开始
const classicsBtn = $('#classics-btn')//初始页面极速模式开始
const disableBtns = $('.modal-btn.disable', true)//开发中按钮
const closeBtns = $('.modal-close-btn', true)//关闭弹窗按钮
const backBtns = $('.back-btn', true) //返回首页按钮
const resetBtn = $('#topspeed-reset')//极速模式重新开始
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

classicsBtn.addEventListener('click', function () {
  initGame('classics')
  initModal.style.display = 'none'
  classics.start()
})

backBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    $(this.dataset.modal).style.display = 'none'
    initModal.style.display = 'flex'
  })
})

resetBtn.addEventListener('click', function () {
  $(this.dataset.modal).style.display = 'none'
  switch (gameType) {
    case 'topspeed':
      topspeed.start()
      break
    case 'classics':
      classics.start()
      break
  }
})

historyBtn.addEventListener('click', function () {
  $('#history-modal').style.display = 'flex'
  $('#history-topspeed-score').innerHTML = topspeed.historyScore
  $('#history-classics-score').innerHTML = classics.historyScore
})

