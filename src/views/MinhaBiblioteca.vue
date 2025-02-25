<template>
    <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
    </div>

    <section v-else>
        <v-snackbar v-model="snackbar.show" :timeout="3000" color="success">
            {{ snackbar.message }}
            <template v-slot:actions>
                <v-btn color="white" text @click="snackbar.closeSnackbar">Fechar</v-btn>
            </template>
        </v-snackbar>


        <div style="padding: 15px;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">

                <v-avatar style="height: 44px; width: 44px; margin-right: 10px;" v-if="auth.usuario.foto !== ''">
                    <v-img :src="auth.usuario.foto" ></v-img>
                </v-avatar>
                <div class="avatar" v-else>{{ auth.usuario.nome.charAt(0) }}</div>

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
                <p> {{ auth.usuario.descricao }} </p>
            </div>
        </div>
        
        <div class="tab" style="display: flex; flex-direction: column;">
            <div class="tab-nav" id="tabNav">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" :class="{ active: activeIndex === 0 }" @click="changeTab(0)"> Meus Livros </div>

                    <div style="height: 20px; border: 1.5px solid #d9d9d9; align-self: center;"></div>

                    <div class="swiper-slide" :class="{ active: activeIndex === 1 }" @click="changeTab(1)"> Votações </div>

                    <div style="height: 20px; border: 1.5px solid #d9d9d9; align-self: center;"></div>

                    <div class="swiper-slide" :class="{ active: activeIndex === 2 }" @click="changeTab(2)"> Salvos </div>
                </div>
            </div>
            <div class="tab-content" style="height: 100%; flex: 1;">
                <div class="swiper-wrapper" style="height: 100%;">
            
                    <div class="swiper-slide" style="height: 100%;"> 
                        <component :is="tabs[0].componente" :data="meusLivros" style="height: 100%; width: 100%; box-sizing: border-box;"/> 
                    </div>
                    
                    <div class="swiper-slide" style="height: 100%;">  
                        <component :is="tabs[1].componente" style="height: 100%; width: 100%; box-sizing: border-box;"/> 
                    </div>
                    
                    <div class="swiper-slide" style="height: 100%;">
                        <component :is="tabs[2].componente" :data="meusFavoritos" style="height: 100%; width: 100%; box-sizing: border-box;"/>
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
import Salvos from "@/components/Salvos.vue";

export default {
    name: "TabsSlider",
    data() {
        return {
            activeIndex: 0,
            tabs: [
                { name: 'Meus Livros', componente: ListaLivro },
                { name: 'Votações', componente: Votacoes },
                { name: 'Salvos', componente: Salvos }
            ],
            loading: true,
            meusLivros: [],
            meusFavoritos: [],
        };
    },
    components: {
        ListaLivro,
        Votacoes,
        Salvos
    },
    methods: {
        changeTab(index) {
            this.activeIndex = index;
            this.tabContentSwiper.slideTo(index);
        },

        initializeSwiper() {
            this.tabContentSwiper = new Swiper('.tab-content', {
                noSwiping: true,
                on: {
                    slideChange: () => {
                        this.activeIndex = this.tabContentSwiper.activeIndex;
                        this.tabNavSwiper.slideTo(this.activeIndex - 1);
                    }
                }
            });
        }
    },
    computed: {
        snackbar() { return useSnackbarStore(); },
        auth(){ return authStore().usuario }
    },
    async mounted() { 
        try {
            const livros = await axios.get(`https://inkforge-api.onrender.com/usuarios/livros/${this.auth.usuario.uuid_usuario}`);
            this.meusLivros = livros.data;

            const favoritos = await axios.get(`https://inkforge-api.onrender.com/favoritos/${this.auth.usuario.uuid_usuario}`)
            this.meusFavoritos = favoritos.data;
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
    height: calc(100vh - 64px);
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

.tab {
    flex: 1;
    width: 100%;
    overflow-x: hidden;
    background-color: #f7f7f7;
}

.tab-nav {
    /* display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #fff;
    overflow-x: hidden; */

    position: sticky;
    top: 0;
    background-color: white; 
    z-index: 1000;
}

.tab-nav .swiper-slide {
    font-family: 'Satoshi-Regular', sans-serif;
    width: 33%;
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

.tab-content {
    flex: 1;
    width: 100%;
    height: 100%;
}

.tab-content .swiper-slide {
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
}
</style>