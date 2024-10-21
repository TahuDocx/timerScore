const teamsElement = document.getElementById("teams");
const LeaderBoardElement = document.getElementById("leaderboard");
const scoreBoard = document.querySelector('.scoreboard .teams');

function sortFunction(a, b) {
  let x = a.scores.sumScore(), y = b.scores.sumScore();
  if (x === y) {
      return 0;
  }
  else {
      return (x > y) ? -1 : 1;
  }
}

function sortFunc(a, b) {
  if (a[0] === b[0]) {
      return 0;
  }
  else {
      return (a[0] < b[0]) ? -1 : 1;
  }
}

const alphaVal = (s, x=0) => {
  // console.log(`${s} to ${s.toLowerCase().charCodeAt(0) - x}`)
  return s.toLowerCase().charCodeAt(0) - x;
}

const valAlpha = (s, x=0) => {
  console.log(`${s} to ${s + 'A'.charCodeAt(x)}`)
  return String.fromCharCode(s + 'A'.charCodeAt(x))
}

// let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+=-_";
// let arrStr = str.split('');
// let arr = [];
// arrStr.forEach((char, i) =>{
//   // console.log(`"${char}": ${alphaVal(char)},`);
//   arr.push([i, char]);
// })
// arr.sort(sortFunc);
// console.log(arr.toString());

class TeamScore{
  constructor(teamId){
    this.id = teamId;
    this.element = null;
    // console.log(this.element);
    this.scoreWajib = [];
    this.scoreQWC = [];
    this.scoreRebutan = [];
  }
  setElement(){
    this.element = document.getElementById(`score_${this.id}`);
    this.updateEl();
  }
  updateEl(){
    let el = this.setElScoreWajib() + this.setElScoreQWC() + this.setElScoreRebutan();
    this.element.innerHTML = el;
  }
  setElScoreWajib(){
    let temp = `
      <div class="listscore wajib">
        <div class="buttons">
          <div class="button minus" id="minus_wajib_${this.id}" onclick="updateScore(this)">-</div>
          <div class="button plus" id="plus_wajib_${this.id}" onclick="updateScore(this)">+</div>
        </div>
        <div class="list">
    `

    let score;
    for(let i=0; i<10; i++){
      score = (this.scoreWajib[i] || this.scoreWajib[i] === 0) ? this.scoreWajib[i] : '';
      temp += `<div class="score">${score}</div>`;
    }

    // this.scoreWajib.forEach(score => {
    //   temp += `<div class="score">${score}</div>`;
    // })
    temp += `</div></div>`;

    return temp;
  }
  setElScoreQWC(){
    let temp = `
      <div class="listscore qwc">
      <div class="buttons">
        <div class="button minus" id="minus_qwc_${this.id}" onclick="updateScore(this)">-</div>
        <div class="button plus" id="plus_qwc_${this.id}" onclick="updateScore(this)">+</div>
      </div>
      <div class="list">
    `

    let score;
    for(let i=0; i<10; i++){
      score = (this.scoreQWC[i] || this.scoreQWC[i] === 0) ? this.scoreQWC[i] : '';
      temp += `<div class="score">${score}</div>`;
    }

    // this.scoreQWC.forEach(score => {
    //   temp += `<div class="score">${score}</div>`;
    // })
    temp += `</div></div>`;

    return temp;
  }
  setElScoreRebutan(){
    let temp = `
      <div class="listscore rebutan">
      <div class="buttons">
        <div class="button minus" id="minus_rebutan_${this.id}" onclick="updateScore(this)">-</div>
        <div class="button plus" id="plus_rebutan_${this.id}" onclick="updateScore(this)">+</div>
      </div>
      <div class="list">
    `
    let score;
    for(let i=0; i<10; i++){
      score = (this.scoreRebutan[i] || this.scoreRebutan[i] === 0) ? this.scoreRebutan[i] : '';
      temp += `<div class="score">${score}</div>`;
    }

    // this.scoreRebutan.forEach(score => {
    //   temp += `<div class="score">${score}</div>`;
    // })
    temp += `</div></div>`;

    return temp;
  }
  sumScore(){
    let totalScore = 0;
    this.scoreWajib.forEach(score => {
      totalScore+=score;
    })
    
    this.scoreQWC.forEach(score => {
      totalScore+=score;
    })
    
    this.scoreRebutan.forEach(score => {
      totalScore+=score;
    })

    return totalScore;
  }
  plusScore(category, score=100){
    switch (category) {
      case 'wajib':
        if (this.scoreWajib.length === 10) return;
        this.scoreWajib.push(100);
        return;
    
      case 'qwc':
        if (this.scoreQWC.length === 10) return;
        this.scoreQWC.push(100);
        return;
  
      case 'rebutan':
        if (this.scoreRebutan.length === 10) return;
        this.scoreRebutan.push(100);
        return;
          
      default:
        return;
    }
  }
  minusScore(category, score=100){
    switch (category) {
      case 'wajib':
        if (this.scoreWajib.length === 10) return;
        this.scoreWajib.push(0);
        // let temp = this.scoreWajib.concat([0]);
        // console.log(temp);
        // this.scoreWajib = temp;
        return;
    
      case 'qwc':
        if (this.scoreQWC.length === 10) return;
        this.scoreQWC.push(0);
        // this.scoreQWC = this.scoreQWC.concat([0]);
        return;
  
      case 'rebutan':
        if (this.scoreRebutan.length === 10) return;
        this.scoreRebutan.push(-100);
        return;
          
      default:
        return;
    }
  }
}

