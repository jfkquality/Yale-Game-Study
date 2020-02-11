<template>
  <div id="shapeGame">
      <game v-if="readInstructions || scoreChart"></game>
      <instruction v-on:startGame="readInstructions = true" v-else></instruction>

    </div>
</template>
<script src="./ShapeGame.js"></script>
