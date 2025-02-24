<template>
    <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div class="container" v-else>

        <v-icon @click="voltar" style="font-size: 38px;">mdi-chevron-left</v-icon>
        <h1 class="perfil" style="margin-left: 15px;">Sugestões</h1>

        <div class="tab">
            <div class="tab-nav" id="tabNav">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" :class="{ active: activeIndex === 0 }" @click="changeTab(0)">
                        Autor
                    </div>
                    <div style="height: 20px; border: 1.5px solid #d9d9d9; align-self: center;"></div>
                    <div class="swiper-slide" :class="{ active: activeIndex === 1 }" @click="changeTab(1)">
                        Comunidade
                    </div>
                </div>
            </div>

            <div class="tab-content">
                <div class="swiper-wrapper">

                    <div class="swiper-slide">
                        <div
                            style="padding: 20px; display: flex; flex-direction: column; gap: 10px; width: 100%; box-sizing: border-box;">
                            <p style="font-size: 18px; margin-bottom: 15px; margin-top: 15px;"> {{ votacao.titulo }}
                            </p>

                            <div class="radio-group">
                                <div class="votos">
                                    <h1>Escolha 1</h1>
                                    <div> <span class="mdi mdi-arrow-up-thin"></span> {{ itensVotacao[0].votos }} voto(s) </div>
                                </div>

                                <label>
                                    <input type="radio" name="customRadio" :value="itensVotacao[0].uuid_item_votacao" v-model="voto" :checked="itensVotacao[0].uuid_item_votacao == itemVotado" :disabled="!podevotar && itensVotacao[0].uuid_item_votacao != itemVotado"/>
                                    <div class="radio-button">
                                        <p style="font-family: 'Noto Serif', serif; font-weight: 600; font-size: 14px; line-height:19px; letter-spacing: -0.4px;">
                                            {{ itensVotacao[0].descricao }}
                                        </p>
                                    </div>
                                </label>

                                <p></p>

                                <div class="votos">
                                    <h1>Escolha 2</h1>
                                    <div> <span class="mdi mdi-arrow-up-thin"></span> {{ itensVotacao[1].votos }} voto(s) </div>
                                </div>
                                <label>
                                    <input type="radio" name="customRadio" :value="itensVotacao[1].uuid_item_votacao" v-model="voto" :checked="itensVotacao[1].uuid_item_votacao == itemVotado" :disabled="!podevotar && itensVotacao[1].uuid_item_votacao != itemVotado"/>
                                    <div class="radio-button">
                                        <p style="font-family: 'Noto Serif', serif; font-weight: 600; font-size: 14px; line-height:19px; letter-spacing: -0.4px;">
                                            {{ itensVotacao[1].descricao }}
                                        </p>
                                    </div>
                                </label>
                            </div>

                            <br>
                        </div>
                    </div>

                    <div class="swiper-slide">
                        <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px; width: 100%; box-sizing: border-box;">
                            <div class="radio-group" v-for="sugestao in itensSugestao" :key="sugestao.uuid_item_votacao"> 

                                <div class="votos">
                                    <div style="display: flex; align-items: center;">
                                        <v-avatar style="height: 32px; width: 32px; margin-right: 10px;" v-if="auth.usuario.foto !== ''">
                                            <v-img :src="sugestao.foto" ></v-img>
                                        </v-avatar>
                                        <div class="avatar" v-else>{{ sugestao.nome.charAt(0) }}</div>
                                        <label class="avatar-titulo">{{ sugestao.nome }}</label>
                                    </div>
                                    <div>
                                        <span class="mdi mdi-arrow-up-thin"></span> {{ sugestao.votos }} voto(s)
                                    </div>
                                </div>

                                <label>
                                    <input type="radio" name="customRadio" :value="sugestao.uuid_item_votacao" v-model="voto" :checked="sugestao.uuid_item_votacao == itemVotado" :disabled="!podevotar && sugestao.uuid_item_votacao != itemVotado" />
                                    <div class="radio-button">
                                        <p style="font-family: 'Noto Serif', serif; font-weight: 500; font-size: 14px; line-height:19px; letter-spacing: -0.4px;">
                                            {{ sugestao.descricao }}
                                        </p>
                                    </div>
                                </label>
                            
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div v-show="podevotar">
        <div style="display: flex; justify-content: space-evenly; padding-bottom: 10px; padding-top: 10px;" v-if="!votando">
            <v-btn size="x-small" class="btn-bottom-sheet" flat @click="abrirBottomSheet">
                <p class="mr-1">Sugerir</p>
                <img src="../assets/icons/star.svg" alt="Star Icon">
            </v-btn>
            <v-btn size="x-small" class="btn-bottom-sheet" flat @click="votar">
                <p class="mr-1">Votar</p>
                <img src="../assets/icons/chevron right.svg">
            </v-btn>
        </div>
        <v-progress-linear indeterminate v-else></v-progress-linear>
        </div>

        <v-bottom-sheet v-model="bottomSheet" max-width="500">
            <v-card>
                <div style="padding: 25px 15px; display: flex; flex-direction: column; gap: 10px;">
                    <h1
                        style="line-height: 0; margin:0; padding: 0; font-family: 'Satoshi-Regular', sans-serif; font-size: 20px; font-weight: 500;">
                        Adicionar Sugestão</h1>
                    <p></p>
                    <h2 style="font-family: 'Satoshi-Regular', sans-serif; font-size: 14px; font-weight: 500;">Minha
                        sugestão</h2>
                    <textarea v-model="sugestao" rows="4" name="" id=""
                        style="resize: none; border: 2px solid #151515; padding: 10px; border-radius: 16px; font-family: 'Satoshi-Regular', sans-serif; font-weight: 500;"></textarea>
                    <v-btn v-if="!salvandoSugestao" class="btn-footer" rounded="xl" height="48" flat color="black"
                        @click="inserirSugestao" :disabled="!sugestao"> Cadastrar sugestão </v-btn>
                    <v-progress-linear indeterminate v-else></v-progress-linear>
                </div>
            </v-card>
        </v-bottom-sheet>

        <v-snackbar v-model="snackbar" :timeout="9000" :color="snackbarStatus" style="bottom: 0px;">
            {{ snackbarTexto }}
            <template v-slot:actions>
                <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
            </template>
        </v-snackbar>

    </div>
