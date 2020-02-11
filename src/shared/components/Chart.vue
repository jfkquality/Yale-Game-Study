<template>
  <div id="chartContainer">
    <h2 class="chart"> Here's Your Progress!</h2>
    <div id="prettyStars">
      <object type="image/svg+xml" data="/static/star.svg" style="top:100px; left: 70px;">
        Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/star.svg" style="top:80px; left: 140px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/star.svg" style="top:10px; left: 90px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/star.svg" style="top:50px; left: -50px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/star.svg" style="top:100px; left: 250px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/star.svg" style="top:20px; left: 240px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/star.svg" style="top:110px; left: 320px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/star.svg" style="top:0px; left: 350px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/star.svg" style="top:10px; left: 420px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/star.svg" style="top:90px; left: 470px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/starWithOpacity.svg" style="top:20px; left: -10px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/starWithOpacity.svg" style="top:30px; left: 130px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/starWithOpacity.svg" style="top:80px; left: -20px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/starWithOpacity.svg" style="top:20px; left: 300px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/starWithOpacity.svg" style="top:5px; left: 200px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/starWithOpacity.svg" style="top:90px; left: 190px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/starWithOpacity.svg" style="top:100px; left: 380px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/starWithOpacity.svg" style="top:10px; left: 480px;">
          Your browser does not support SVG
      </object>
      <object type="image/svg+xml" data="/static/starWithOpacity.svg" style="top:50px; left: 506px;">
          Your browser does not support SVG
      </object>
    </div>

    <div class="xaxis alignCenter justifyCenter">
        <p id="ylabel">Game<br>Performance</p>
        <div id="ylegend" class="">
        <span v-for="legend in legends.y"> {{legend}} </span>
        </div>
        <svg id="chart" width="715" height="500">
        <path v-bind:d="path" stroke="green" stroke-width="3" fill="none"/>
            <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
                    <stop stop-color="#F8B818" offset="0%"></stop>
                    <stop stop-color="#F6DD00" offset="100%"></stop>
                </linearGradient>
            </defs>
            <g id="archive" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" v-for="star in stars">
                <g id="Text-Twist-reward-two1" fill-rule="nonzero" fill="url(#linearGradient-1)">
                    <g id="favourites-filled-star-symbol-copy" :transform="'translate(' + (star.x -13) + ', ' + (star.y - 12) + ')'">
                        <path d="M24.868776,8.39771329 L17.7087969,7.72262307 C17.2574386,7.68170851 16.867424,7.39530659 16.6829826,6.96570372 L14.1184467,0.767147987 C13.7081209,-0.255715996 12.2512594,-0.255715996 11.8409336,0.767147987 L9.29691399,6.96570372 C9.13278369,7.39530659 8.72245795,7.68170851 8.27109963,7.72262307 L1.11091536,8.39771329 C0.0440684223,8.49999969 -0.386773611,9.82972287 0.413361594,10.5457277 L5.80914515,15.2713593 C6.15792203,15.5782184 6.30153605,16.0282786 6.19895461,16.4783388 L4.57816791,23.1062928 C4.33197247,24.1498186 5.46036827,25.0088198 6.40411748,24.4566778 L12.3743571,20.9582784 C12.7641665,20.7332483 13.2360411,20.7332483 13.6258506,20.9582784 L19.5962954,24.4566778 C20.5400446,25.0088198 21.6684404,24.1702759 21.4220398,23.1062928 L19.8217694,16.4783388 C19.7191879,16.0282786 19.8628019,15.5782184 20.2115788,15.2713593 L25.6073624,10.5457277 C26.3869813,9.82972287 25.935623,8.49999969 24.868776,8.39771329 Z" id="Shape"></path>
                    </g>
                </g>
            </g>
        </svg>
    </div>
    <div id="xlabel">
        <div id="xlegend" v-bind:style="{ 'margin-left': (xMargin/2) }">
            <span v-for="legend in legends.x"> {{legend}}</span>
        </div>
        <p>Session Number</p>
    </div>
    <button v-on:click="home()" class="btnGreen" id="homeButton"> Home</button>
  </div>
</template>

<script src="./Chart.js"></script>
<style>
#homeButton {
  position:absolute;
  /* bottom: 15vh; */
  left: 45vw;
}
h2.chart{
  font-size: 3em;
  position: absolute;
  top: 5vh;
  left:37vw;
}
#prettyStars {
  position: absolute;
  top: 5vh;
  left: 37vw;
}
#prettyStars object {
  position: absolute;
}
#chartContainer {
  margin-top: 10vh;
  margin-left: 20vw;
}
#ylegend {
  float: left;
  margin-top: 15px;
}
#ylegend span {
  line-height: 45px;
  display: block;
}
#chart {
  margin-bottom: 10px;
  margin-left: 12px;
  float: left;
  border-left:2px solid black;
  border-bottom: 2px solid black;
}
#xlegend {
  width: 700px;
  display: flex;
  clear:both;
  margin-right: 10px;
}
#xlegend span{
  flex: 1;
}
.alignCenter {
    display: flex;
    align-items: center;
    /* width: 40px; */
}
.alignEnd {
    align-items: flex-end;
}
.justifyCenter {
    justify-content: space-around;
}
.xaxis {
    /* display: inline-block; */
    width: 900px;
    padding-top: 125px;
}
#xlabel {
    display: flex;
    flex-direction: column;
    transform: translateX(180px);
    /* margin-left: 15vw; */
}
#xlabel p {
    width: 700px;
    /* transform: translateX(-300px); */
}
#ylabel {
    padding-right: 20px;
}

</style>
