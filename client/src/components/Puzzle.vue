<template lang="html">
  <div class="columns has-text-centered" v-if="!puzzleCompleted">
    <audio id="puzzledrop">
      <source src="../assets/sfx/puzzledrop.wav" type="audio/wav">
        </audio>

        <audio id="puzzleComplete">
          <source src="../assets/sfx/puzzleComplete.mp3" type="audio/mpeg">
          </audio>

          <audio id="thwack">
            <source src="../assets/sfx/thwack.wav" type="audio/wav">
              </audio>
              <div class="column is-one-quarter"></div>
              <div class="column is-two-quarter ">
                <h2><strong>PUZZLE !!!</strong></h2>
              <h2>You can get few extra points by completing the puzzle below. <br>
                For Easy level you get <strong>6 points</strong>, for medium <strong>8</strong> and <strong>10 points</strong> for hard level</h2>

<div v-if="buttonDisplay == true">
      <button class="button" v-on:click="initEasy();" type="button" name="button" value="Get pic">Easy Puzzle</button>

      <button class="button" v-on:click="initMedium();" type="button" name="button" value="Get pic">Medium Puzzle</button>

      <button class="button" v-on:click="initHard();" type="button" name="button" value="Get pic">Hard Puzzle</button>
</div>
    <br><br>
    <div class="center">
      <img v-if="displayOriginal" id="testImg" src="../assets/puzzles/2.jpg" height="500" width="500" alt="Puzzle Time!">
<canvas id="canvas"></canvas>
    </div>
    <h3>You can get extra 20 points by completing 100 pieces puzzle below</h3>
    <button v-if="buttonDisplay == true" class="button" v-on:click="initAbsurd();" type="button" name="button" value="Get pic">Absurd! DO NOT CLICK!</button>

</div>
  <div class="column is-one-quarter"></div>
  </div>
</template>

