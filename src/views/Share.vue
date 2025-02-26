<template>
  <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
    </div>
  <div class="tabs-container" v-else>
    <!-- Navegação por Tabs -->
    <!-- <div class="tabs">
      <button 
        v-for="(tab, index) in tabs" 
        :key="index" 
        :class="{ active: activeIndex === index }" 
        @click="changeTab(index)">
        {{ tab }}
      </button>
    </div> -->
    <div class="tab-nav" id="tabNav">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" :class="{ active: activeIndex === 0 }" @click="changeTab(0)">
                        Para você
                    </div>
                    <div style="height: 20px; border: 1.5px solid #d9d9d9; align-self: center;"></div>
                    <div class="swiper-slide" :class="{ active: activeIndex === 1 }" @click="changeTab(1)">
                        Seguindo
                    </div>
                </div>
            </div>

    <!-- Swiper -->
    <swiper 
      ref="mySwiper"
      class="mySwiper swiper-h"
      :spaceBetween="50"
      :modules="modules"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <!-- PRIMEIRO SLIDE -->
      <swiper-slide>
        <h1 class="h1 mb-2">Em destaque</h1>

        <swiper class="mySwiper2 swiper-h" :direction="'horizontal'" :spaceBetween="2" :modules="modules" :slidesPerView="1.1">
          <swiper-slide v-for="livro in livros" :key="livro.uuid_livro">
            <div style="display: flex;">
              <!-- CAPA -->
              <div style="width: 30%;  display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <v-card class="mx-auto elevation-5" color="surface-variant" :image="livro.capa" width="80" height="120"></v-card>
              </div>
             
              <div style="flex: 1; display: flex; flex-direction: column; justify-content: start; align-items: start;">
                <p style="text-align: left;">{{ livro.nome }}</p>
                <div class="tags" style="display: flex;">
                  <span v-for="genero in livro.generos" :key="genero.uuid_genero" class="tag">{{ genero.nome }}</span>
                </div>
                <label class="autor">Autor: {{ livro.autor }}</label>
              </div>
            </div>
          </swiper-slide>
        </swiper>

        <div style="height: 20px;"></div>

        <swiper class="mySwiper3 swiper-h" :direction="'horizontal'" :spaceBetween="2" :modules="modules" :slidesPerView="1.1">
          <swiper-slide v-for="livro in livros.slice().reverse()" :key="livro.uuid_livro">
            <div style="display: flex;">
              <!-- CAPA -->
              <div style="width: 30%;  display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <v-card class="elevation-5" color="surface-variant" :image="livro.capa" width="80" height="120"></v-card>
              </div>
             
              <div style="flex: 1; display: flex; flex-direction: column; justify-content: start; align-items: start;">
                <p style="text-align: left;">{{ livro.nome }}</p>
                <div class="tags" style="display: flex;">
                  <span v-for="genero in livro.generos" :key="genero.uuid_genero" class="tag">{{ genero.nome }}</span>
                </div>
                <label class="autor">Autor: {{ livro.autor }}</label>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        
        <component :is="'ParaVoce'" style="box-sizing: border-box;"/>
      </swiper-slide>

      <!-- SEGUNDO SLIDE -->
      <swiper-slide>
        <component :is="'Seguindo'" style="box-sizing: border-box;"/>
      </swiper-slide>
      
    </swiper>
  </div>
</template>

<script>
import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import ParaVoce from "../components/ParaVoce.vue";
import Seguindo from "../components/Seguindo.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    ParaVoce,
    Seguindo
  },
  data() {
    return {
      activeIndex: 0,
      tabs: ['Slide 1', 'Slide 2'],
      livros: [],
      loading: true
    };
  },
  methods: {
    onSwiper(swiper) { this.swiperInstance = swiper; },
    onSlideChange() { if (this.swiperInstance) { this.activeIndex = this.swiperInstance.activeIndex; } },
    changeTab(index) {
      this.activeIndex = index;
      if (this.swiperInstance) { this.swiperInstance.slideTo(index); }
    }
  },
  async mounted() {
      try {
          const livros = await axios.get("https://inkforge-api.onrender.com/livros");
          this.livros = livros.data;
      } 
      catch (error) {
          console.error("#ERRO AO BUSCAR LIVROS = ", error);
      }
      finally {
          this.loading = false;
      }
  },
};
</script>

<style scoped>
h3.book-title {
    text-align: left;
}

.mySwiper{
  height: calc(100vh - 64px - 54px);
  overflow: auto;
  box-sizing: border-box;
  background-color: #F7F7F5;
}

.mySwiper2{
}

.mySwiper .h1 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
    text-align: left;
    margin-left: 10px;
}

.tabs-container {
  text-align: center;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.tabs button {
  padding: 10px 20px;
  background: #f0f0f0;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
}

.tabs button.active {
  background: black;
  color: white;
}

/* ESTILOS DOS DESTAQUES */
p {
  font-size: 16px;
  font-weight: 500;
  color: #151515;
  text-align: left;
}

label {
  font-weight: 400;
  font-size: 12px;
  font-style: italic;
}

.tags {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.tag {
  font-family: 'Satoshi-Regular', sans-serif;
  background-color: none;
  color: #505050;
  border: 1px solid #505050;
  border-radius: 20px;
  padding: 2px 6px;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.4px;
}

.autor{
  font-family: 'Satoshi-Regular', sans-serif;
  font-weight: 400;
  font-style: italic;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.4px;
}

.tab {
    /* flex: 1; */
    width: 100%;
    overflow-x: hidden;
    background-color: #f7f7f7;
}

.tab-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #fff;
    overflow-x: hidden;
}

.tab-nav .swiper-slide {
    font-family: 'Satoshi-Regular', sans-serif;
    width: 50%;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    line-height: 50px;
    transition: all 0.3s ease-in-out;
    position: relative;
}

.tab-nav .swiper-slide.active {
    color: black;
}

.tab-nav .swiper-slide.active::after {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 4px;
    background-color: black;
    border-radius: 5px;
}
</style>
