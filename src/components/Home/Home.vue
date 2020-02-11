<template>
    <div id="home">
        <h1> {{ msg }} </h1>
        <nav>
            <h3>{{user}}</h3>
            <button class="logout btnClear" v-on:click="logout" >Logout</button>
        </nav>
        <ul v-if="group == 'A'">
            <li>
                <h4>Shapes</h4>
                <div class="boxHome">
                    <router-link to="/shape-game"><img src="../../assets/ShapesMenu.png"/></router-link>
                </div>
            </li>
            <li>
                <h4>Numbers</h4>
                <div class="boxHome">
                    <router-link to="/number-game"><img src="../../assets/NumbersMenu.png"/></router-link>
                </div>
            </li>
            <li>
                <h4>Lottery</h4>
                <div class="boxHome">
                    <router-link to="/lottery-game"><img src="../../assets/LotteryMenu.png"/></router-link>
                </div>
            </li>
        </ul>
        <ul v-else>
            <div class="boxHome" id="textTwistMenu">
                <li><h4>Text Twist</h4></li>
                <li><router-link to="/text-twist"><img src="../../assets/TextTwistMenu.png"/></router-link></li>
            </div>
        </ul>
    </div>
</template>


<script src="./Home.js"></script>

<style>
#home ul {
  list-style-type: none;
  display: flex;
  align-items: center;
  height: calc(100vh - 300px);
  width: 100%;
  justify-content: space-between;
  padding: 0;
}
#home ul li {
    flex: 1;
}
.boxHome {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    background-color: #272727;
    border-radius: 4px;
    min-height: 284px;
    width: 90%;
    max-width: 284px;
    margin: 20px auto 0;
    padding: 10px;
}
.boxHome#textTwistMenu {

}
h4 {
    margin: auto;
    width: auto;
    font-size: 1.8em;
}
</style>
