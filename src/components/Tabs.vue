<template>
    <div class="tabs-container">
      <!-- Tabs -->
      <div class="tabs">
        <span
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab"
          :class="{ active: currentTab === index }"
          @click="currentTab = index"
        >
          {{ tab.nome }}
        </span>
        <div class="active-mark" :style="{ left: `${currentTab * 33.33}%` }"></div>
      </div>
  
      <!-- Slide Content -->
      <div
        class="slides"
        @touchstart="startSwipe"
        @touchmove="moveSwipe"
        @touchend="endSwipe"
      >
        <div class="slides-wrapper" :style="{ transform: `translateX(-${currentTab * 100}%)`, width: `${tabs.length * 100}%` }">
            <div v-for="(tab, index) in tabs" :key="index" class="slide">
                <component :is="tab.componente" />
            </div>
        </div>

      </div>
    </div>
  </template>
  
<script>
import ListaLivro from './ListaLivro.vue';

  export default {
    data() {
      return {
        tabs: [
            { nome: "Minha Biblioteca", componente: ListaLivro},
            { nome: "Histórico", componente: ListaLivro},
            { nome: "Salvos", componente: ListaLivro},
        ],
        currentTab: 0,
        startX: 0, // Posição inicial do toque
        endX: 0 // Posição final do toque
      };
    },
    methods: {
        startSwipe(event) {
            this.startX = event.touches[0].clientX;
        },
        moveSwipe(event) {
            this.endX = event.touches[0].clientX;
        },
        endSwipe() {
            const diff = this.startX - this.endX;
            if (diff > 50 && this.currentTab < this.tabs.length - 1) {
                // Deslizou para a esquerda
                this.currentTab++;
            } 
            else if (diff < -50 && this.currentTab > 0) {
                // Deslizou para a direita
                this.currentTab--;
            }
        }
    },
    components: {
        ListaLivro
    }
  };
  </script>
  
<style scoped>
.tabs-container {
    display: flex;
    flex-direction: column;
    height: 100%; /* Agora ocupa todo o espaço do wrapper */
    width: 100%;
    max-width: 400px;
    margin: auto;
    text-align: center;
}

.tabs {
    display: flex;
    align-items: center;
    position: relative;
}

.tab {
    flex: 1;
    padding: 15px;
    cursor: pointer;
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #151515;
    text-align: center;
}

.tab.active {
    font-weight: bold;
}
  
/* Active Marker */
.active-mark {
    position: absolute;
    bottom: 0;
    width: 33.33%;
    height: 4px;
    background: #151515;
    transition: left 0.3s ease;
    border-radius: 20px;
}
  
/* Slide Content */
.slides {
    flex: 1; /* Agora ocupa todo o espaço restante */
    display: flex;
    overflow: hidden;
    width: 100%;
    touch-action: pan-y;
}

.slides-wrapper {
    display: flex;
    height: 100%; /* Garante que o wrapper ocupe todo o espaço */
    transition: transform 0.3s ease;
}

.slide {
    /*border: 1px solid red;*/
    min-width: 100%;
    height: 100%;
    padding: 20px;
    background: #F7F7F5;
    display: flex;
    /*
    
    align-items: center;
    justify-content: center;
    */
}

</style>
  