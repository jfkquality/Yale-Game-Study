<template>
  <div class="instruction">
      <header>
        <h1>Numbers Game Instructions</h1>
      </header>
      <!-- Slides -->
      <div id="slideContainer">

        <section id="slide_1" class="slide" v-bind:class="{active: slideCounter == 1}">
          <p>On this task you are going to look at a series of single digit numbers that will be presented at the rate of one every 3 seconds. Look at the first two numbers, add them up, and click on the sum of those two numbers. When you look at the next number, add it to the one you saw on the screen right before it. Continue to add the next number to each preceding one. Remember, you are not being asked to give me a running total, but rather the sum of the last two numbers that were displayed on the screen.</p>
        </section>

        <section id="slide_2" class="slide" v-bind:class="{active: slideCounter == 2}">
          <p>For example, if the first two numbers were ‘5’ and ‘7’, you would click ‘12.’ If the next number was ‘3,’ you would click ‘10.’ Then if the next number was ‘2,’ you would click ‘5.’</p>
          <p>Remember, if you get lost just jump back in because I can’t stop the game once it has begun.</p>
        </section>
      </div>

      <div class="footer">
        <instruction-control
        v-bind:total-slides="2"
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
