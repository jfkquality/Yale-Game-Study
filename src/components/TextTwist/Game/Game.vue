<template>
  <div id="textTwistGame">
      <h2 id="title">
        Text Twist
      </h2>
      <div id="gameContainer" v-if="!complete && !pause">
        <div id="timer">
          <span v-if="countdownMin > 0">{{countdownMin}}</span>:<span v-if="countdownSec > 9">{{countdownSec}}</span><span v-else>0{{countdownSec}}</span>
        </div>
        <div id="successfulWords">
          <p v-for="attempt in word.attempts" v-if="attempt.success">
            {{attempt.word}}
          </p>
        </div>


        <div id="guessedWord">

          <div v-for="n in 7" class="box" v-bind:class="{filled: entry[n-1]}">
            <button class="letter" v-if="entry[n - 1]">{{entry[n - 1]}}</button>
          </div>
        </div>
                <br />
        <div id="sourceWord">
          <div v-for="char in modifiedWord" class="sourceLetter">
            <button v-if="char !== '_'" v-on:click="addGuess(char)" class="letter">
            {{char}}
            </button>
            <div v-else class="empty">  </div>
          </div>
        </div>
        <div id="buttons">
          <button v-on:click="twist()" class="transpButton">Twist</button>
          <button v-on:click="select({keyCode:13})" class="greenButton">Enter</button>
          <button v-on:click="clear()" class="transpButton">Clear </button>
        </div>
        <div style="clear:both"></div>
      </div>
      <div v-else-if="pause && counter <= 13" class="pause">
        <h1 v-if="counter < 13">Get ready for the next set of letters!</h1>
        <h1 v-else>Game Over. Please wait for your progress chart.</h1>
      </div>
      <div v-else>
        <scoreChart v-bind:scores="scoreChart" v-if="scoreChart.length > 0" />
      </div>
      <div id="textFooter" v-if="!complete && !pause">
        <div id="leftTrap"> </div>
        <div id="keyboard">
          <h3>You can use your keyboard as well.</h3>
        </div>
        <hr/>
        <div id="pointTotal">
          Points Bank: <img src="/static/Gem.png"/><span id="pointNum"> {{points}}</span>
        </div>
        <div id="rightTrap"> </div>
      </div>
    </div>
</template>
<script src="./Game.js"></script>
<style type="text/css">
.alignCenter {
    display: flex;
    align-items: center;
}
.justifyCenter {
    justify-content: center;
}
.centered {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  height: 200px;
}
#gameContainer {
  display: grid;
  grid-template-columns: 2;
  grid-template-rows: 3;
   border: 5px solid #272727;
   margin-right: 5em;
   margin-top: 6em;
   margin-left: 5em;
   width: 90%;
}
#successfulWords {
  grid-row: 1 / span 3;
  column-count: 2;
  column-span: all;
  column-gap: 1em;
  grid-column: 1;
  float: left;
  margin-left: 5%;
  margin-top: 10px;
  font: 1.5em 'Avenir',  Arial, sans-serif;
  text-transform: capitalize;
}
#successfulWords p {
  margin: 2px 0;
}
#sourceWord {
  grid-row: 2;
  grid-column: 2;
  margin-top:6em;
  margin-bottom: 3em;
  height: 5em;
}
#guessedWord {
  grid-row: 1;
  grid-column: 2;
  margin-top:6em;
  height: 5em;
}
#textTwistGame #title {
  font-size: 2em;
  position: absolute;
  top: 0.5em;
  left: 6em;
}
#sourceWord div {
  display: inline-block;
}
#buttons {
  grid-row: 3;
  grid-column: 2;
}
.pause {
  margin-top: 30vh;
  margin-left: auto;
  margin-right: auto;
}
.letter{
  text-transform: uppercase;
  display: inline-block;
  box-shadow: 0px 3px #D17821;
  padding-top: 2px;
  color: #4E1A07;
  font: 2.5em 'Avenir',  Arial, sans-serif;
  width: 1.6em;
  height: 1.6em;
  background: linear-gradient(#F6DD00, #F8B818);
  border: 0px;
  border-radius: 100%;
}
.empty {
  display: inline-block;
  color: #4E1A07;
  font: 2.5em 'Avenir',  Arial, sans-serif;
  width: .8em;
  height: .8em;
  margin-left: 0.4em;
  margin-right: 0.4em;
  background: white;
  border: 0px;
  border-radius: 100%;
}
.box {
  background-color: #272727;
  display: inline-block;
  width: 5em;
  height: 5em;
  margin: 1em;
  margin-bottom: 0em;
  border-radius: 3%;
  box-shadow: 1px 1px 5px #555 inset;
  overflow: hidden;
}
.sourceLetter {
margin: 1.5em;
margin-top: 0em;
}
.filled {
  background-color: white;
}
.filled .letter {
  margin-top:.1em;
}
#timer {
    font-size: 2em;
    grid-row: 1;
    grid-column: 2;
    margin-top: 1em;
}
#textFooter {
  position: absolute;
  left: 0;
  bottom: 0px;
  width: 100%;
  background-color: #272727;
}
#leftTrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 0; height: 0; border-top: 2em solid #1C1C1C; border-right: 100px solid transparent;
}
#rightTrap {
  position: absolute;
  top: 0;
  right: 0;
  width: 0; height: 0; border-top: 2em solid #1C1C1C; border-left: 100px solid transparent;
}
#textFooter hr {
  height: 4em;
  width: 1px;
  float: left;
}
#keyboard {
  width: 48%;
  float: left;
}
#keyboard h3 {
  font-size:1.5em;
  float: right;
  margin: 2em;
}
#pointTotal {
  font-size:1.5em;
  position: relative;
  top: -0.4em;
  float: left;
}
#pointTotal img {
  vertical-align: middle;
  height: 4em;
  margin-left: 1em;
}
#pointNum {
  font-size:3.5em;
  position: relative;
  top: 0.25em;
}
#buttons {
margin-bottom: 1em;
}
#buttons button {
margin-left: 1em;
}
.greenButton {
background-color: #9CE37A;
color: white;
width: 5em;
height: 2em;
font-size:2em;
border: #97df77 solid 4px;
border-radius: 5%;
}
.transpButton {
 background-color: transparent;
 color: white;
 width: 5em;
 height: 2em;
 font-size:2em;
 border: white solid 4px;
 border-radius: 5%;
}
</style>
