<template>
    <div class="container">

        <v-icon @click="voltar" style="font-size: 38px;">mdi-chevron-left</v-icon>

        <div>
            <div style="display: flex; justify-content: center;">
                <v-card
                    image="https://marketplace.canva.com/EAFq91U_RUs/1/0/1003w/canva-capa-de-livro-de-fantasia-elegante-verde-e-bege-awJX91ybn9w.jpg"
                    width="90"
                    height="130"
                    class="mr-4"
                ></v-card>
                <div style="display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 class="mb-1">Um viciado nas estrelas</h3>
                        <div style="display: flex; gap: 5px;">
                            <p>Romance</p>
                            <p>Aventura</p>
                            <p>Mistério</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center;">
                            <div class="avatar">M</div>
                            <label class="avatar-titulo">Marcos Kaio</label>
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
                    
                    <div v-for="(tab, index) in tabs" :key="index" class="swiper-slide" >
                        <component :is="tab.componente" />
                    </div>
                    
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
import PreviaAcoes from "@/components/PreviaAcoes.vue"; // Importa o componente de ações

import Capitulos from "@/components/Capitulos.vue";
import Escolhas from "@/components/Escolhas.vue";

import Swiper from 'swiper'; // Importa Swiper.js para o efeito de slide
import 'swiper/css'; // Importa os estilos do Swiper.js

export default {
    name: 'Historia', // Nome do componente

    components: {
        PreviaAcoes,
        Capitulos
    },

    data() {
        return {
            activeIndex: 0, // Aba ativa inicialmente
            barW: 20, // Largura da barra ativa (não está sendo usada diretamente)
            btnW: 70, // Largura do botão de navegação
            slideAmount: 10, // Quantidade de slides (parece não estar sendo usado)
            tabs: [ // Definição das abas
                { name: 'Capitulos', content: 'Swipe', color: '#04a5c1', componente: Capitulos},
                { name: 'Escolhas', content: 'Swipe', color: '#f298e7', componente: Escolhas }
            ],
            tabNavSwiper: null, // Instância do Swiper para a navegação
            tabContentSwiper: null // Instância do Swiper para o conteúdo das abas
        };
    },

    methods: {
        // Método para voltar para a página anterior
        voltar() {
            if (window.history.length > 1) {
                this.$router.back(); // Volta para a página anterior no histórico
            } else {
                this.$router.push("/"); // Se não houver histórico, volta para a home
            }
        },

        // Método para navegar para um capítulo específico
        navegarParaCapitulo(capituloId) {
            console.log(capituloId); // Exibe o ID do capítulo no console
            this.$router.push({
                path: `/historia/${1}/capitulo`, // Redireciona para a página do capítulo
                query: { capitulo: 1, page: 1 }, // Define parâmetros na URL
            });
        },

        // Método para trocar de aba
        changeTab(index) {
            this.activeIndex = index; // Atualiza o índice da aba ativa
            this.tabContentSwiper.slideTo(index); // Move o Swiper para a aba correspondente
        }
    },

    mounted() {
        // Inicializa o Swiper na navegação das abas
        this.tabNavSwiper = new Swiper('.tab-nav', {
            slidesPerView: 'auto' // Ajusta a exibição conforme o número de itens
        });

        // Inicializa o Swiper no conteúdo das abas
        this.tabContentSwiper = new Swiper('.tab-content', {
            on: {
                slideChange: () => {
                    this.activeIndex = this.tabContentSwiper.activeIndex; // Atualiza a aba ativa ao deslizar
                    this.tabNavSwiper.slideTo(this.activeIndex - 1); // Sincroniza a navegação
                }
            }
        });
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
    /*background-color: #fff;*/
    overflow-x: hidden;
    /*display: flex;*/
    /*flex-direction: column;*/
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