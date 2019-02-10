"use strict";var _createClass=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var Classics=function(){function e(t){_classCallCheck(this,e),this.container=document.querySelector(t.container),this.scoreContainer=document.querySelector(t.scoreContainer),this.timeContainer=document.querySelector(t.timeContainer),this.overModal=document.querySelector(t.over.modal),this.scoreSpan=document.querySelector(t.over.score),this.historyscoreSpan=document.querySelector(t.over.historyScore),this.containerHeight=this.container.getClientRects()[0].height,this.bodyHeight=document.body.getClientRects()[0].height,this.frame=null,this.status=0,this.score=0,this.second=60,this.historyScore=localStorage.getItem("donttouchwhiteClassics")?Number(localStorage.getItem("donttouchwhiteClassics")):0}return _createClass(e,[{key:"init",value:function(){var i=this;this.score=0,this.container.innerHTML="",this.scoreContainer.innerHTML=this.score,this.timeContainer.innerText=this.second,this.container.onclick=function(t){t.stopPropagation();var e=[].indexOf.call(t.target.parentNode.parentNode.querySelectorAll(t.target.tagName),t.target.parentNode);t.target.classList.contains("cube")&&(t.target.classList.contains("black")&&5===e?(i.updateScore(),i.animate()):i.gameover())}}},{key:"updateScore",value:function(){this.score+=1,this.scoreContainer.innerHTML=this.score}},{key:"timeout",value:function(t,e){var i=this,n=e-1;0!==this.status&&(0<=n?setTimeout(function(){t.innerText=n,i.timeout(t,n)},1e3):this.gameover())}},{key:"animate",value:function(){this.container.appendChild(this.setRow()),this.container.removeChild(this.container.firstElementChild)}},{key:"gameover",value:function(){this.status=0,this.overModal.style.display="flex",this.score>this.historyScore&&(this.updateHistoryScore(this.score),this.historyScore=this.score),this.scoreSpan.innerHTML=this.score,this.historyscoreSpan.innerHTML=this.historyScore}},{key:"updateHistoryScore",value:function(t){localStorage.setItem("donttouchwhiteClassics",t)}},{key:"start",value:function(){this.status=1,this.init();for(var t=0;t<7;t++)this.container.appendChild(this.setRow());this.timeout(this.timeContainer,this.second)}},{key:"setRow",value:function(){var t=document.createElement("div");return t.innerHTML='<div class="row">'+this.setCube(this.getRandom())+"</div>",t.firstChild}},{key:"setCube",value:function(t){for(var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:4,i="",n=0;n<e;n++)i+='<div class="cube '+(n===t?"black":"")+'"></div>';return i}},{key:"getRandom",value:function(){return parseInt(4*Math.random(),10)}}]),e}();