class Team{
  constructor(name = 'A', id = 'a'){
    this.name = name;
    this.id = id.replace(/\s/g, '');;
    // this.score = 0;
    // console.log(this.id);
    this.scores = new TeamScore(this.id);
  }
  plus(category, score = 100){
    // this.score += score;
    this.scores.plusScore(category);
  }
  minus(category, score = 100){
    // this.score -= score;
    this.scores.minusScore(category);
  }
}

class LeaderBoard{
  constructor(teams){
    this.teams = [...teams];
    this.update();
  }

  update(){
    this.teams.sort(sortFunction);
    let element = '';
    
    this.teams.forEach((team, i) =>{
      element += `
      <div class="board">
        <div class="number">${i+1}.</div>
        <div class="name">${team.name}</div>
        <div class="score">${team.scores.sumScore()}</div>
      </div>
      `
    });

    LeaderBoardElement.innerHTML = element;
  }
}

class Teams{
  constructor(teamNames){
    this.teams = [];
    teamNames.forEach(teamName => {
      this.teams.push(new Team(teamName, teamName.toLowerCase()));
    });
    this.update();
    this.leaderboard = new LeaderBoard(this.teams);
  }

  updateScore(el){
    let id = el.id;
    id = id.split('_');

    this.teams.forEach(team => {
      // console.log(id[2], team.id);
      if(id[2] != team.id) return;
      if(id[0]=='plus') team.plus(id[1]);
      if(id[0]=='minus') team.minus(id[1]);

    })    

    this.update();

    this.leaderboard.update();
  }

  update(){
    scoreBoard.innerHTML = ``;

    this.teams.forEach(team => {
      scoreBoard.innerHTML += `
        <div class="team">
          <div class="title">${team.name}</div>
          <div class="scores" id="score_${team.id}">
        </div>
      `

      team.scores.updateEl;

      team.scores.setElement();
      
    })
    
  }
}

export { Team, LeaderBoard, Teams, alphaVal, valAlpha };
        // <div class="minus button" id="${team.id}">-</div>
        // <div class="plus button" id="${team.id}">+</div>






  // plus({id='', score=100, key='', itr=0}){
  //   console.log(id);
  //   // console.log(itr);
  //   if (key != '' || itr != 0){
  //     let i;
  //     if (key) i = alphaVal(key, 97);
  //     else i = itr;
  //     // console.log(`${i+1} nyeh ${this.teams.length}`);
  //     if (i+1 > this.teams.length) return;
  //     this.teams[i].plus(score);
  //   } else {
  //     this.teams.forEach(team => {
  //       if(id == team.id){
  //         team.plus(score);
  //       }
  //     })
  //   } 
  //   // this.update();
  //   this.leaderboard.update();
  // }
  // minus({id='', score = 100, key='', itr=0}){
  //   console.log(id);
  //   // console.log(itr);
  //   if (key != '' || itr != 0){
  //     let i;
  //     if (key) i = alphaVal(key, 97);
  //     else i = itr;
  //     // console.log(`${i+1} nyeh ${this.teams.length}`);
  //     if (i+1 > this.teams.length) return;
  //     this.teams[i].minus(score);
  //   } else {
  //     this.teams.forEach(team => {
  //       if(id == team.id){
  //         team.minus(score);
  //       }
  //     })
  //   }
  //   // this.update();
  //   this.leaderboard.update();
  // }

  // update(){
  //   let element = ``;
  //   this.teams.forEach(team =>{
  //     element += `
  //     <div class="team label">
  //       <div class="name">${team.name}</div>
  //       <div class="minus button" onclick="minusClick(this)" id="minus-${team.id}">-</div>
  //       <div class="score">${team.score}</div>
  //       <div class="plus button" onclick="plusClick(this)" id="plus-${team.id}">+</div>
  //     </div>`;
  //   })
  //   teamsElement.innerHTML = element;
  // }