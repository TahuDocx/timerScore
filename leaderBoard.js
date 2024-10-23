const teamsElement = document.getElementById("team-name");
// console.log(teamsElement);
// const teamNameEl = document.getElementById('team-name');
const LeaderBoardElement = document.getElementById("leaderboard");

const scoreWajib = document.getElementById('score-wajib');
const scoreQWC = document.getElementById('score-qwc');
const scoreRebutan = document.getElementById('score-rebutan');

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

class TeamScore{
  constructor(teamId){
    this.id = teamId;
    this.element = null;
    // console.log(this.element);
    this.scoreWajib = [];
    this.scoreQWC = [];
    this.scoreRebutan = [];
  }
  setElScoreWajib(){
    let temp = `<div class="scorelist">
    <div class="scoreeee">
    `

    let score;
    for(let i=0; i<10; i++){
      let checkScore = (this.scoreWajib[i] || this.scoreWajib[i] === 0);
      score = checkScore ? this.scoreWajib[i] : '';
      temp += `<div class="score-container">
        <div class="score-number">
          ${score}
        </div>`;

      if(checkScore) temp += `<div class="remove-score button" id="remove_wajib_${i}_${this.id}" onclick="removeScore(this)">x</div>`

      temp += `</div>`;
    }

    temp += `
        </div>
        <div class="buttons">
          <div class="button minus" id="minus_wajib_${this.id}" onclick="updateScore(this)">-</div>
          <div class="button plus" id="plus_wajib_${this.id}" onclick="updateScore(this)">+</div>
        </div>
      </div>    
    `

    return temp;
  }

  setElScoreQWC(){
    let temp = `<div class="scorelist">
    <div class="scoreeee">
    `

    let score;
    for(let i=0; i<10; i++){
      let checkScore = (this.scoreQWC[i] || this.scoreQWC[i] === 0);
      score = checkScore ? this.scoreQWC[i] : '';
      temp += `<div class="score-container">
        <div class="score-number">
          ${score}
        </div>`;

      if(checkScore) temp += `<div class="remove-score button" id="remove_qwc_${i}_${this.id}" onclick="removeScore(this)">x</div>`

      temp += `</div>`;
    }

    temp += `
        </div>
        <div class="buttons">
          <div class="button minus" id="minus_qwc_${this.id}" onclick="updateScore(this)">-</div>
          <div class="button plus" id="plus_qwc_${this.id}" onclick="updateScore(this)">+</div>
        </div>
      </div>    
    `

    return temp;
  }

