<template>
  <div id="textTwist">
      <game v-if="readInstructions || scoreChart"></game>
      <instruction v-on:startGame="readInstructions = true" v-else></instruction>

    </div>
</template>
<script src="./TextTwist.js"></script>
