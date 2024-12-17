<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" class="pa-1">

      <v-list-item lines="two" prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg" subtitle="Leitor"
        title="Jane Smith" class="mb-3"></v-list-item>

      <v-list-item>
        <v-list-item-title class="text-h6 font-weight-medium">Minha Biblioteca</v-list-item-title>
      </v-list-item>
      <br><br>
      <v-list-item>
        <v-list-item-title class="text-h6 font-weight-medium">Continuar Lendo</v-list-item-title>
      </v-list-item>

      <v-list-item class="mb-3" title="Além das Estrelas Caídas" subtitle="Clara Penrose"></v-list-item>
      <v-list-item class="mb-3" title="O Último Sussurro do Inverno" subtitle="Gabriel Dantas"></v-list-item>
      <v-list-item class="mb-3" title="Nas Profundezas da Alma" subtitle="Rafael Silva"></v-list-item>

    </v-navigation-drawer>

    <v-app-bar flat class="border-b">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="text-center">InkForge</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-row no-gutters>
        <v-col cols="6">
          <v-sheet class="pa-6" style=" background-color: #d9d9d9; border-right: 2px solid gray;">
            
          </v-sheet>
        </v-col>

        <v-col cols="6" class="">
          <v-sheet class="pa-6" style="background-color: #d9d9d9;">
            
          </v-sheet>
        </v-col>

      </v-row>

      <v-container class="pa-5 pa-md-10">
        <h1 class="text-h5 text-md-h4 mb-5">Em Destaque</h1>

        <CarouselComponent />

        <ReferralProgramCard />
        <br>
        <ReferralProgramCard />
        <br>
        <ReferralProgramCard />
      </v-container>

    </v-main>
  </v-app>
</template>

<script setup>
import CarouselComponent from './components/Carousel.vue';
import ReferralProgramCard from './components/ReferralProgramCard.vue';
import { ref } from 'vue'

const drawer = ref(null)
</script>

<script>
export default {
  data: () => ({ drawer: null }),
}
</script>

<style scoped></style>