</template>

<script>
import axios from "axios";

import { authStore } from '@/stores/authStore';
import { useSnackbarStore } from '@/stores/snackbarStore';

import Swiper from 'swiper';
import 'swiper/css';

export default {
    name: 'ListaEscolha',
    data() {
        return {
            activeIndex: 0,
            loading: true,
            votacao: {},
            itensVotacao: [],
            bottomSheet: false,
            sugestao: '',
            itensSugestao: [],
            salvandoSugestao: false,
            voto: '',
            votando: false,

            snackbar: false,
            snackbarTexto: 'Escolha alguma sugestão',
            snackbarStatus: 'error',
            podevotar: true,
            itemVotado:'',
        };
    },
    methods: {
        abrirBottomSheet() {
            this.bottomSheet = true;
            this.dialog = false;
        },
        voltar() {
            this.$router.push(`/historia/${this.$route.query.livro}`);
        },
        changeTab(index) {
            this.activeIndex = index;
            this.tabContentSwiper.slideTo(index);
        },
        async votar(){
            try {
                if(this.voto !== ''){
                    this.votando = true
                    
                    let body = {
                        uuid_usuario: this.auth.usuario.uuid_usuario,
                        uuid_votacao: this.votacao.uuid_votacao,
                        uuid_item_votacao: this.voto
                    }
                    await axios.post(`https://inkforge-api.onrender.com/votacao/usuario-votacao`, body, {
                        headers: { "Content-Type": "application/json" }
                    });

                    const item = await axios.put(`https://inkforge-api.onrender.com/item-votacao/votar/${this.voto}`, {}, {
                        headers: { "Content-Type": "application/json" }
                    });

                    const snackbarStore = useSnackbarStore();
                    snackbarStore.triggerSnackbar('Voto computado com sucesso.');

                    this.$router.push(`/historia/${this.$route.query.livro}`);
                }
                else{
                    this.snackbar = true
                }
            }
            catch (e) {
                console.log(e)
            }
            finally {
                this.bottomSheet = false
                this.voto = ''
                this.votando = false
            }
        },

        async inserirSugestao() {
            try {
                this.salvandoSugestao = true

                const body = {
                    uuid_votacao: this.votacao.uuid_votacao,
                    uuid_usuario: this.auth.usuario.uuid_usuario,
                    descricao: this.sugestao,
                }

                const item = await axios.post("https://inkforge-api.onrender.com/item-votacao", body, {
                    headers: { "Content-Type": "application/json" }
                });

                this.$router.push(`/votacao/${this.$route.params.id}`);
            }
            catch (e) {

            }
            finally {
                this.bottomSheet = false
                this.sugestao = ''
                this.salvandoSugestao = false
            }
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
            const votacao = await axios.get(`https://inkforge-api.onrender.com/votacao/capitulo/${this.$route.query.capitulo}`);
            this.votacao = votacao.data[0];

            const itensvotacao = await axios.get(`https://inkforge-api.onrender.com/item-votacao/${this.votacao.uuid_votacao}`);
            this.itensVotacao = itensvotacao.data;

            const sugestaovotacao = await axios.get(`https://inkforge-api.onrender.com/item-votacao/sugestao/${this.votacao.uuid_votacao}`);
            this.itensSugestao = sugestaovotacao.data;
            
            const votos = await axios.get(`https://inkforge-api.onrender.com/votacao/usuario?uuid_usuario=${this.auth.usuario.uuid_usuario}&uuid_votacao=${this.votacao.uuid_votacao}`)
            console.log(votos.data)
            if(votos.data.length > 0) {
                this.podevotar = false
                this.itemVotado = votos.data[0].uuid_item_votacao;
                console.log(this.itemVotado)
            }

            console.log()
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
        auth() { return authStore().usuario },

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
.radio-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.radio-button {
    font-family: 'Noto Serif', serif;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 2px solid #d9d9d9;
    border-radius: 16px;
    padding: 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    color: #151515;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

input[type="radio"] {
    display: none;
}

input[type="radio"]:checked+.radio-button {
    border: 2px solid #4caf50;
    background-color: #adefad;
}

input[type="radio"]:disabled + .radio-button {
  background-color: #ccc; /* Cor cinza para indicar desabilitado */
  border-color: #aaa;
  color: #666;
}

.btn-footer {
    font-family: 'Satoshi-Bold', sans-serif;
    font-weight: bold;
    font-size: 14px;
    text-transform: none;
    letter-spacing: 0px
}

.btn-bottom-sheet {
    /* border: 1px solid red; */
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
    font-weight: 700;
    gap: 10px;
    text-transform: none;
}

.btn-bottom-sheet p {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
    font-weight: 700;
}

.container {
    height: calc(100vh - 64px);
    box-sizing: border-box;
    background-color: white;
    display: flex;
    flex-direction: column;
}

.tab {
    flex: 1;
    width: 100%;
    overflow-x: hidden;
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.tab-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #fff;
    overflow-x: hidden;
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
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 4px;
    background-color: black;
    border-radius: 5px;
}

.tab .tab-content {
    flex: 1;
    width: 100%;
    overflow-x: auto;
}

.tab-content .swiper-slide {
    /* height: calc(100vh - 150px); */
    width: 100%;
    display: flex;
    background-color: #f7f7f7;
}


h1 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0%;
}

.box-escolha {
    background-color: white;
    border: 1px solid #D9D9D9;
    border-radius: 16px;
    padding: 16px;
    width: 100%;
}

p {
    font-family: 'Noto Serif', serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 19.07px;
    letter-spacing: -0.4px;
}

.escolha {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
}

.votos {
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