<script>
import { eventBus } from '../main.js'
export default {
  name: 'puzzle',
  data(){
    return{
      puzzleScore: 0,
      puzzleCompleted: false,
      difficulty: 3,
buttonDisplay: true,

      puzzleHover: '#009900',
      canvas: null,
      stage: null,
      img: "",
      pieces: null,
      puzzleWidth: null,
      puzzleHeight: null,
      pieceWidth: null,
      pieceHeight: null,
      currentPiece: null,
      currentDropPiece: null,
      mouse: null,
      displayOriginal: true,
      imgChoice: "../assets/puzzles/2.jpg",
      // imgArray: "./blippi.jpg"
    }
  },
  methods: {
    initEasy(){
      this.buttonDisplay = false,
      this.img = document.getElementById("testImg")
      console.log(this.img);
      this.onImage();
      this.displayOriginal = false;
    },
    initMedium(){
      this.buttonDisplay = false,
      this.difficulty = 4;
      this.img = document.getElementById("testImg")
      this.onImage();
      this.displayOriginal = false;
    },
    initHard(){
      this.buttonDisplay = false,
      this.difficulty = 5;
      this.img = document.getElementById("testImg")
      this.onImage();
      this.displayOriginal = false;
    },initAbsurd(){
      this.buttonDisplay = false,
      this.difficulty = 10;
      this.img = document.getElementById("testImg")
      this.onImage();
      this.displayOriginal = false;
    },
    onImage(){
      console.log('onImage is running');
      this.pieceWidth = Math.floor(this.img.width / this.difficulty)
      this.pieceHeight = Math.floor(this.img.height / this.difficulty)
      this.puzzleWidth = this.pieceWidth * this.difficulty;
      this.puzzleHeight = this.pieceHeight * this.difficulty;
      this.setCanvas();
      this.initPuzzle();
    },
    setCanvas(){
      this.canvas = document.getElementById('canvas');
      this.stage = this.canvas.getContext('2d');
      this.canvas.width = this.puzzleWidth;
      this.canvas.height = this.puzzleHeight;
      this.canvas.style.border = "1px solid black";
    },
    initPuzzle(){
      this.pieces = [];
      this.mouse = {x:0,y:0};
      this.currentPiece = null;
      this.currentDropPiece = null;
      this.stage.drawImage(this.img, 0, 0, this.puzzleWidth, this.puzzleHeight, 0, 0, this.puzzleWidth, this.puzzleHeight);
      this.createTitle("Start!");
      this.buildPieces();
    },
    createTitle(msg){
      this.stage.fillStyle = "#000000";
      this.stage.globalAlpha = .5;
      let xBox = this.puzzleWidth * 0.6;
      let yBox = this.puzzleHeight * 0.2;
      this.stage.fillRect((this.puzzleWidth/2)-(xBox / 2),(this.puzzleHeight / 2)-(yBox/2),xBox,yBox);
      this.stage.fillStyle = "#FFFFFF";
      this.stage.globalAlpha = 1;
      this.stage.textAlign = "center";
      this.stage.textBaseline = "middle";
      this.stage.font = "50px Ubuntu";
      this.stage.fillText(msg,this.puzzleWidth / 2,this.puzzleHeight / 2);
    },
    buildPieces(){
      let i;
      let piece;
      let xPos = 0;
      let yPos = 0;
      for(i = 0;i < this.difficulty * this.difficulty;i++){
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        this.pieces.push(piece);
        xPos += this.pieceWidth;
        if(xPos >= this.puzzleWidth){
          xPos = 0;
          yPos += this.pieceHeight;
        }
      }
      document.onmousedown = this.shufflePuzzle;
    },
    shufflePuzzle(){
      this.pieces = this.shuffleArray(this.pieces);
      this.stage.clearRect(0,0,this.puzzleWidth,this.puzzleHeight);
      let i;
      let piece;
      let xPos = 0;
      let yPos = 0;
      for(i = 0;i < this.pieces.length;i++){
        piece = this.pieces[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        this.stage.drawImage(this.img, piece.sx, piece.sy, this.pieceWidth, this.pieceHeight, xPos, yPos, this.pieceWidth, this.pieceHeight);
        this.stage.strokeRect(xPos, yPos, this.pieceWidth,this.pieceHeight);
        xPos += this.pieceWidth;
        if(xPos >= this.puzzleWidth){
          xPos = 0;
          yPos += this.pieceHeight;
        }
      }
      document.onmousedown = this.onPuzzleClick;
    },
    shuffleArray(o){
      for(let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    },
    onPuzzleClick(e){
      if(e.layerX || e.layerX == 0){
        this.mouse.x = e.layerX
        this.mouse.y = e.layerY
      }
      else if(e.offsetX || e.offsetX == 0){
        this.mouse.x = e.offsetX
        this.mouse.y = e.offsetY
      }
      this.currentPiece = this.checkPieceClicked();
      if(this.currentPiece != null){
        this.stage.clearRect(this.currentPiece.xPos,this.currentPiece.yPos,this.pieceWidth,this.pieceHeight);
        this.stage.save();
        this.stage.globalAlpha = .9;
        this.stage.drawImage(this.img, this.currentPiece.sx, this.currentPiece.sy, this.pieceWidth, this.pieceHeight, this.mouse.x - (this.pieceWidth / 2), this.mouse.y - (this.pieceHeight / 2), this.pieceWidth, this.pieceHeight);
        this.stage.restore();
        document.onmousemove = this.updatePuzzle;
        document.onmouseup = this.pieceDropped;
      }
    },
    checkPieceClicked(){
      let i;
      let piece;
      let audio = document.getElementById("puzzledrop");
      this.playAudio(audio);
      for(i = 0;i < this.pieces.length;i++){
        piece = this.pieces[i];
        if(this.mouse.x < piece.xPos || this.mouse.x > (piece.xPos + this.pieceWidth) || this.mouse.y < piece.yPos || this.mouse.y > (piece.yPos + this.pieceHeight)){
          //PIECE NOT HIT
        }
        else{
          return piece;
        }
      }
      return null;
    },
    updatePuzzle(e){
      this.currentDropPiece = null;
      if(e.layerX || e.layerX == 0){
        this.mouse.x = e.layerX
        this.mouse.y = e.layerY
      }
      else if(e.offsetX || e.offsetX == 0){
        this.mouse.x = e.offsetX
        this.mouse.y = e.offsetY
      }
      this.stage.clearRect(0,0,this.puzzleWidth,this.puzzleHeight);
      var i;
      var piece;
      for(i = 0;i < this.pieces.length;i++){
        piece = this.pieces[i];
        if(piece == this.currentPiece){
          continue;
        }
        this.stage.drawImage(this.img, piece.sx, piece.sy, this.pieceWidth, this.pieceHeight, piece.xPos, piece.yPos, this.pieceWidth, this.pieceHeight);
        this.stage.strokeRect(piece.xPos, piece.yPos, this.pieceWidth,this.pieceHeight);
        if(this.currentDropPiece == null){
          if(this.mouse.x < piece.xPos || this.mouse.x > (piece.xPos + this.pieceWidth) || this.mouse.y < piece.yPos || this.mouse.y > (piece.yPos + this.pieceHeight)){
            //NOT OVER
          }
          else{
            this.currentDropPiece = piece;
            this.stage.save();
            this.stage.globalAlpha = .4;
            this.stage.fillStyle = this.puzzleHover;
            this.stage.fillRect(this.currentDropPiece.xPos,this.currentDropPiece.yPos,this.pieceWidth, this.pieceHeight);
            this.stage.restore();
          }
        }
      }
      this.stage.save();
      this.stage.globalAlpha = .6;
      this.stage.drawImage(this.img, this.currentPiece.sx, this.currentPiece.sy, this.pieceWidth, this.pieceHeight, this.mouse.x - (this.pieceWidth / 2), this.mouse.y - (this.pieceHeight / 2), this.pieceWidth, this.pieceHeight);
      this.stage.restore();
      this.stage.strokeRect( this.mouse.x - (this.pieceWidth / 2), this.mouse.y - (this.pieceHeight / 2), this.pieceWidth,this.pieceHeight);
    },
    pieceDropped(e){
      document.onmousemove = null;
      document.onmouseup = null;
      if(this.currentDropPiece != null){

        var tmp = {xPos:this.currentPiece.xPos,yPos:this.currentPiece.yPos};
        this.currentPiece.xPos = this.currentDropPiece.xPos;
        this.currentPiece.yPos = this.currentDropPiece.yPos;
        this.currentDropPiece.xPos = tmp.xPos;
        this.currentDropPiece.yPos = tmp.yPos;
      }

      this.resetPuzzleAndCheckWin();
    },
    resetPuzzleAndCheckWin(){
      let audio = document.getElementById("thwack");
      this.playAudio(audio);
      this.stage.clearRect(0,0,this.puzzleWidth,this.puzzleHeight);
      var gameWin = true;
      var i;
      var piece;
      for(i = 0;i < this.pieces.length;i++){
        piece = this.pieces[i];
        this.stage.drawImage(this.img, piece.sx, piece.sy, this.pieceWidth, this.pieceHeight, piece.xPos, piece.yPos, this.pieceWidth, this.pieceHeight);
        this.stage.strokeRect(piece.xPos, piece.yPos, this.pieceWidth,this.pieceHeight);
        if(piece.xPos != piece.sx || piece.yPos != piece.sy){
          gameWin = false;
        }
      }
      if(gameWin){
        let audio = document.getElementById("puzzleComplete");
        this.playAudio(audio);
        this.puzzleScore = (2 * this.difficulty)
        // setTimeout(this.gameOver,500);
        this.createTitle("You did it!")
        setTimeout(this.gameOver,2000);
      }
    },
    gameOver(){
      this.puzzleCompleted = true;
      this.sendPuzzleResult();
      document.onmousedown = null;
      document.onmousemove = null;
      document.onmouseup = null;
    },
    sendPuzzleResult(){
      eventBus.$emit('puzzle-result', this.puzzleScore)
    },

    playAudio(audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }



  }
}
</script>


<style lang="css" scoped>
img{
  height: 500px;
  width: 500px;
}

.columns {
  margin-top: 60px;
  height: 600px;
  width: auto;
  position: relative;
  /* border: 3px solid green; */
}
.buttoncenter {
  position: absolute;
  top: 4%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.button {
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
