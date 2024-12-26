<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" class="pa-1">
      
      <v-list-item class="mt-3">
        <v-avatar color="grey-darken-1" >M</v-avatar>
        <v-list-item-title class="teste-h2">Marcos Kaio</v-list-item-title>
        <v-list-item-title class="teste-h3">@Jujubaferoz</v-list-item-title>
      </v-list-item>
      <br>
      <v-list-item class="item">
        <img src="./assets/icons/book.svg" alt="">
        <h5>Minha Biblioteca</h5>
      </v-list-item>

      <v-list-item class="item">
        <img src="./assets/icons/rewind.svg" alt="">
        <h5>Histórico de Leitura</h5>
      </v-list-item>

      <v-list-item class="item">
        <img src="./assets/icons/textarrow.svg" alt="">
        <h5>Continue de Onde Parou</h5>
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
      livros: previas
    };
  }
};
</script>

<style scoped>

.item{
  display: flex;
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