<template>
  <div id="app">
    <div id="nav">
      <router-link to="/Home"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
  @import "http://at.alicdn.com/t/font_792290_q6a810ufzpl.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-bottom: 1.05rem;
}
/*#nav {*/
  /*padding: 30px;*/
  /*a {*/
    /*font-weight: bold;*/
    /*color: #2c3e50;*/
    /*&.router-link-exact-active {*/
      /*color: #42b983;*/
    /*}*/
  /*}*/
/*}*/
#app{
  margin:0;
  padding:0;
}
*{
  padding:0;
  margin:0
}
body{
  background-color: #EFF3F6;
  font-size:.28rem;
}
li{
  list-style:none;
}
input,button{
  outline: none
}
html {
  font-size: 13.333333333333334vw; /* 100vw / 750 * 100 */
}
//
.font-16{
    font-size:.32rem
}
.font-14{
    font-size:.28rem
}
.font-12{
    font-size:.24rem
}
.color-FCA62F{
    color:#FCA62F
}
.color-E47E59{
  color:#E47E59;
}
.color-85CCA1{
  color:#85CCA1;
}
.fat{
    font-weight: 600
}
</style>
