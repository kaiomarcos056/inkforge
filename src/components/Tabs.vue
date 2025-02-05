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
          {{ tab }}
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
        <div class="slides-wrapper" :style="{ transform: `translateX(-${currentTab * 100}%)` }">
          <div v-for="(tab, index) in tabs" :key="index" class="slide">
            <h3>{{ tab }} Content</h3>
            <p>Conteúdo relacionado a {{ tab }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tabs: ["Apps", "Tricks", "People"],
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
        } else if (diff < -50 && this.currentTab > 0) {
          // Deslizou para a direita
          this.currentTab--;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .tabs-container {
    width: 100%;
    max-width: 400px;
    margin: auto;
    text-align: center;
  }
  
  /* Tabs */
  .tabs {
    display: flex;
    position: relative;
    border-bottom: 2px solid #ddd;
  }
  .tab {
    flex: 1;
    padding: 15px;
    cursor: pointer;
    font-size: 16px;
    color: #333;
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
    background: #ffeb3b;
    transition: left 0.3s ease;
  }
  
  /* Slide Content */
  .slides {
    overflow: hidden;
    width: 100%;
    touch-action: pan-y;
  }
  .slides-wrapper {
    display: flex;
    transition: transform 0.3s ease;
  }
  .slide {
    min-width: 100%;
    padding: 20px;
    background: #f5f5f5;
    border: 1px solid #ddd;
  }
  </style>
  