const minutesElementConst = document.getElementById("minutes");
const secondsElementConst = document.getElementById("seconds");
const sixtiethElementConst = document.getElementById("sixtieth");

const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const sixtiethElement = document.getElementById("sixtieth");

const buttonsElement = document.getElementById("buttons")

const startButton = document.querySelector(".start.button")
const restartButton = document.querySelector(".restart.button")
const pauseButton = document.querySelector(".pause.button")
const stopButton = document.querySelector(".stop.button")

class CountdownTimer{
  constructor(initialMinutes = 10, initialSeconds = 0, initialSixtieth = 0, buttons=[]){
    this.initialMinutes = initialMinutes;
    this.initialSeconds = initialSeconds;
    this.initialSixtieth = initialSixtieth;

    this.minutes = initialMinutes;
    this.seconds = initialSeconds;
    this.sixtieth = initialSixtieth;

    // console.log(`${this.minutes}m ${this.seconds}s ${this.sixtieth}ss`)

    // this.minutesElement = document.getElementById(minutesElementId);
    // this.secondsElement = document.getElementById(secondsElementId);
    // this.sixtiethElement = document.getElementById(sixtiethElementId);
    
    // const minutesElement = document.getElementById(minutesElementId);
    // const secondsElement = document.getElementById(secondsElementId);
    // const sixtiethElement = document.getElementById(sixtiethElementId);

    this.updateElements()

    this.isRunning = false;
    // console.log(buttons);
    // this.buttons(buttons);
  }

  buttons(args){
    let elements = '';
    if (args){
      args.forEach(arg => {
        let symbol = '';
        if (arg[0]) symbol+=`${arg[0]}m`;
        if (arg[1]) symbol+=`${arg[1]}s`;
        if (arg[2]) symbol+=`${arg[2]}ss`;

        elements += `
        <div class="restartFrom${symbol} button" 
          onclick="timer.restart(${arg[0]}, ${arg[1]}, ${arg[2]})">
            ${symbol}
        </div>
        `

      });
    } else {
      elements += `<div class="restart button" onclick="timer.restart()">Restart</div>`
    }

    elements += `
      <div class="start button" onclick="timer.start()">Start</div>
      <div class="pause button" onclick="timer.pause()">Pause</div>
      <div class="stop button" onclick="timer.stop()">Stop</div>
    `
    buttonsElement.innerHTML = elements;
  }

  update(){
    // console.log(`update ${this.seconds}.${this.sixtieth}`);

    this.sixtieth--;
    // console.log(`${this.minutes}:${this.seconds}`)

    if (this.sixtieth < 0) {
      this.sixtieth = 59;
      this.seconds--;
    }

    if (this.seconds < 0) {
      this.seconds = 59;
      this.minutes--;
    }

    if (this.minutes === 0 && this.seconds === 0 && this.sixtieth === 0) {
      this.pause();
    }
  }
  
  updateElements(){
    // console.log('updateElements');

    minutesElement.textContent = this.minutes.toString().padStart(2, "0");
    secondsElement.textContent = this.seconds.toString().padStart(2, "0");
    sixtiethElement.textContent = this.sixtieth.toString().padStart(2, "0");
  }

  start(){
    // console.log('start');
    if (this.isRunning) return;

    this.isRunning = true;

    if (this.minutes === 0 && this.seconds === 0 && this.sixtieth === 0) return;

    this.interval = setInterval(() => {
      this.update();
      this.updateElements();
    }, 1000 / 60);
  }

  restart(minutes = this.initialMinutes, seconds = this.initialSeconds, sixtieth = this.initialSixtieth){
    // console.log('restart');
    this.pause();

    this.initialMinutes = minutes;
    this.initialSeconds = seconds;
    this.initialSixtieth = sixtieth;

    this.minutes = minutes;
    this.seconds = seconds;
    this.sixtieth = sixtieth;

    this.updateElements();
  }

  pause(){
    if (!this.isRunning) return;

    // console.log('pause');
    this.isRunning = false;
    clearInterval(this.interval);
  }

  stop(){
    // console.log('stop');
    this.pause();
    this.restart();
  }
}

export { CountdownTimer };