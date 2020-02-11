<template>
  <div class="instruction">
      <header>
        <h1>Text Twist Instructions</h1>
      </header>
      <!-- Slides -->
      <div id="slideContainer">

        <section id="slide_1" class="slide" v-bind:class="{active: slideCounter == 1}">
          <p>You are going to see several different sets of seven letters. Your job is to come up with as many 2-letter to 7-letter words you can using the letters on the screen. You can use the keyboard to type the letters, backspace to remove letters, and press the Enter key to enter your word. Or, you can click on the letters using the mouse to bring them up to the empty spaces. You will have 2 minutes for each set. During those 2 minutes come up with as many 2-letter to 7-letter words as you can. Then, you will receive a new set of letters. You will earn a point in your Points Bank for each word you come up with. Click “Start" below to begin the game. Good luck!</p>
        </section>
      </div>

      <div class="footer">
        <instruction-control
        v-bind:total-slides="1"
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
<<<<<<< HEAD
<style>
  
</style>
=======
<!-- <style>
  @import '../../../../static/style.css';
  .instruction {
    text-align: left;
    margin: 6em 22.5em;
  }
</style>
-->
>>>>>>> dev
