<template>
    <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
    </div>
    <div class="container" v-else>
        <div>
            <v-icon @click="voltar" style="font-size: 38px;">mdi-chevron-left</v-icon>

            <div class="tab">
                <div class="tab-nav" id="tabNav">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" :class="{ active: activeIndex === 0 }" @click="changeTab(0)">
                            Suas escolhas
                        </div>

                        <div style="height: 20px; border: 1.5px solid #d9d9d9; align-self: center;"></div>

                        <div class="swiper-slide" :class="{ active: activeIndex === 1 }" @click="changeTab(1)">
                            Sugestões
                        </div>
                    </div>
                </div>
                <div class="tab-content">
                    <div class="swiper-wrapper">
                        
                        <div class="swiper-slide">
                            <div style="padding: 20px; display: flex; flex-direction: column; gap: 10px; width: 100%; box-sizing: border-box;">
                                <p style="font-size: 18px; margin-bottom: 15px; margin-top: 15px;">
                                    {{ escolhas[0].titulo }}
                                </p>

                                <div class="escolha">

                                    <div class="votos">
                                        <h1>Escolha 1</h1>
                                        <div>
                                            <span class="mdi mdi-arrow-up-thin"></span> {{ escolhas[0].opcoes[0].qtd_votos }} voto(s) 
                                        </div>
                                    </div>
                                    <div class="box-escolha">
                                        <p>{{ escolhas[0].opcoes[0].descricao }}</p>
                                    </div>
                                    
                                </div>

                                <div class="escolha">

                                    <div class="votos">
                                        <h1>Escolha 2</h1>
                                        <div>
                                            <span class="mdi mdi-arrow-up-thin"></span> {{ escolhas[0].opcoes[1].qtd_votos }} voto(s) 
                                        </div>
                                    </div>
                                    <div class="box-escolha"> 
                                        <p>{{ escolhas[0].opcoes[1].descricao }}</p>
                                    </div>

                                </div>

                                <br>
                            </div>
                        </div>
                        
                        <div class="swiper-slide">
                            <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px; width: 100%; box-sizing: border-box;">
                                <div class="escolha">

                                    <div class="votos">
                                        <div style="display: flex; align-items: center;">
                                            <div class="avatar">M</div>
                                            <label class="avatar-titulo">Marcos Kaio</label>
                                        </div>
                                        <div>
                                            <span class="mdi mdi-arrow-up-thin"></span> {{ escolhas[0].opcoes[0].qtd_votos }} voto(s) 
                                        </div>
                                    </div>
                                    <div class="box-escolha">
                                        <p>{{ escolhas[0].opcoes[0].descricao }}</p>
                                    </div>
                                    
                                </div>

                                <div class="escolha">

                                    <div class="votos">
                                        <div style="display: flex; align-items: center;">
                                            <div class="avatar">P</div>
                                            <label class="avatar-titulo">Pedro Henrique</label>
                                        </div>
                                        <div>
                                            {{ escolhas[0].opcoes[1].qtd_votos }} voto(s) 
                                        </div>
                                    </div>
                                    <div class="box-escolha"> 
                                        <p>{{ escolhas[0].opcoes[1].descricao }}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; padding: 20px;">
                <v-btn size="x-small" class="btn-bottom-sheet" flat>Cancelar</v-btn>
                <v-btn size="x-small" class="btn-bottom-sheet" flat @click="abrirBottomSheet"> 
                    <p class="mr-1">Sugerir</p>
                    <img src="../assets/icons/star.svg" alt="Star Icon"> 
                </v-btn>
                <v-btn size="x-small" class="btn-bottom-sheet" flat> 
                    <p class="mr-1">Escolher</p>
                    <img src="../assets/icons/chevron right.svg"> 
                </v-btn>
            </div>
        </div>
        
        <v-bottom-sheet v-model="bottomSheet" max-width="500">
            <v-card>
                <div style="padding: 25px 15px; display: flex; flex-direction: column; gap: 10px;">
                    <h1 style="line-height: 0; margin:0; padding: 0; font-family: 'Satoshi-Regular', sans-serif; font-size: 20px; font-weight: 500;">Adicionar Sugestão</h1>
                    <p></p>
                    <h2 style="font-family: 'Satoshi-Regular', sans-serif; font-size: 14px; font-weight: 500;">Minha sugestão</h2>
                    <textarea rows="4" name="" id="" style="resize: none; border: 2px solid #151515; padding: 10px; border-radius: 16px; font-family: 'Satoshi-Regular', sans-serif; font-weight: 500;" ></textarea>
                    <v-btn class="btn-footer" rounded="xl" height="48"  flat color="black" @click="votar"> Cadastrar sugestão </v-btn>
                </div>
            </v-card>
        </v-bottom-sheet>
    </div>
</template>

<script>
import axios from "axios";

import Swiper from 'swiper';
import 'swiper/css';

export default {
    name: 'ListaEscolha',
    data() {
        return {
            activeIndex: 0,
            loading: true,
            escolhas: [],
            bottomSheet: false,
        };
    },
    methods: {
        abrirBottomSheet() {
            this.bottomSheet = true;
            this.dialog = false;
        },
        voltar() {
            this.$router.push(`/home`);
        },
        changeTab(index) {
            this.activeIndex = index;
            this.tabContentSwiper.slideTo(index);
        },

        initializeSwiper() {
            this.tabNavSwiper = new Swiper('.tab-nav', {
                slidesPerView: 'auto'
            });

            this.tabContentSwiper = new Swiper('.tab-content', {
                autoHeight: false,
                on: {
                    slideChange: () => {
                        this.activeIndex = this.tabContentSwiper.activeIndex;
                        this.tabNavSwiper.slideTo(this.activeIndex - 1);
                    }
                }
            });
        }
    },
    props: {
        
    },
    async mounted() { 
        try {
            const escolhas = await axios.get(`https://inkforge-api.onrender.com/votacao/capitulo/${this.$route.params.id}`);
            this.escolhas = escolhas.data;
        } 
        catch (error) {
            console.error("#ERRO AO BUSCAR ESCOLHAS = ", error);
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
        },
    },
};
</script>

<style scoped>

.btn-footer{
    font-family: 'Satoshi-Bold', sans-serif;
    font-weight: bold;
    font-size: 12px;
    text-transform: none;
    letter-spacing: 0px
}

.btn-bottom-sheet{
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 14px;
    font-weight: 700;
    gap: 10px;
    text-transform: none;
}

.btn-bottom-sheet p{
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 14px;
    font-weight: 700;
}

.container{
    height: calc(100vh - 64px);
    box-sizing: border-box;
    background-color: white;
    display: flex;
    flex-direction: column;
}

.tab {
    /* flex: 1; */
    width: 100%;
    overflow-x: hidden;
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
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
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 4px;
    background-color: black;
    border-radius: 5px;
}

.tab .tab-content {
    /* flex: 1; */
    width: 100%;
}

.tab-content .swiper-slide {
    /* height: calc(100vh - 150px); */
    width: 100%;
    display: flex;
    background-color: #f7f7f7;
}


h1{
    font-family: 'Satoshi-Regular', sans-serif;
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0%;
}

.box-escolha{
    background-color: white;
    border: 1px solid #D9D9D9;
    border-radius: 16px;
    padding: 16px;
    width: 100%;
}

p{
    font-family: 'Noto Serif', serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 19.07px;
    letter-spacing: -0.4px;
}

.escolha{
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
}

.votos{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

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
</style>
