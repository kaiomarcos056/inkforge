<template>
    <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
    </div>

    <div class="container" v-else>

        <v-icon @click="voltar" style="font-size: 38px;">mdi-chevron-left</v-icon>

        <div>
            <div style="display: flex; justify-content: center;">
                <v-card
                    :image="livro.capa"
                    width="90"
                    height="130"
                    class="mr-4"
                ></v-card>
                <div style="display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 class="mb-1">{{livro.nome}}</h3>
                        <div style="display: flex; gap: 5px;">
                            <p v-for="genero in livro.generos" :key="genero.uuid_genero">
                                {{ genero.nome }}
                            </p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center;">
                            <div class="avatar">M</div>
                            <label class="avatar-titulo">{{ livro.autor }}</label>
                    </div>
                </div>
            </div>
            <hr style="margin: 15px 30px 10px 30px">
            <div style="padding: 0px 30px;">
                <previa-acoes />
            </div>
        </div>
        
        <div class="tab">
            <div class="tab-nav" id="tabNav">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" :class="{ active: activeIndex === 0 }" @click="changeTab(0)">
                        Capitulos
                    </div>
                    <div style="height: 20px; border: 1.5px solid #d9d9d9; align-self: center;"></div>
                    <div class="swiper-slide" :class="{ active: activeIndex === 1 }" @click="changeTab(1)">
                        Escolhas
                    </div>
                </div>
            </div>
            <div class="tab-content">
                <div class="swiper-wrapper">
                    
                    <!-- <div v-for="(tab, index) in tabs" :key="index" class="swiper-slide" >
                        <component :is="tab.componente" />
                    </div> -->
                    
                    <div class="swiper-slide">
                        <component :is="tabs[0].componente" :data="capitulos"/>
                    </div>
                    
                    <div class="swiper-slide">
                        <component :is="tabs[1].componente" />
                    </div>
                    
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
import axios from "axios";

import PreviaAcoes from "@/components/PreviaAcoes.vue";
import Capitulos from "@/components/Capitulos.vue";
import Escolhas from "@/components/Escolhas.vue";

import Swiper from 'swiper';
import 'swiper/css';

export default {
    name: 'Historia', // Nome do componente

    components: {
        PreviaAcoes,
        Capitulos
    },

    data() {
        return {
            activeIndex: 0, // Aba ativa inicialmente
            tabs: [
                { name: 'Capitulos', content: 'Swipe', color: '#04a5c1', componente: Capitulos},
                { name: 'Escolhas', content: 'Swipe', color: '#f298e7', componente: Escolhas }
            ],
            tabNavSwiper: null,
            tabContentSwiper: null,
            livro: {},
            capitulos: [],
            loading: true
        };
    },

    methods: {
        voltar() {
            if (window.history.length > 1) {
                this.$router.push("/biblioteca");
            } else {
                this.$router.push("/");
            }
        },

        navegarParaCapitulo(capituloId) {
            this.$router.push({
                path: `/historia/${1}/capitulo`, // Redireciona para a página do capítulo
                query: { capitulo: 1, page: 1 }, // Define parâmetros na URL
            });
        },

        // Método para trocar de aba
        changeTab(index) {
            this.activeIndex = index; // Atualiza o índice da aba ativa
            this.tabContentSwiper.slideTo(index); // Move o Swiper para a aba correspondente
        },

        initializeSwiper() {
            this.tabNavSwiper = new Swiper('.tab-nav', {
                slidesPerView: 'auto'
            });

            this.tabContentSwiper = new Swiper('.tab-content', {
                on: {
                    slideChange: () => {
                        this.activeIndex = this.tabContentSwiper.activeIndex;
                        this.tabNavSwiper.slideTo(this.activeIndex - 1);
                    }
                }
            });
        }
    },

    async mounted() { 
        try {
            const livro = await axios.get(`https://inkforge-be.onrender.com/livros/${this.$route.params.id}`);
            this.livro = livro.data;

            const capitulos = await axios.get(`https://inkforge-be.onrender.com/capitulos/${this.$route.params.id}`);
            this.capitulos = capitulos.data;
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

    computed: {
        activeBarStyle() {
            return {
                left: `${this.btnW * this.activeIndex}px`,
                width: `${this.barW}px`,
                backgroundColor: this.tabs[this.activeIndex].color,
                transitionDuration: '0.25s'
            };
        }
    },
};
</script>


<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
}

/* Estilização do título do livro */
h3 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
}

/* Estilização dos gêneros */
p {
    border: 1px solid gray;
    border-radius: 50px;
    text-align: center;
    padding: 2px 5px;
    font-size: 12px;
}

/* Estilização do avatar do autor */
.avatar {
    background-color: #DFDFDF;
    color: #878787;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 14px;
    margin-right: 5px;
}

/* Nome do autor */
.avatar-titulo {
    font-size: 14px;
    font-style: italic;
    font-weight: 400;
}

/* Estilização das abas */
.tab {
    flex: 1;
    width: 100%;
    overflow-x: hidden;
    background-color: #f7f7f7;
}

/* Estilização da navegação das abas */
.tab-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #fff;
    overflow-x: hidden;
}

/* Cada item da navegação */

.tab-nav .swiper-slide {
    font-family: 'Satoshi-Regular', sans-serif;
    width: 50%;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    line-height: 50px;
    transition: all 0.3s ease-in-out;
    position: relative; /* Para permitir posicionamento absoluto da borda */
}

.tab-nav .swiper-slide.active {
    color: black;
}

.tab-nav .swiper-slide.active::after {
    content: "";
    position: absolute;
    bottom: 7px; /* Coloca a borda no final do slide */
    left: 50%;
    transform: translateX(-50%);
    width: 40%; /* Define a largura da borda */
    height: 4px; /* Espessura da borda */
    background-color: black; /* Cor da borda */
    border-radius: 5px; /* Arredonda os cantos da borda */
}

.tab-content {
    flex: 1; /* Ocupa o espaço disponível */
    width: 100%;
    height: 85%;
}

/* Estilização do conteúdo das abas */
.tab-content .swiper-slide {
    width: 100%;
    background-color: #f7f7f7;
    height: 100%;
}
</style>