  setElScoreRebutan(){
    let temp = `
      <div class="scorelist rebutan grid">
      <div class="scoreeee">
    `

    let score;
    for(let i=0; i<25; i++){
      let checkScore = (this.scoreRebutan[i] || this.scoreRebutan[i] === 0);
      score = checkScore ? this.scoreRebutan[i] : '';
      temp += `<div class="score-container">
        <div class="score-number">
          ${score}
        </div>`;

      if(checkScore) temp += `<div class="remove-score button" id="remove_rebutan_${i}_${this.id}" onclick="removeScore(this)">x</div>`

      temp += `</div>`;
    }

    temp += `
        </div>
        <div class="buttons">
          <div class="button minus" id="minus_rebutan_${this.id}" onclick="updateScore(this)">-</div>
          <div class="button plus" id="plus_rebutan_${this.id}" onclick="updateScore(this)">+</div>
        </div>
      </div>    
    `

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

    return (totalScore)?totalScore:0;
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
        if (this.scoreRebutan.length === 25) return;
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
        if (this.scoreRebutan.length === 25) return;
        this.scoreRebutan.push(-100);
        return;
          
      default:
        return;
    }
  }
  removeScore(category, index){
    switch (category) {
      case 'wajib':
        if (this.scoreWajib.length === 0) return;
        this.scoreWajib.splice(index, 1);
        return;
    
      case 'qwc':
        if (this.scoreQWC.length === 0) return;
        this.scoreQWC.splice(index, 1);

        return;
  
      case 'rebutan':
        if (this.scoreRebutan.length === 0) return;
        this.scoreRebutan.splice(index, 1);

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
    this.horizontalIterator = [];
    // this.setHorizontalIterator();
    this.setHorizontalLeaderboard();
    this.updateHorizontalLeaderboard();
  }
  largestScore(){
    let largeScore = 0;
    this.teams.forEach((team, i) =>{
      largeScore = (team.scores.sumScore() > largeScore) ? team.scores.sumScore() : largeScore;
    })
    return (largeScore)?largeScore:0;
  }
  update(){
    console.log('normal');
    this.teams.sort(sortFunction);
    // this.teams.forEach((team,i) => {
    //   console.log(team.name, team.scores.sumScore(), i);
    // })
    this.setHorizontalIterator();
    let element = '';
    
    this.teams.forEach((team, i) =>{
      element += `
      <div class="board">
        <div class="number">${i+1}.</div>
        <div class="name">${team.name}</div>
        <div class="score" id="lb_${team.id}">${team.scores.sumScore()}</div>
      </div>
      `;
    });

    LeaderBoardElement.innerHTML = element;
  }
  setHorizontalIterator(){
    this.teams.sort(sortFunction);
    this.horizontalIterator = [];
    this.teams.forEach((team,i) => {
      // console.log(team.name, team.scores.sumScore(), i);
      if(i%2){
        this.horizontalIterator.unshift(i);
      } else {
        this.horizontalIterator.push(i);
      }
    })
    // console.log(this.teams);
    // console.log(this.horizontalIterator);
  }
  setHorizontalLeaderboard(){
    console.log('test', this.teams)
    LeaderBoardElement.innerHTML = '';
    this.teams.forEach((team, i) => {
      LeaderBoardElement.innerHTML += `
      <div class="board">
        <div class="name">${team.name.charAt(0)}</div>
        <div class="score" id="lb_${team.id}">${team.scores.sumScore()}</div>
      </div>
      `;
    })
  }
  updateHorizontalLeaderboard(){
    // console.log('hor');
    // const differentiator = [220, 180, 140, 100];
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    console.log(vh);
    let lgScore = this.largestScore()
    // console.log(lgScore)

    // LeaderBoardElement.innerHTML = '';
    this.teams.forEach((team, i) => {
        // <div class="number">${i+1}.</div>
      let element = document.getElementById(`lb_${team.id}`)
      let hei = Math.max(team.scores.sumScore()/lgScore, 0);
      hei = (hei) ? hei : 0;
      console.log(hei, hei * 25 + 10, team.scores.sumScore(), lgScore);
      element.style.height = `${hei * 25 + 10}vh`;
      element.innerHTML = team.scores.sumScore()
    })

  }
}

class Teams{
  constructor(teamNames){
    this.teams = [];

    teamsElement.innerHTML = '';

    teamNames.forEach(teamName => {
      this.teams.push(new Team(teamName, teamName.toLowerCase()));
      teamsElement.innerHTML += `<div class="name">${teamName}</div>`;
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

    this.leaderboard.updateHorizontalLeaderboard();
  }

  removeScore(el){
    let id = el.id;
    id = id.split('_');

    this.teams.forEach(team => {
      // console.log(id[2], team.id);
      if(id[3] != team.id) return;
      // console.log(typeof(id[2]));
      team.scores.removeScore(id[1], id[2])
    })    

    this.update();

    this.leaderboard.updateHorizontalLeaderboard();
  }

  update(){
    scoreWajib.innerHTML = ``;
    scoreQWC.innerHTML = ``;
    scoreRebutan.innerHTML = ``;
    
    this.teams.forEach(team => {
      scoreWajib.innerHTML += team.scores.setElScoreWajib();
      scoreQWC.innerHTML += team.scores.setElScoreQWC();
      scoreRebutan.innerHTML += team.scores.setElScoreRebutan();
    })
  }
}

export { Team, LeaderBoard, Teams, alphaVal, valAlpha };