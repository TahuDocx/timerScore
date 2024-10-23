import { Input } from '../../input.js';
import { Teams, alphaVal, valAlpha } from '../../leaderBoard.js';
import { CountdownTimer } from '../../timer.js';

const timer = new CountdownTimer(0,10,0, [[0,10,0], [0,5,0]])
const teams = new Teams(['A - SMP Yos Sudarso Tasikmalaya', 'B - SMP Santo Yusuf 1', 'C - SMP Kristen Rehoboth'])

function plusClick(id, score=100){
  // console.log(`plus ${id.id} ${id.class}`);
  teams.plus({id: id.id, score});
}
function minusClick(id, score=100){
  // console.log(`minus ${id.id} ${id.class}`);
  teams.minus({id: id.id, score});
}
function updateScore(el){
  teams.updateScore(el);
}
function removeScore(el){
  teams.removeScore(el);
}

document.plusClick = plusClick;
document.minusClick = minusClick;
document.timer = timer;
document.updateScore = updateScore;
document.removeScore = removeScore;


const keyInput = Input(document.body);

let str = "abcdefghijklmnopqrstuvwxyz";
let chars = str.split('');
let nums = '0123456789';
let numChars = nums.split('');

let isWaiting = false;
let isDone = false;

let tmout = null;
let doneTo = null;

document.body.addEventListener("keydown", (event) => {
  if (keyInput.key_down(' ')){
    if (timer.isRunning) timer.pause();
    else timer.start();
    isDone = true;
  } else if (keyInput.key_down('r')){
    timer.restart();
    isDone = true;
  }

  if (!isWaiting && !isDone) numChars.forEach((num,i)=>{
    if (keyInput.key_down(num)){
      timer.restart(0,i,0);
      isWaiting = true;

      tmout = setTimeout(() => {
        // console.log('to');
        isWaiting = false;
      }, 1000); 
      // funcDone = true;
    }
  });
  else if (isWaiting && !isDone) numChars.forEach((num,i)=>{
    if(isDone) return;
    if (keyInput.key_down(num)){

      // console.log('next');
      clearTimeout(tmout);
      clearTimeout(doneTo);
      // console.log('test');
      tmout = setTimeout(()=>{
        // isDone = false;
        console.log('to');
        isDone = true;
        isWaiting = false;
      }, 1000)
      // console.log()

      let second = timer.minutes*60 + timer.seconds*10 + i;

      if (second > 60) {
        let minute = Math.floor(second/60);
        second = second%60;
        timer.restart(minute,second,0);
        // isDone = true;
        return;
      } else if (second === 60) {
        timer.restart(1,0,0);
        // isDone = true;
        return;
      } else {
        timer.restart(0,second,0);
      }      
      // isDone = true;
      // isWaiting = false;
    }
  });

  doneTo = setTimeout(()=>{
    isDone = false;
    // console.log("dto");
    // isWaiting = false;
  }, 1000);
})

const tabWajib = document.getElementById('tab-wajib');
const tabQWC = document.getElementById('tab-qwc');
const tabRebutan = document.getElementById('tab-rebutan');

const scoreWajib = document.getElementById('score-wajib');
const scoreQWC = document.getElementById('score-qwc');
const scoreRebutan = document.getElementById('score-rebutan');

const sectionName = document.getElementById('section-name');

// console.log(tabWajib)

// console.log(listWajib)

tabWajib.addEventListener("click", () => {
  sectionName.innerHTML = 'WAJIB';
  scoreQWC.classList.remove('active');
  scoreRebutan.classList.remove('active');
  scoreWajib.classList.add('active');
})

tabQWC.addEventListener("click", () => {
  sectionName.innerHTML = 'QUICK WORD CHALLENGE';
  scoreWajib.classList.remove('active');
  scoreRebutan.classList.remove('active');
  scoreQWC.classList.add('active');
})

tabRebutan.addEventListener("click", () => {
  sectionName.innerHTML = 'REBUTAN';
  scoreQWC.classList.remove('active');
  scoreWajib.classList.remove('active');
  scoreRebutan.classList.add('active');
})