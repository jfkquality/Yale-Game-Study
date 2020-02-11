<template>
    <div class="instructionControls">
        <div id="left">
            <button class="btnPlain" v-on:click="back()" v-if="slideCounter > 1">Back</button>
            <button class="btnGreen" v-on:click="next()" autofocus>{{buttonText}}</button>
        </div>

        <div id="right">
            <button class="btnPlain" v-on:click="skip()" v-if="slideCounter != totalSlides">Skip</button>
            <span>{{slideCounter}}/{{totalSlides}}</span>
        </div>
    </div>
</template>
<script src="./InstructionControls.js"></script>
<style>
body {
    text-align: left;
}

</style>
