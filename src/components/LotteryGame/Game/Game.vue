<template>
  <div id="lotteryGame">
    <header>
      <h1> Lottery </h1>
    </header>

    <div id="wrapper" v-if="!complete">
      <section id="trials" v-if="!scored">
        <div id="safeContainer" v-if="safeLeft">  <!-- These are doubled because we needed a way to randomize the sides added into the spec  -->
          <h2 v-on:click="select({keyCode:70})" v-bind:class="{'selected': selected === 'safe'}">5 points</h2>
          <!-- <p>F Key</p> -->
        </div>
          <div id="chipsContainer" v-else-if="!safeLeft">
            <div id="chips" v-on:click="select({keyCode:70})" v-bind:class="{'selected': selected === 'lottery'}">
              <!-- stack blue -->
              <div id="blue" class="chips">
                <h3 class="top">{{currentTurn.spread.blue}} chips</h3>
                <img v-for="(n,index) in currentTurn.spread.blue" :key="index" width="60" height="5" v-bind:src="randomChip('blue', index)" alt="blue chip">
                <h3 v-if="!currentTurn.red" class="bottom">{{currentTurn.value}} pts</h3>
                <h3 v-else class="bottom"> 0 pts</h3>
              </div>

              <!-- stack red -->
              <div id="red" class="chips">
                <h3 class="top">{{currentTurn.spread.red}} chips</h3>
                <img v-for="(n,index) in currentTurn.spread.red" :key="index" width="60" height="5" v-bind:src="randomChip('red', index)" alt="red chip">
                <h3 v-if="currentTurn.red" class="bottom">{{currentTurn.value}} pts</h3>
                <h3 v-else class="bottom"> 0 pts</h3>
              </div>

              <!-- stack hidden -->
              <div id="gray" class="chips" v-if="currentTurn.spread.gray > 0">
                <h3 class="top">{{currentTurn.spread.gray}} Hidden chips</h3>
                <img v-for="(n,index) in currentTurn.spread.gray" :key="index" width="60" height="5" v-bind:src="randomChip('gray', index)" alt="gray chip">
              </div>
            </div>
            <!-- <p>J Key</p> -->
           </div>
          <p id="center">or</p>
          <div id="safeContainer" v-if="!safeLeft">
            <h2 v-on:click="select({keyCode:74})" v-bind:class="{'selected': selected === 'safe'}">5 points</h2>
            <!-- <p>F Key</p> -->
          </div>
            <div id="chipsContainer" v-else-if="safeLeft">
              <div id="chips" v-on:click="select({keyCode:74})" v-bind:class="{'selected': selected === 'lottery'}">
                <!-- stack blue -->
                <div id="blue" class="chips">
                  <h3 class="top">{{currentTurn.spread.blue}} chips</h3>
                  <img v-for="(n,index) in currentTurn.spread.blue" :key="index" width="60" height="5" v-bind:src="randomChip('blue', index)" alt="blue chip">
                  <h3 v-if="!currentTurn.red" class="bottom">{{currentTurn.value}} pts</h3>
                  <h3 v-else class="bottom"> 0 pts</h3>
                </div>

                <!-- stack red -->
                <div id="red" class="chips">
                  <h3 class="top">{{currentTurn.spread.red}} chips</h3>
                  <img v-for="(n,index) in currentTurn.spread.red" :key="index" width="60" height="5" v-bind:src="randomChip('red', index)" alt="red chip">
                  <h3 v-if="currentTurn.red" class="bottom">{{currentTurn.value}} pts</h3>
                  <h3 v-else class="bottom"> 0 pts</h3>
                </div>

                <!-- stack hidden -->
                <div id="gray" class="chips" v-if="currentTurn.spread.gray > 0">
                  <h3 class="top">{{currentTurn.spread.gray}} Hidden chips</h3>
                  <img v-for="(n,index) in currentTurn.spread.gray" :key="index" width="60" height="5" v-bind:src="randomChip('gray', index)" alt="gray chip">
                </div>
              </div>
              <!-- <p>J Key</p> -->
             </div>

           <div class="footer" v-if="!complete">
             <p class="half" v-if="!selected">F Key</p>
             <p class="half" v-if="!selected">J Key</p>
             <p class="full" v-if="selected">Hit <span>space</span> bar to confirm</p>
           </div>
      </section>
      <section id="endOfTrials" v-if="scored">
        <div id="endSlideOne" v-if="endSlide === 0">
            <h2>You have completed all 56 questions</h2>

            <h3 id="leftPoints"> 5 Points</h3>
            <p id="leftPercent"> You chose the 5 point bonus on {{Math.round(percents.safe)}}% of the trials.</p>

            <img alt="image of chips" src="/static/lottery/chips_bag.png" id="rightChips"/>
            <p id="rightPercent"> You chose the lottery on {{Math.round(percents.lottery)}}% of the trials.</p>
            <p class="full">Hit <span>space</span> bar to continue</p>
        </div>
        <div id="endSlideTwo"  v-if="endSlide === 1">
          <h2> The computer will now select a random trial to count towards your bonus...</h2>
          <p class="full">Hit <span>space</span> bar to continue</p>
        </div>
        <div id="endSlideThree"  v-if="endSlide === 2">
          <h3>The computer chose Question {{scored.index + 1}}. You chose {{scored.choice}} for Question {{scored.index + 1}}.</h3>
          <div id="left" v-bind:class="{'selected': scored.choice === 'safe'}">
            <h3> 5 Points</h3>
          </div>
          <div id="right" v-bind:class="{'selected': scored.choice === 'lottery'}">
            <div id="chips">
              <!-- stack blue -->
              <div id="blue" class="chips">
                <h3 class="top">{{scored.spread.blue}} chips</h3>
                <img v-for="(n,index) in scored.spread.blue" :key="index" width="60" height="5" v-bind:src="randomChip('blue', index)" alt="blue chip">
                <h3 v-if="!scored.red" class="bottom">{{scored.value}} pts</h3>
                <h3 v-else class="bottom"> 0 pts</h3>
              </div>

              <!-- stack red -->
              <div id="red" class="chips">
                <h3 class="top">{{scored.spread.red}} chips</h3>
                <img v-for="(n,index) in scored.spread.red" :key="index" width="60" height="5" v-bind:src="randomChip('red', index)" alt="red chip">
                <h3 v-if="scored.red" class="bottom">{{scored.value}} pts</h3>
                <h3 v-else class="bottom"> 0 pts</h3>
              </div>

              <!-- stack hidden -->
              <div id="gray" class="chips" v-if="scored.spread.gray > 0">
                <h3 class="top">{{scored.spread.gray}} Hidden chips</h3>
                <img v-for="(n,index) in scored.spread.gray" :key="index" width="60" height="5" v-bind:src="randomChip('gray', index)" alt="gray chip">
              </div>

            </div>
          </div>
              <p class="full">Hit <span>space</span> bar to continue</p>
        </div>
            <div id="endSlideFour"  v-if="endSlide === 3">
              <h3 v-if="scored.choice === 'safe'">You picked Safe on this trial but this is what would be in the bag</h3>
              <h3 v-else>Now see what was in your bag!<br>
                If we show you what the gray chips were made up of, this is what your bag looked like.</h3>
              <div id="chips"  >
                <!-- stack blue -->
                <div id="blue" class="chips">
                  <h3 class="top">{{scored.finalSpread.blue}} chips</h3>
                  <img v-for="(n,index) in scored.finalSpread.blue" :key="index" width="60" height="5" v-bind:src="randomChip('blue', index)" alt="blue chip">
                  <h3 v-if="!scored.red" class="bottom">{{scored.value}} pts</h3>
                  <h3 v-else class="bottom"> 0 pts</h3>
                </div>

            <!-- stack red -->
            <div id="red" class="chips">
              <h3 class="top">{{scored.finalSpread.red}} chips</h3>
              <img v-for="(n,index) in scored.finalSpread.red" :key="index" width="60" height="5" v-bind:src="randomChip('red', index)" alt="red chip">
              <h3 v-if="scored.red" class="bottom">{{scored.value}} pts</h3>
              <h3 v-else class="bottom"> 0 pts</h3>
            </div>
          </div>
          <p class="full">Hit <span>space</span> bar to continue</p>
        </div>
            <div id="endSlideFour"  v-if="endSlide === 4">
              <h3>The computer will now pick a chip from <span v-if="scored.choice === 'safe'">what would have been in </span>your bag...</h3>
              <img src="/static/lottery/chips_bag.png" />
              <p class="full">Hit <span>space</span> bar to continue</p>
            </div>
            <div id="endSlideFive"  v-if="endSlide === 5">
            <h3 v-if="scored.choice === 'safe'">You picked Safe on this trial but this is what would be in the bag</h3>
             <h3 v-if="scored.choseBlue">You pulled a blue chip!</h3>
             <h3 v-else>You pulled a red chip!</h3>
              <div id="redPick" v-if="!scored.choseBlue">
              <img src="/static/lottery/red_chip_revealed.png"/>
                <div class="win" v-if="scored.win">
                  You win <span v-if="scored.choice === 'lottery'"> {{scored.value}} </span> <span v-else> 5 </span> points! <br />
                  <span v-if="(scored.choice !== 'lottery' && scored.red)">The lottery won {{scored.value}} points </span>
                  <span v-else-if="(scored.choice !== 'lottery' && !scored.red && !scored.choseBlue)" >The lottery won 0 points</span>
                </div>
                <div class="loss" v-if="!scored.win">
                  You won 0 bonus points.  See the points bar to see your total points earned.
                </div>
              </div>
              <div id="bluePick" v-else>
                <img src="/static/lottery/blue_chip_revealed.png"/>
                <div class="win" v-if="scored.win">
                  You win <span v-if="scored.choice === 'lottery'"> {{scored.value}} </span> <span v-else> 5 </span> points!<br />
                  <span v-if="(scored.choice !== 'lottery' && !scored.red)">The lottery won {{scored.value}} points </span>
                  <span v-else-if="(scored.choice !== 'lottery' && scored.red && scored.choseBlue)" >The lottery won 0 points</span>
                </div>
                <div class="loss" v-if="!scored.win">
                  You won 0 bonus points.  See the points bar to see your total points earned.
                </div>
              </div>
              <p class="full">Hit <span>space</span> bar to continue</p>
        </div>
      </section>
    </div>
    <div v-else>
      <scoreChart v-bind:scores="scoreChart" v-if="scoreChart.length > 0" />
    </div>

      <section id="pointsSection" v-if="!complete">
        <div id="leftTrap"> </div>
          <div class="helper">
            <h3>
              You can use your keyboard as well.
            </h3>
          </div>
          <hr/>
          <div id="pointTotal">
            Points Bank: <img src="/static/Gem.png"/><span id="pointNum" v-if="!scored"> - - </span><span id="pointNum" v-if="(scored && endSlide < 5)">56</span></span><span id="pointNum" v-else-if="scored"> <span v-if="scored.choice === 'lottery'">{{(scored.win && scored.value) + 56 || 56}} </span> <span v-else>61</span> </span>
          </div>
          <div id="rightTrap"> </div>
      </section>
    </div>
</template>
<script src="./Game.js"></script>
<style>
  @import './game.css';
</style>
