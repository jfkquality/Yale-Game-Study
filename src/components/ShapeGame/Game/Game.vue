<template>
  <div id="shapeGame">
    <h1 id="title"> Shapes</h1>
    <div id="wrapper" v-if="!complete">
      <div class="alignCenter justifyCenter" id="gameSlide">
        <div class="shape" v-if="displayShape">
          <div class="circle" v-if="!shape.square"></div>
          <div class="square" v-if="shape.square"></div>
        </div>

      <div class="centered" v-if="fixation"> <!-- change back to fixation -->
        <span class="Gems" v-if="(trial >= 2)"> <!-- change back to pointsAvailable? -->
          <img src="/static/Gem.png"/>
          <img src="/static/Gem.png"/>
          <img src="/static/Gem.png"/>
          <img src="/static/Gem.png"/>
          <img src="/static/Gem.png"/>
        </span>
        <p class="centered" id="plus">+</p>
    </div>
      <div class="blockEnded">
        <div v-if="!continued && !complete && trial <= 3">
          <p>Block Complete</p> <br/>
          <p v-if="trial > 2">Your total points:</p> <!-- ' > 2' b/c Trial already increased here-->
          <div class="alignCenter justifyCenter" v-if="trial > 2">
            <img src="/static/Gem.png"/>
            <p> {{ points }}</p>
          </div>
          <button class="btnGreen" v-on:click="nextBlock()">Continue</button>
        </div>

        <div class="centered" id="countdown" v-if="countdown > 0 && (continued && blank)">
          <div  v-if="continued && !complete">
            <p>Get ready!</p>
            <p>Put your fingers on the <strong>F</strong> and <strong>J</strong> keys!</p>
          </div>
          <h1><strong>{{countdown}}</strong></h1>
        </div>
      </div>

      </div>

      <div id="footer">
        <div id="leftTrap"></div>

        <div id="instruction">
            <h3>When there is NO sound: Press F for Square. Press J for Circle.<br/>
            When there is SOUND: Do NOT press anything.</h3>
        </div>
        <hr/>
          <div id="pointTotal">
            Points Bank: <img src="/static/Gem.png"/><span id="pointNum" v-if="(points > 0)"> {{points}} </span><span id="pointNum" v-else> - - </span>
          </div>

          <div id="rightTrap"></div>
      </div>

    </div>


    <div v-else>
      <scoreChart v-bind:scores="scoreChart" v-if="scoreChart.length > 0" />
    </div>
  </div>
</template>

<script src="./Game.js"></script>

<style>
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
.centered#plus {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  padding-top: 6vh;
  /* height: 100px; */
}

#shapeGame #footer {
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
#footer hr {
  height: 4em;
  width: 1px;
  float: left;
}
#shapeGame  #instruction {
  width: 48%;
  float: left;
  height: 1px;
}

#shapeGame  #pointTotal img {
vertical-align: middle;
height: 4em;
margin-left: 1em;
}
#shapeGame #pointNum {
font-size:3.5em;
position: relative;
top: 0.25em;
}
#shapeGame .btnFooter {
  position: absolute;
  left: 20vw;
  bottom: 20vh;
  width: 100%;
}
#shapeGame #gameEnded {
  text-align: left;
  margin: 15vh 20vw 0;
}
#shapeGame #gameEnded p {
  font-size: 1.8em;
}

#shapeGame .blockEnded p {
  font-size: 3em;
  font-weight: 700;
}
#shapeGame .blockEnded img {
  height: 6em;
  margin: 20px;
}
#shapeGame #plus {
  font-size: 4em;
  font-weight: 700;
  margin: 0;
  padding-left: 10px;
  padding-bottom: 5px;
}
#shapeGame .Gems img {
  height: 4em;
  margin: 0;
}
#shapeGame #wrapper {
    border:6px solid #5C5C5C;
    border-radius: 5px;
    margin: 2% 5%;
    height:70vh;
    padding-bottom: 50px;
}
#shapeGame h1#title {
  text-align: left;
  margin-left: 15%;
}
.shape .circle {
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 3px #0072BF;
  /* padding-top: 5px; */
  width: 17.6em;
  height: 17.6em;
  margin: auto;
  background:#00BFE8;
  border: 0px;
  border-radius: 100%;
}
.shape .square {
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 3px #D04F0C;
  /* padding-top: 5px; */
  width: 17.6em;
  height: 17.6em;
  margin: auto;
  background: #F65F1B;
  border: 0px;
}
#showBonus {
  font-size: 4em;
  /* padding: 30vh 0; */
  text-align: center;
}
#countdown {
  /* padding: 25vh 0; */
}
#countdown p{
  margin: 0;
  font-size: 2.4em;
}
#countdown h1{
  margin: 0;
  font-size: 5em;
}
</style>
