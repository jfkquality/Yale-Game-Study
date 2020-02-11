<template>
  <div>
    <div v-if="!complete">

        <div id="firstRound" class="intermission" v-if="intermission && intermission === 'first'">
          <h2>Practice is now complete!</h2>
          <h3>The real game will now begin.</h3>
            <h3>On the following trials, the digits will be presented faster than before.
            Click 'Continue' to start, when you are ready.</h3>
          <button v-on:click="firstRound">Continue</button>
        </div>

        <div id="secondRound" class="intermission" v-if="intermission && intermission === 'second'">
          <h2>Round 1 is now complete!</h2>
          <h3>On the following trials, the digits will be presented faster than before.</h3>
            <h3>This round will take approximately 7 minutes.</h3>
            <h3>To end earlier a button labeled QUIT will appear on the left side of the screen. Pressing this button will terminate the game immediately.</h3>
            <h3>Press 'Continue' to start, when you are ready.</h3>
          <button v-on:click="secondRound">Continue</button>
        </div>

        <div id="numberGame" v-if="!intermission">
            <h2 id="title"> Numbers </h2>
            <div id="numButtons">
              <button id="deg20" v-on:click="submit(1)" :disabled="inputDisabled(1)">1</button>
              <button id="deg40" v-on:click="submit(2)" :disabled="inputDisabled(2)">2</button>
              <button id="deg60" v-on:click="submit(3)" :disabled="inputDisabled(3)">3</button>
              <button id="deg80" v-on:click="submit(4)" :disabled="inputDisabled(4)">4</button>
              <button id="deg100" v-on:click="submit(5)" :disabled="inputDisabled(5)">5</button>
              <button id="deg120" v-on:click="submit(6)" :disabled="inputDisabled(6)">6</button>
              <button id="deg140" v-on:click="submit(7)" :disabled="inputDisabled(7)">7</button>
              <button id="deg160" v-on:click="submit(8)" :disabled="inputDisabled(8)">8</button>
              <button id="deg180" v-on:click="submit(9)" :disabled="inputDisabled(9)">9</button>
              <button id="deg200" v-on:click="submit(10)" :disabled="inputDisabled(10)">10</button>
              <button id="deg220" v-on:click="submit(11)" :disabled="inputDisabled(11)">11</button>
              <button id="deg240" v-on:click="submit(12)" :disabled="inputDisabled(12)">12</button>
              <button id="deg260" v-on:click="submit(13)" :disabled="inputDisabled(13)">13</button>
              <button id="deg280" v-on:click="submit(14)" :disabled="inputDisabled(14)">14</button>
              <button id="deg300" v-on:click="submit(15)" :disabled="inputDisabled(15)">15</button>
              <button id="deg320" v-on:click="submit(16)" :disabled="inputDisabled(16)">16</button>
              <button id="deg340" v-on:click="submit(17)" :disabled="inputDisabled(17)">17</button>
              <button id="deg0" v-on:click="submit(18)" :disabled="inputDisabled(18)">18</button>

              <div id="currentNumber">
                {{currentNumber}}
              </div>
              <div id="warningMissed" v-if="paused">
                Add the next two numbers & get back on track!
              </div>
            </div>
            <button v-if="round >= 2" id="quitButton" v-on:click="quit()">Quit</button>
        </div>
        </div>
        <div v-else>
          <scoreChart v-bind:scores="scoreChart" v-if="scoreChart.length > 0" />
        </div>

        <div id="numFooter" v-if="!complete">
          <div id="leftTrap"> </div>
          <div id="roundCount">
            <h3  v-if="round !== 0">
              Round {{round}}
            </h3>
            <h3 v-else>
              Practice Round
            </h3>
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

<style>
.intermission {
  margin-top: 30vh;
}
h2#title {
  font-size: 2em;
  position: absolute;
  top: 0.5em;
  left: 6em;
}
#numButtons {
  position: relative;
   width: 36em;
   height: 36em;
   padding: 2.8em;
   /*2.8em = 2em*1.4 (2em = half the width of a link with img, 1.4 = sqrt(2))*/
   border-radius: 50%;
   margin: 1.75em auto 0;
}
#numButtons button {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  box-shadow: 0px 3px #D17821;
  padding-top: 5px;
  color: #4E1A07;
  font: bold 2.5em 'Avenir',  Arial, sans-serif;
  width: 1.6em;
  height: 1.6em;
  margin: -0.8em;
  background: linear-gradient(#F6DD00, #F8B818);
  border: 0px;
  border-radius: 100%;
}
#numButtons #currentNumber{
  display: block;
  position: absolute;
  font: bold 4em 'Avenir',  Arial, sans-serif;
  line-height: 200%;
  top: 50%;
  left: 50%;
  margin: -1em;
  border-radius: 100%;
  background-color: #272727;
  height: 2em;
  width: 2em;
}
#numButtons button:disabled {
  opacity: 0.5;
}
#deg0 { transform: translate(6.5em);}
#deg20 { transform: rotate(20deg) translate(6.5em) rotate(-20deg);}
#deg40 { transform: rotate(40deg) translate(6.5em) rotate(-40deg);}
#deg60 { transform: rotate(60deg) translate(6.5em) rotate(-60deg);}
#deg80 { transform: rotate(80deg) translate(6.5em) rotate(-80deg);}
#deg100 { transform: rotate(100deg) translate(6.5em) rotate(-100deg);}
#deg120 { transform: rotate(120deg) translate(6.5em) rotate(-120deg);}
#deg140 { transform: rotate(140deg) translate(6.5em) rotate(-140deg);}
#deg160 { transform: rotate(160deg) translate(6.5em) rotate(-160deg);}
#deg180 { transform: rotate(180deg) translate(6.5em) rotate(-180deg);}
#deg200 { transform: rotate(200deg) translate(6.5em) rotate(-200deg);}
#deg220 { transform: rotate(220deg) translate(6.5em) rotate(-220deg);}
#deg240 { transform: rotate(240deg) translate(6.5em) rotate(-240deg);}
#deg260 { transform: rotate(260deg) translate(6.5em) rotate(-260deg);}
#deg280 { transform: rotate(280deg) translate(6.5em) rotate(-280deg);}
#deg300 { transform: rotate(300deg) translate(6.5em) rotate(-300deg);}
#deg320 { transform: rotate(320deg) translate(6.5em) rotate(-320deg);}
#deg340 { transform: rotate(340deg) translate(6.5em) rotate(-340deg);}

#numberGame {
   border: 5px solid #272727;
   margin-right: 5em;
   margin-top: 6em;
   margin-left: 5em;
}
#numFooter {
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
#numFooter hr {
  height: 6em;
  width: 1px;
  float: left;
}
#roundCount {
  width: 48%;
  float: left;
}
#roundCount h3 {
font-size:1.5em;
float: right;
margin: 2em;
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
#warningMissed { position: absolute; background: white; border-radius: .4em; color: black;
height: 4.5em; width: 14em; top: 50%; left: 50%; margin-left: -7em;
margin-top: -8em; font-size: 1.5em; text-align: center;
padding-top: 1.5em;}
#warningMissed:after { content: ''; position: absolute; bottom: 0; left: 50%; width: 0;
 height: 0; border: 20px solid transparent; border-top-color: white; border-bottom: 0; border-left: 0; margin-left: -10px; margin-bottom: -20px; }
 #quitButton {
   position: absolute;
   left: 15vw;
   top:46vh;
 }
</style>
