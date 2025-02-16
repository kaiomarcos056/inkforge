<template>
    <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
    </div>

    <section v-else>
        <!-- TOAST NOTIFICAÇÃO -->
        <v-snackbar v-model="snackbar.show" :timeout="3000" color="success">
            {{ snackbar.message }}
            <template v-slot:actions>
                <v-btn color="white" text @click="snackbar.closeSnackbar">Fechar</v-btn>
            </template>
        </v-snackbar>

        <!-- INFORMAÇÕES DO USUARIO LOGADO -->
        <div style="padding: 15px;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div class="avatar">M</div>
                <div>
                    <h3>{{usuario.nome}}</h3>
                    <div class="grupo-tags">
                        <span>Escritor nato</span>
                        <span>Aventura</span>
                        <span>Mistério</span>
                    </div>
                </div>
            </div>
            <div>
                <p>
                    Apaixonado por histórias que transportam para outros mundos e exploram as complexidades do coração humano. Cada palavra é uma peça de um quebra-cabeça narrativo onde você é parte essencial da jornada. Vamos escrever juntos a próxima grande aventura?"
                </p>
            </div>
        </div>

        <!-- TABS SLIDE -->
        <div class="tabs-slider-wrapper">
            <!-- Tabs -->
            <div class="tabs">
                <div v-for="(tab, index) in tabs" :key="index" :class="['tab', { active: activeIndex === index }]" @click="changeTab(index)">
                    {{ tab }}
                </div>
            </div>

            <!-- Swiper Slider -->
            <div class="slider">
                <div class="swiper" ref="swiperContainer">
                    <div class="swiper-wrapper">
                        <!-- <div v-for="(content, index) in slides" :key="index" class="swiper-slide">
                            <component :is="content.componente" style="height: 100%;"/>
                        </div> -->
                        <div class="swiper-slide">
                            <component :is="slides[0].componente" style="height: 100%;" :data="meusLivros"/>
                        </div>
                        <div class="swiper-slide">
                            <component :is="slides[1].componente" style="height: 100%;" />
                        </div>
                        <div class="swiper-slide">
                            <component :is="slides[2].componente" style="height: 100%;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";

import { useSnackbarStore } from '@/stores/snackbarStore';
import { useAuthStore } from '@/stores/authStore';

import Swiper from "swiper";
import "swiper/css";

import ListaLivro from '@/components/ListaLivro.vue';

export default {
    name: "TabsSlider",
    data() {
        return {
            tabs: ["Meus Livros", "Histórico", "Salvos"],
            slides: [
                { title: "Slide 1", description: "Content of Slide 1", componente: ListaLivro },
                { title: "Slide 2", description: "Content of Slide 2", componente: ListaLivro  },
                { title: "Slide 3", description: "Content of Slide 3", componente: ListaLivro  },
            ],
            activeIndex: 0,
            swiperInstance: null,
            loading: true,
            meusLivros: []
        };
    },
    components: {
        ListaLivro,
    },
    methods: {
        initializeSwiper() {
            const swiperElement = this.$refs.swiperContainer;
            if (!swiperElement) {
                console.error("Swiper container not found!");
                return;
            }

            this.swiperInstance = new Swiper(swiperElement, {
                slidesPerView: 1,
                on: {
                    slideChange: () => {
                        this.activeIndex = this.swiperInstance.activeIndex;
                    },
                },
            });
        },
        changeTab(index) {
            this.activeIndex = index;
            if (this.swiperInstance) {
                this.swiperInstance.slideTo(index);
            } 
            else {
                console.error("Swiper instance not initialized yet.");
            }
        },
    },
    computed: {
        snackbar() { return useSnackbarStore(); },
        userUuid() {  return useAuthStore().userUuid; }
    },
    async mounted() { 
        try {
            const livros = await axios.get(`https://inkforge-be.onrender.com/usuarios/livros/${this.userUuid}`);
            const usuario = await axios.get(`https://inkforge-be.onrender.com/usuarios/${this.userUuid}`);
            
            this.meusLivros = livros.data;
            this.usuario = usuario.data;
        } 
        catch (error) {
            console.error("#ERRO AO BUSCAR LIVROS = ", error);
        }
        finally {
            this.loading = false;
            this.$nextTick(() => {
                this.initializeSwiper();
            });
        }
    },
};
</script>

<style scoped>
section{
    height: 100vh;
    display: flex;
    flex-direction: column;
}

h3{
    font-family: 'Satoshi-Bold', sans-serif;
    font-size: 16px;
    font-weight: 500;
}

span{
    font-family: 'Satoshi-Bold', sans-serif;
    font-size: 13px;
    font-weight: 500;
    padding: 1px 8px;
    border: 1px solid #505050;
    color: #505050;
    border-radius: 10px;
}

p{
    font-family: 'Satoshi-Bold', sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
}
.avatar{
    background-color: #DFDFDF;
    color: #878787;
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 20px;
    margin-right: 10px;
}

.grupo-tags{
    display: flex;
    gap: 8px;
}

/* Wrapper for tabs and slider */
.tabs-slider-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
}

/* Tabs container */
.tabs {
    display: flex;
    justify-content: space-between;
}

/* Individual tab styles */
.tab {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
    font-size: 16px;
    color: #757575;
    position: relative;
    transition: color 0.3s ease-in-out;
}

/* Active tab styles with pseudo-element */
.tab.active {
    color: #000;
    font-weight: bold;
}

.tab.active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 20px);
    /* Tamanho ajustado automaticamente ao texto */
    height: 4px;
    background-color: #000;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
}

/* Swiper styles */
.slider {
    background-color: #f7f7f7;
    flex: 1;
}

.swiper-wrapper {
    height: 100%;
}

.swiper-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.swiper-slide component {
    flex: 1;
    /* height: 100%; */
}

.swiper.swiper-initialized.swiper-horizontal.swiper-ios.swiper-backface-hidden{
    height: 100%;
}
</style>