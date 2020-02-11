<template>
  <div class="instruction">
      <header>
        <h1>Shapes Game Instructions</h1>
      </header>
      <!-- Slides -->
      <div id="slideContainer">
        <!-- Slide 1 -->
        <section id="slide_1" class="slide" v-bind:class="{active: slideCounter == 1}">
          <p>On every trial of this game, you will see a circle or a square.   Your goal is to respond as quickly and accurately as possible to these shapes.</p>
          <p>Press the <strong>F key</strong> with your left index finger when you a see a square.</p>
          <p>Press the <strong>J key</strong> with your right index finger when you see a circle.</p>
          <p>Most of the time  you should respond to the shapes.  The shapes are “go” signals.</p>
        </section>

        <!-- Slide 2 -->
        <section id="slide_2" class="slide" v-bind:class="{active: slideCounter == 2}">
          <p>Occasionally, the shape will be followed by a sound. <strong>When the shape is followed by a sound, do NOT press a response key.</strong>  These trials are called “stop signal trials.”</p>
          <p>On half of the stop signal trials, the sound will be presented soon after the presentation of the shape.  On the other half of the trials, the sound will be presented rather late, and it will become very difficult or even impossible to stop your response.</p>
          <p>It is important that you <strong>DO NOT WAIT</strong> for a stop signal to occur, because if you start waiting, then the computer will wait with presenting the stop signals.</p>
        </section>

        <!-- Slide 3 -->
        <section id="slide_3" class="slide" v-bind:class="{active: slideCounter == 3}">
          <p>Listen for the sound of a tone. This is what the stop signal sounds like.  When you hear a tone like this, <strong>DO NOT</strong> press any response keys.</p>
          <p>If you do not hear a tone on this screen, please notify the research assistant.  If you do hear a tone, proceed to the next screen.</p>
        </section>

        <!-- Slide 4 -->
        <section id="slide_4" class="slide" v-bind:class="{active: slideCounter == 4}">
          <p>In this example, there is a <strong>SQUARE</strong> on the screen and <strong>NO STOP SIGNAL</strong> (you do not hear a sound).  The correct response for this trial is to <strong>press F</strong>.</p>
          <p class="square"></p>
        </section>

        <!-- Slide 5 -->
        <section id="slide_5" class="slide" v-bind:class="{active: slideCounter == 5}">
          <p>In this example, there is a <strong>SQUARE</strong> on the screen, and you should have heard a tone.</p>
          <p>Because the shape <strong>IS</strong> followed by a stop signal (you hear a sound), the correct response for this trial is not to press anything.</p>
          <p class="square"></p>
          <p class="center-text"><strong>Do not press anything</strong></p>
        </section>

        <!-- Slide 6 -->
        <section id="slide_6" class="slide" v-bind:class="{active: slideCounter == 6}">
          <p>In this example, there is a <strong>CIRCLE</strong> on the screen and <strong>NO STOP SIGNAL</strong> (you do not hear a sound).  The correct response for this trial is to <strong>press J</strong>.</p>
          <p class="circle"></p>
        </section>

        <!-- Slide 7 -->
        <section id="slide_7" class="slide" v-bind:class="{active: slideCounter == 7}">
          <p>In this example, there is a <strong>CIRCLE</strong> on the screen, and you should have heard a tone.</p>
          <p>Because the shape <strong>IS</strong> followed by a stop signal (you hear a sound),   the correct response for this trial is not to press anything.</p>

          <p class="circle"></p>
          <p class="center-text"><strong>Do not press anything</strong></p>
        </section>

        <!-- Slide 8 -->
        <section id="slide_8" class="slide" v-bind:class="{active: slideCounter == 8}">
          <p>You will play four blocks of 64 trials of this game.  For all trials, respond as quickly and accurately as possible.  On some trials you can earn additional points.  You will be told when you are able to earn additional points before each trial.</p>
        </section>

        <!-- Slide 9 -->
        <section id="slide_9" class="slide" v-bind:class="{active: slideCounter == 9}">
          <div class = "center-text">
          <span class="Gems">
            <img src="/static/Gem.png"/>
            <img src="/static/Gem.png"/>
            <img src="/static/Gem.png"/>
            <img src="/static/Gem.png"/>
            <img src="/static/Gem.png"/>
          </span>
          <p class="plus">+</p>
          </div>
          <p>When you see this before a square or a circle, you can get 5 points for correctly responding or correctly withholding a response.</p>
        </section>

        <!-- Slide 10 -->
        <section id="slide_10" class="slide" v-bind:class="{active: slideCounter == 10}">
          <p class="plus">+</p>
          <p>When you see this before a square or a circle, you will not receive any additional points for correctly responding or correctly withholding a response.</p>
        </section>

        <!-- Slide 11 -->
        <section id="slide_11" class="slide" v-bind:class="{active: slideCounter == 11}">
          <p>Just remember: </p>
          <p>When there is no stop signal (no sound):</p>
          <p>Press the <strong>F key</strong> when you see a square <br>
            Press the <strong>J key</strong> when you see a circle </p>
          <p>When the shape is followed by a stop signal (a sound):  <strong>DO NOT PRESS</strong> a response key.</p>
          <p>You will know how many additional points you will receive for correct responses before each trial.</p>
          <p>In the first two blocks, you will not be eligible to earn additional points.  For the second two blocks, quick and accurate responses will be rewarded with additional points.</p>
          <p>You will see your points total at the end of each block. These points will be converted into a bonus at the end of the study.  It is very important that you work as quickly and accurately as possible for ALL trials, not just the ones with points.  Your speed and accuracy on all trials will also influence your bonus.</p>
        </section>

        <!-- Slide 12. Move <p> to slide 11 so slide 11 is last, summary slide inside-->
        <!-- <section id="slide_12" class="slide" v-bind:class="{active: slideCounter == 12}">
          <p>In the first two blocks, you will not be eligible to earn additional points.  For the second two blocks, quick and accurate responses will be rewarded with additional points.</p>
          <p>You will see your points total at the end of each block. These points will be converted into a bonus at the end of the study.  It is very important that you work as quickly and accurately as possible for ALL trials, not just the ones with points.  Your speed and accuracy on all trials will also influence your bonus.</p>
        </section> -->
      </div>

      <div class="footer">
        <instruction-control
        v-bind:total-slides="11"
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

const audio = new Audio('/static/shapestone.wav');

export default {
  mixins: [
    Instructions,
  ],
  methods: {
    controlSlides(value) {
      this.slideCounter = value.slideCounter;
      if (value.slideEnded) {
        this.slideEnded = value.slideEnded;
      }
      if (
        value.slideCounter === 3
        || value.slideCounter === 5
        || value.slideCounter === 7
      ) {
        setTimeout(() => {
          audio.play();
        }, 500);
      }
    },
  },
};

</script>

<style>
  @import './style.css';


</style>
