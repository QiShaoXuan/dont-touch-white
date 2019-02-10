"use strict";var _createClass=function(){function s(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(e,t,i){return t&&s(e.prototype,t),i&&s(e,i),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Topspeed=function(){function t(e){_classCallCheck(this,t),this.container=document.querySelector(e.container),this.scoreContainer=document.querySelector(e.scoreContainer),this.overModal=document.querySelector(e.over.modal),this.scoreSpan=document.querySelector(e.over.score),this.historyscoreSpan=document.querySelector(e.over.historyScore),this.containerHeight=this.container.getClientRects()[0].height,this.bodyHeight=document.body.getClientRects()[0].height,this.frame=null,this.step=3,this.status=0,this.score=0,this.historyScore=localStorage.getItem("donttouchwhiteTopspeed")?Number(localStorage.getItem("donttouchwhiteTopspeed")):0,this.increaseBasic=6,this.lastIncrease=0}return _createClass(t,[{key:"init",value:function(){var t=this;this.container.innerHTML="",this.container.appendChild(this.setRow()),this.step=3,this.increaseBasic=6,this.lastIncrease=0,this.score=0,this.scoreContainer.innerHTML=this.score,this.container.onclick=function(e){e.stopPropagation(),e.target.classList.contains("cube")&&(e.target.classList.contains("black")?(e.target.classList.remove("black"),t.updateScore(),t.checkIncreaseDifficulty()):t.gameover())}}},{key:"updateScore",value:function(){this.score+=1,this.scoreContainer.innerHTML=this.score}},{key:"checkIncreaseDifficulty",value:function(){this.score-this.lastIncrease===this.increaseBasic&&(this.lastIncrease=this.score,this.increaseBasic+=1,this.step+=.5)}},{key:"start",value:function(){this.status=1,this.init(),this.animateTopspeed()}},{key:"animateTopspeed",value:function(){var i=this;this.checkToAppend();var e=this.container.querySelectorAll(".row"),t=this;e.forEach(function(e){var t=Number(e.dataset.y);e.style.transform="translateY("+(t+i.step)+"px)",e.dataset.y=t+i.step}),this.container.lastElementChild,this.frame=requestAnimationFrame(function(){t.animateTopspeed()}),this.checkBlackToBottom(),this.checkToRemove()}},{key:"checkBlackToBottom",value:function(){var e=this.container.firstElementChild;Number(e.dataset.y)>this.bodyHeight&&1===[].filter.call(e.childNodes,function(e){return e.classList.contains("black")}).length&&this.gameover()}},{key:"gameover",value:function(){this.pause(),this.overModal.style.display="flex",this.score>this.historyScore&&(this.updateHistoryScore(this.score),this.historyScore=this.score),this.scoreSpan.innerHTML=this.score,this.historyscoreSpan.innerHTML=this.historyScore}},{key:"updateHistoryScore",value:function(e){localStorage.setItem("donttouchwhiteTopspeed",e)}},{key:"pause",value:function(){this.status=0,cancelAnimationFrame(this.frame)}},{key:"checkToAppend",value:function(){var e=this.container.lastElementChild;Number(e.dataset.y)+this.step>=this.containerHeight&&this.container.appendChild(this.setRow())}},{key:"checkToRemove",value:function(){var e=this.container.firstElementChild;Number(e.dataset.y)>this.bodyHeight+this.containerHeight&&this.container.removeChild(e)}},{key:"setRow",value:function(){var e=document.createElement("div");return e.innerHTML='<div class="row" data-y="0">'+this.setCube(this.getRandom())+"</div>",e.firstChild}},{key:"setCube",value:function(e){for(var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:4,i="",s=0;s<t;s++)i+='<div class="cube '+(s===e?"black":"")+'"></div>';return i}},{key:"getRandom",value:function(){return parseInt(4*Math.random(),10)}}]),t}();