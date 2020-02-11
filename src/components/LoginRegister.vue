<template>
    <div id="loginRegister">
      <button v-on:click="register = false"> Login </button>
      <button v-on:click="register = true"> Register </button>
      <div id="login" v-if="!register">
        <input v-model="username" placeholder="ID" class="text" />
        <br />
        <input v-model="password" placeholder="Password" type="password" class="text"/>
        <br />
        <button v-on:click="sendLogin({id: username, password})" class="submit"> Login </button>
      </div>
      <div id="register" v-else>
      <h3> Group</h3>
        <input type="radio" id="one" value="A" v-model="group">
        <label for="one">A</label>
        <br>
        <input type="radio" id="two" value="B" v-model="group">
        <label for="two">B</label>
        <br />
        <input v-model="username" placeholder="Username" class="text"/>
        <br />
        <input v-model="password" placeholder="Password" type="password" class="text"/>
        <br />
        <input v-model="confPass" placeholder="Confirm Password" type="password" class="text"/>
        <br />
        <button v-on:click="checkRegister" class="submit"> Register </button>
      </div>
    </div>
</template>
<script src="./LoginRegister.js"></script>

<style type="text/css">
#loginRegister {
margin-left: auto;
margin-right: auto;
margin-top: 30vh;
}
.text {
margin-top: 15px;
width: 20vw;
height: 4vh;
border-radius: 5%;
}
  button {
    background-color: white;
    color: grey;
    width: 5em;
    height: 2em;
    font-size:2em;
    border: #97df77 solid 4px;
    border-radius: 5%;
  }
  .submit {
  margin-top: 10px;
    background-color: #97df77;
    color: white;
    width: 5em;
    height: 2em;
    font-size:2em;
    border: #97df77 solid 4px;
    border-radius: 5%;
  }
  button.btnGreen {
    background-color: #9CE37A; /* Green */
    color: white;
}
</style>
