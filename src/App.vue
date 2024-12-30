<template>
  <div class="my-slider">
        <div v-for="(item, index) in items" :key="index" class="slide">
          <CardComponent
            backgroundImage="https://static.escolakids.uol.com.br/2024/04/a-ilha-dessa-foto-esta-localizada-em-ubatuba-sao-paulo.jpg"
            title="Perdidos na Ilha do Amor"
            :tags="['Romance', 'Aventura', 'Mistério']"
          />
        </div>
      </div>

  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" class="pa-1">

      <v-list-item class="mt-3">
        <v-avatar color="grey-darken-1" >M</v-avatar>
        <v-list-item-title class="teste-h2 ma-0 pa-0">Marcos Kaio</v-list-item-title>
        <v-list-item-title class="teste-h3">@Jujubaferoz</v-list-item-title>
      </v-list-item>
      
      <br>

      <v-list-item link>
        <div style="display: flex; gap: 8px;">
          <img src="./assets/icons/book.svg" alt="">
          <h4>Minha Biblioteca</h4>
        </div>
      </v-list-item>


      <v-list-item link>
        <div style="display: flex; gap: 8px;">
          <img src="./assets/icons/rewind.svg" alt="">
          <h4>Histórico de Leitura</h4>
        </div>
      </v-list-item>

      <v-list-item link>
        <div style="display: flex; gap: 8px;">
          <img src="./assets/icons/textarrow.svg" alt="">
          <h4>Continue de Onde Parou</h4>
        </div>
      </v-list-item>

      <v-list-item>
        <v-card variant="outlined" class="px-2 rounded-xl">
          <v-list lines="one">
            <v-list-item title="Um viciado nas estrelas" subtitle="Cap 2: Tomada de marte"></v-list-item>
            <v-divider></v-divider>

            <v-list-item title="No cair das árvores" subtitle="Cap 1: Decisão Forte"></v-list-item>
            <v-divider></v-divider>

            <v-list-item title="Fagulhas Impetuosas" subtitle="Cap 1: Carne e Osso"></v-list-item>
            <v-divider></v-divider>

            <v-list-item title="Império Hemácio" subtitle="Cap 3: transfução"></v-list-item>
          </v-list>
        </v-card>
      </v-list-item>

    </v-navigation-drawer>

    <v-app-bar flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"> <v-avatar color="grey-darken-1">M</v-avatar> </v-app-bar-nav-icon>
      <v-app-bar-title class="text-center"> <img src="./assets/logo.svg"> </v-app-bar-title>
      <v-app-bar-nav-icon> <img src="./assets/icons/plus.svg"> </v-app-bar-nav-icon>
    </v-app-bar>

    <v-main style="background-color: #F7F7F5;">
      <v-tabs fixed-tabs class="bg-white">
        <v-tab text="Para você"> </v-tab>
        <v-tab text="Seguindo"> </v-tab>
      </v-tabs>

      <v-container class="pa-4 pa-md-10">
        <h1 class="teste-h1">Em destaque</h1>
        <div>
          <CardComponent
            backgroundImage="https://static.escolakids.uol.com.br/2024/04/a-ilha-dessa-foto-esta-localizada-em-ubatuba-sao-paulo.jpg"
            title="Perdidos na Ilha do Amor"
            :tags="['Romance', 'Aventura', 'Mistério']"
          />
        </div>
        <br>
        <div v-for="(livro, index) in livros" :key="index" class="previa">
          <previa
            class="bg-transparent"
            avatar="https://via.placeholder.com/48"
            :titulo="livro.titulo"
            :tags="livro.tags"
            :texto="livro.previa"
          />
        </div>
      </v-container>
    </v-main>

  </v-app>
</template>

<script setup>
import previas from './previas.json'; // Importa o arquivo JSON

import { tns } from 'tiny-slider';
import 'tiny-slider/dist/tiny-slider.css';

import Previa from './components/Previa.vue'
import CarouselComponent from './components/Carousel.vue';
import ReferralProgramCard from './components/ReferralProgramCard.vue';
import CardComponent from "./components/Card.vue";
import { ref } from 'vue'

const drawer = ref(null)
</script>

<script>
export default {
  //data: () => ({ drawer: null }),
  data() {
    return {
      drawer: null,
      livros: previas,
      items: ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4']
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
</script>

<style scoped>
.slide {
  padding: 20px;
}

.item{
  display: flex !important;
}

.teste-h1{
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 16px;
  margin-bottom: 4px;
}

.teste-h2{
  font-family: 'Satoshi-Bold', sans-serif;
  font-weight: bold;
  font-size: 18px;
}

.teste-h3{
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 16px;
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
</style>