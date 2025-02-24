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

                <v-avatar style="height: 44px; width: 44px; margin-right: 10px;" v-if="auth.usuario.foto !== ''">
                    <v-img :src="auth.usuario.foto" ></v-img>
                </v-avatar>
                <div class="avatar" v-else>M</div>

                <div>
                    <h3><b>{{ auth.usuario.nome }}</b></h3>
                    <div class="grupo-tags">
                        <span v-for="interesse in auth.usuario.interesses" :key="interesse.uuid_interesse">
                            {{ interesse.nome }}
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <p>
                    {{ auth.usuario.descricao }}
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
                            <component :is="slides[1].componente" style="height: 100%; width: 100%; box-sizing: border-box;" />
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
import { authStore } from '@/stores/authStore';

import Swiper from "swiper";
import "swiper/css";

import ListaLivro from '@/components/ListaLivro.vue';
import Votacoes from "@/components/Votacoes.vue";

export default {
    name: "TabsSlider",
    data() {
        return {
            tabs: ["Meus Livros", "Votações", "Salvos"],
            slides: [
                { title: "Slide 1", description: "Content of Slide 1", componente: ListaLivro },
                { title: "Slide 2", description: "Content of Slide 2", componente: Votacoes  },
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
        Votacoes
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
        auth(){ return authStore().usuario }
    },
    async mounted() { 
        console.log(this.auth)
        try {
            const livros = await axios.get(`https://inkforge-api.onrender.com/usuarios/livros/${this.auth.usuario.uuid_usuario}`);
            this.meusLivros = livros.data;
        } 
        catch (e) {
            console.error(e.message);
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
    flex-wrap: wrap;
    gap: 5px;
}

.tabs-slider-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.tabs {
    display: flex;
    justify-content: space-between;
}

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
    height: 4px;
    background-color: #000;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
}

.slider {
    background-color: #f7f7f7;
    height: 100%;
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
}

.swiper.swiper-initialized.swiper-horizontal.swiper-ios.swiper-backface-hidden{
    height: 100%;
    width: 100%;
}
</style>