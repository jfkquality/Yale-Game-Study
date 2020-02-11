<template>
  <div class="instruction">
      <header>
        <h1>Lottery Game Instructions</h1>
      </header>
      <!-- Slides -->
      <div id="slideContainer">

         <section id="slide_1" class="slide" v-bind:class="{active: slideCounter == 1}">
            <p>In this game, you will be asked to make a series of choices. Each question will ask you to choose between taking 5 points as your bonus or playing a lottery for a chance to earn another amount of points.</p>
        </section>

        <section id="slide_2" class="slide alignCenter justifyCenter" v-bind:class="{active: slideCounter == 2}">
            <h1 class="titleSlide">Understanding the lottery display</h1>
        </section>

        <section id="slide_3" class="slide alignCenter" v-bind:class="{active: slideCounter == 3}">
              <p>This is what the “lottery” will look like.</p>
            <img src="/static/lottery/75 red 25 blue.png" alt="stack of chips image"/>
        </section>

        <section id="slide_4" class="slide alignCenter" v-bind:class="{active: slideCounter == 4}">
          <div>
              <p>Each lottery is actually a bag with 100 poker chips (some red and some blue).</p>
              <p>The size of the stack of red and blue chips and the numbers written next to them tell you how many red and blue chips are in that bag.</p>
              <p>According to the display on the right, in this bag most chips are red (75 out of 100) and fewer are blue (25 out of 100).</p>
          </div>
            <img src="/static/lottery/75 red 25 blue.png" alt="stack of chips image"/>
          <div class="slideFooter"></div>
        </section>

        <section id="slide_5" class="slide alignCenter" v-bind:class="{active: slideCounter == 5}">
            <div>
              <p>If you put your hand in this bag and pull out one chip at random, you would be <strong>more likely to get a red chip than a blue chip</strong>, since there are more red chips than blue chips</p>
              <p>We call the process of putting your hand in the bag and pulling out a chip “playing the lottery.”</p>
            </div>
            <img src="/static/lottery/Number of chips.png" alt="stack of chips image"/>
        </section>

        <section id="slide_6" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 6}">
          <p>Here are some example lotteries:</p>
          <div class="justifyBetween alignEnd">
            <img src="/static/lottery/75 blue 25 red.png" alt="stack of chips image."/>
            <img src="/static/lottery/50 blue 50 red.png" alt="stack of chips image."/>
            <img src="/static/lottery/75 red 25 blue no points.png" alt="stack of chips image."/>
          </div>
        </section>

        <section id="slide_7" class="slide alignCenter" v-bind:class="{active: slideCounter == 7}">
            <div>
              <p>Why should you care which color chip you pull out?</p>
              <p>Because each chip is worth some reward points. You know how much each chip is worth by the points amount below each color.</p>
              <p>If you chose to play this lottery and pulled out a red chip, you would get 15 points.  If you pulled out a blue chip, you would get 0 points.</p>
            </div>
            <img src="/static/lottery/amount of points.png" alt="stack of chips image"/>
        </section>

        <section id="slide_8" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 8}">
            <p>For each lottery, one color will be worth 0 points and the other color will be worth more. Half of the time blue will be worth more, and the other half of the time red will be worth more.</p>
            <div class="textCenter">
              <img src="/static/lottery/explaining  points.png" alt="2 stacks of chips with circles at top and bottom image"/>
            </div>
        </section>

        <section id="slide_9" class="slide alignCenter" v-bind:class="{active: slideCounter == 9}">
            <div>
              <p>You will also see lotteries like this one.  Here, part of the bag is hidden, so you only have partial information about how many of the 100 chips are red and how many are blue.</p>
              <p>In this example, you can see that there are at least 25 blue chips and at least 25 red chips. The remaining 50 chips are gray, indicating that you do not know what color they are.</p>
            </div>
            <img src="/static/lottery/hidden-chips-circled.png" alt="stack of chips image"/>
        </section>

        <section id="slide_10" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 10}">
          <p>The gray chips could be all red.</p>
          <div class="justifyBetween">
            <img src="/static/lottery/chips with hidden chips.png" alt="stack of chips image."/>
            <img src="/static/lottery/75 red 25 blue chips.png" alt="stack of chips image."/>
          </div>
        </section>

        <section id="slide_11" class="slide stack alignCenter" v-bind:class="{active: slideCounter == 11}">
          <p>The gray chips could also be all blue.</p>
          <div class="justifyBetween">
            <img src="/static/lottery/chips with hidden chips.png" alt="stack of chips image."/>
            <img src="/static/lottery/75 blue 25 red points.png" alt="stack of chips image."/>
          </div>
        </section>

        <section id="slide_12" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 12}">
          <p>OR the gray chips could be <strong>any combination</strong> of red and blue.</p>
          <div class="justifyBetween">
            <img src="/static/lottery/chips with hidden chips.png" alt="stack of chips image."/>
            <img src="/static/lottery/60 blue 40 red points.png" alt="stack of chips image."/>
          </div>
        </section>

        <section id="slide_13" class="slide alignCenter" v-bind:class="{active: slideCounter == 13}">
            <p>While there could be many possible combinations of red and blue chips in the hidden part, <strong>the number of chips in each of these bags is fixed at 100 chips total.</strong>  It will not change during the game.</p>
            <img src="/static/lottery/25-25-50 hidden-no points.png" alt="stack of chips image."/>
        </section>

        <section id="slide_14" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 14}">
          <p>These are examples of different lotteries with hidden chips you will see.</p>
          <div class="justifyBetween alignEnd">
            <img src="/static/lottery/38 blue:38 red:24 hidden.png" alt="stack of chips image."/>
            <img src="/static/lottery/25-25-50 hidden-no points.png" alt="stack of chips image."/>
            <img src="/static/lottery/13 blue:13 red 74 hidden no points.png" alt="stack of chips image"/>
          </div>
        </section>

        <section id="slide_15" class="slide" v-bind:class="{active: slideCounter == 15}">
          <div>
            <p>Every trial in the game is linked to a real lottery bag.</p>
            <p>We have shown you some examples.  The amount of points you could get for winning the lottery, and the number of winning chips per bag, changes from lottery to lottery.</p>
            <p>At the end of the session, one trial will be selected at random to determine your bonus.</p>
          </div>
        </section>

        <section id="slide_16" class="slide alignCenter justifyCenter" v-bind:class="{active: slideCounter == 16}">
          <h1 class="titleSlide">Understanding the game</h1>
        </section>

        <section id="slide_17" class="slide" v-bind:class="{active: slideCounter == 17}">
          <div>
            <p>You will answer 56 questions. Each question will ask you to choose between taking 5 points as your bonus or playing a lottery, like in the examples reviewed before. The lottery bag and the amount of points you could win will be different for each question.</p>
            <p>Your options will be presented this way:</p>
          </div>
        </section>

        <section id="slide_18" class="slide alignCenter" v-bind:class="{active: slideCounter == 18}">
            <p class="pointsSelected"><strong>5 points</strong></p>
            <p class="titleSlide">or</p>
            <img src="/static/lottery/13 blue 13 red 74 hidden.png" alt="stack of chips image"/>
        </section>

        <section id="slide_19" class="slide alignCenter justifyCenter" v-bind:class="{active: slideCounter == 19}">
          <h1 class="titleSlide">Understanding bonus points</h1>
        </section>

        <section id="slide_20" class="slide" v-bind:class="{active: slideCounter == 20}">
          <div>
            <p>Make sure you choose carefully each time! Only <strong>one</strong> of the choices you make will count. This one choice will determine your bonus.</p>
            <p>This means <strong>you should always choose the option you prefer</strong>.</p>
          </div>
        </section>

        <section id="slide_21" class="slide" v-bind:class="{active: slideCounter == 21}">
          <div>
            <p>At the end of the game, the computer will select a trial at random.  This will be the trial that will count towards your bonus.</p>
            <p>If in the selected question you chose the certain gain of 5 points, you will receive 5 points as your bonus.</p>
            <p>If you selected the lottery, you will play the lottery that was offered.  You will get one chip from the lottery bag.  If the chip you pull out is a winning chip, you will receive the winning amount of points as your bonus for the session. If the chip you pick is not a winning chip, you will not earn any additional points.</p>
          </div>
        </section>

        <section id="slide_22" class="slide alignCenter justifyCenter" v-bind:class="{active: slideCounter == 22}">
          <h1 class="titleSlide">Questions</h1>
        </section>

        <section id="slide_23" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 23}">
            <p>Suppose this question was randomly selected at the end and you chose the option on the LEFT.  How much bonus would you get?</p>
          <div class="alignCenter justifyBetween">
            <p class="showSelected pointsSelected"><strong>5 points</strong></p>
            <p class="titleSlide">or</p>
            <img src="/static/lottery/75 blue 25 red points.png" alt="stack of chips image"/>
          </div>
          <div class="slideFooter">
            <p class="answers">The correct answer is: 5 points</p>
          </div>
        </section>

        <section id="slide_24" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 24}">
            <p>How many bonus points would you get if you chose the option on the right in this lottery?</p>
          <div class="alignCenter justifyBetween">
            <p class="pointsSelected"><strong>5 points</strong></p>
            <p class="titleSlide">or</p>
            <img class="showSelected" src="/static/lottery/75 red 25 blue.png" alt="stack of chips image"/>
          </div>
          <div class="slideFooter">
            <p class="answers">The correct answer is: you will have to play the lottery to find out. If you pull out a blue chip, you get 0 points. If you pull out a red chip, you get 17 points. You are more likely to pull a red chip on this lottery, because there are more red chips than blue chips</p>
          </div>
        </section>

        <section id="slide_25" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 25}">
            <p>How about if you chose the option on the right in this lottery?</p>
          <div class="alignCenter justifyBetween">
            <p class="pointsSelected"><strong>5 points</strong></p>
            <p class="titleSlide">or</p>
            <img class="showSelected" src="/static/lottery/25 blue 25 red 50 hidden blue 15.png" alt="stack of chips image"/>
          </div>
          <p class="answers">The correct answer is: you will have to play the lottery to find out.  If you pull out a blue chip, you get 15 points.  If you pull out a red chip, you get 0 points.  You do not know how many of the gray chips are red and how many are blue, you just know that there are at least 25 blue chips and at least 25 red chips.</p>
        </section>

        <section id="slide_26" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 26}">
          <p>From which lottery are you more likely to pull out a blue chip? LEFT or RIGHT?</p>
          <div class="alignCenter justifyBetween alignEnd">
            <img src="/static/lottery/50 blue 50 red-17 points.png" alt="stack of chips image"/>
            <img src="/static/lottery/75 blue 25 red-17 points.png" alt="stack of chips image"/>
          </div>
            <p class="answers">The correct answer is RIGHT, because there are more blue chips in the lottery on the right (75 vs. 50).</p>
        </section>

        <section id="slide_27" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 27}">
            <p>From which of these lotteries are you more likely to pull out a red chip? LEFT or RIGHT?</p>
          <div class="alignCenter justifyBetween alignEnd">
            <img src="/static/lottery/25-25-50 hidden-no points.png" alt="stack of chips image"/>
            <img src="/static/lottery/13 blue:13 red 74 hidden no points.png" alt="stack of chips image"/>
          </div>
            <p class="answers">The correct answer is: you will have to play the lottery to find out. You know that there are at least 25 red chips in the lottery on the left, and at least 13 red chips in the lottery on the right. You do NOT know how many of the gray chips are red in each of the lotteries, so you CANNOT be sure which one has more chips. You can only be sure about the chips you can see.</p>
        </section>

        <section id="slide_28" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 28}">
            <p>From which lottery are you more likely to get 0 points?</p>
          <div class="alignCenter justifyBetween alignEnd">
            <img src="/static/lottery/50 blue 50 red- red 17 points.png" alt="stack of chips image"/>
            <img src="/static/lottery/75 blue 25 red-red 17 points.png" alt="stack of chips image"/>
          </div>
          <div>
            <p class="answers">The correct answer is RIGHT. In both of these lotteries, blue chips are worth 0 points.  Because the RIGHT lottery has more blue chips, it has a greater chance of getting 0 points.</p>
          </div>
        </section>

        <section id="slide_29" class="slide alignCenter justifyBetween" v-bind:class="{active: slideCounter == 29}">
          <h1 class="titleSlide">Putting it all together</h1>
        </section>

        <section id="slide_30" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 30}">
          <div>
            <p>You will make a choice on each trial.</p>
          </div>
          <div class="alignCenter justifyBetween">
              <p class="pointsSelected"><strong>5 points</strong></p>
            <p class="titleSlide">or</p>
              <img src="/static/lottery/13 blue 13 red 74 hidden.png" alt="stack of chips image"/>
          </div>
          <div class="alignCenter justifyBetween noMargin">
            <p>To select the option on the LEFT, press the F key.</p>
            <p class="titleSlide"> </p>
            <p>To select the option on the RIGHT, press the J key.</p>
          </div>
        </section>

        <section id="slide_31" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 31}">
          <p>You will make a choice on each trial.</p>
          <div class="alignCenter justifyBetween">
            <p class="pointsSelected"><strong>5 points</strong></p>
            <p class="titleSlide">or</p>
            <img class="showSelected" src="/static/lottery/13 blue 13 red 74 hidden.png" alt="stack of chips image"/>
          </div>
          <div class="alignCenter justifyBetween noMargin">
              <p>To select the option on the LEFT, press the F key.</p>
              <p class="titleSlide"> </p>
              <p>To select the option on the RIGHT, press the J key.</p>
          </div>
              <p class="explain">Once you have made your selection, your choice will be highlighted in yellow, like this.  To CONFIRM your selection, press the SPACE bar. </p>
        </section>

        <section id="slide_32" class="slide" v-bind:class="{active: slideCounter == 32}">
          <div>
            <p>Once you have confirmed your choice, the game will continue with more questions.</p>
            <p>Remember: each question could count for your bonus.  At the end of the game, one trial will be selected at random.</p>
          </div>
        </section>

        <section id="slide_33" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 33}">
          <div>
            <p>If this were the randomly selected trial and you had chosen the option on the <strong>LEFT</strong>, you would earn a <strong>5 point bonus</strong>.</p>
          </div>
          <div class="alignCenter justifyBetween">
            <p class="showSelected pointsSelected"><strong>5 points</strong></p>
            <p class="titleSlide">or</p>
            <img src="/static/lottery/13 blue 13 red 74 hidden.png" alt="stack of chips image"/>
          </div>
        </section>

        <section id="slide_34" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 34}">
          <p>If this were the randomly selected trial and you had chosen the option on the <strong>RIGHT</strong>, you would play the lottery on the right to find out your bonus.</p>
          <div class="alignCenter justifyBetween">
            <p class="pointsSelected"><strong>5 points</strong></p>
            <p class="titleSlide">or</p>
            <img class="showSelected" src="/static/lottery/13 blue 13 red 74 hidden.png" alt="stack of chips image"/>
          </div>
        </section>

        <section id="slide_35" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 35}">
          <div>
            <p>If you play the lottery at the end of the game, the contents of the hidden chips will be revealed:</p></div>
          <div class="alignCenter justifyBetween">
            <img src="/static/lottery/25 blue 25 red 50 hidden blue 15.png" alt="stack of chips image."/>
            <img src="/static/lottery/60 blue 40 red blue 15.png" alt="stack of chips image."/>
          </div>
          <p class="subscript">In this example, 35 of the 50 hidden chips were blue, for a total of 60 blue chips and 40 red chips.  This means that for this lottery, there is a better chance of pulling out a winning chip, since there are more blue chips.</p>
        </section>

        <section id="slide_36" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 36}">
            <p>Once you have seen all the chips, all of the chips go into the lottery bag.
            </p>
          <div class = "alignCenter justifyBetween">
            <img src="/static/lottery/chips_bag.png" alt="paper bag image."/>
            <img src="/static/lottery/60 blue 40 red blue 15.png" alt="stack of chips image."/>
          </div>
          <p>When you press the SPACE bar, the computer pulls a chip out of the bag for you. </p>
        </section>

        <section id="slide_37" class="slide alignCenter stack" v-bind:class="{active: slideCounter == 37}">
            <p>This is what it looks like when a chip is pulled:</p>
          <div class="alignCenter justifyBetween">
            <img src="/static/lottery/Small bag with opacity.png" alt="bag of chips image."/>
            <div class="textCenter">
              <img src="/static/lottery/blue_chip_revealed.png" alt="poker chip sun arrow."/>
              <p><strong>You pulled a blue chip!<br/>
              You win 17 bonus points!</strong></p>
            </div>
            <img src="/static/lottery/75 blue 25 red dimmed.png" alt="stack of chips image."/>
          </div>
          <p>If you pulled a red chip, you would have gotten 0 points.</p>
        </section>

        <section id="slide_38" class="slide stack" v-bind:class="{active: slideCounter == 38}">
          <h1>End of instructions</h1>
          <div>
            <p>You will now play the game. Each question will ask you to choose between taking 5 points as your bonus or playing a lottery for a chance to earn another amount of points.</p>
            <p>Press the <strong>F key</strong> if you prefer the option on the left.</p>
            <p>Press the <strong>J key</strong> if you prefer the option on the right.</p>
            <p>To confirm your selection, press the <strong>SPACE bar</strong>.</p>
            <p>The game will then continue with more questions. The amount of points you could get for winning the lottery, and the number of winning chips per bag, changes from lottery to lottery.</p>
            <p>When you have completed all 56 questions, you will see the outcome of one randomly selected trial and can earn additional bonus points.</p>
          </div>
        </section>

      </div>

      <div class="footer">
        <instruction-control
        v-bind:total-slides="38"
        v-on:back="controlSlides"
        v-on:next="controlSlides"
        v-on:skip="controlSlides"
        v-on:start="startGame"
        >
        </instruction-control>
      </div>

  </div>
</template>
<script>

import Instructions from '../../Instructions';

export default {
  mixins: [
    Instructions,
  ],
};
</script>
<style>
  @import './style.css';
</style>
