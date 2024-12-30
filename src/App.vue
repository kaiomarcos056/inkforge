<template>

  <v-app>

    <AppBar />

    <v-main>
      <router-view></router-view>
    </v-main>


    <!--
    <v-main style="background-color: #F7F7F5;">
      <v-tabs fixed-tabs class="bg-white">
        <v-tab text="Para você"> </v-tab>
        <v-tab text="Seguindo"> </v-tab>
      </v-tabs>
    </v-main>
    -->

  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";

export default {
  components: {
    AppBar,
  },
};

/*


import ReferralProgramCard from './components/ReferralProgramCard.vue';




export default {
  name: 'App',
  components: {
    AppBar,
  },
  data() {
    return {
      drawer: false,
      livros: previas,
      
    };
  },
  mounted() {
    // Inicialize o Tiny Slider
    tns({
      container: '.my-slider',
      items: 1.2,
      slideBy: 1,
      gutter: 16,
      autoplay: false,
      loop: true,
      mouseDrag: true,
    });
  },
};
*/
</script>

<style scoped>
/*


.item{
  display: flex !important;
}



.v-tab {
  display: inline-block;
  letter-spacing: 0.5px;
  color: black;
  font-family: 'Satoshi-Regular', sans-serif;
  text-transform: none;
}
.v-tab--selected {
  color: black;
  font-weight: bold;
  border-bottom: 2px solid;
}
*/
</style>