<template>
  <div id="app">
    <div id="nav">
      <router-link to="/Home"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
  @import "http://at.alicdn.com/t/font_792290_jmpwmk9dcbr.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
html {
  font-size: 13.333333333333334vw; /* 100vw / 750 * 100 */
}
</style>
