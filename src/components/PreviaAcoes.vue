<template>
    <div class="acoes">
        <div class="d-flex ga-1">
            <img src="../assets/icons/comment.svg" alt="Ícone" width="24" @click="abrircomentario()" />
            <p>20</p>
        </div>
        <div class="d-flex ga-1">
            <img src="../assets/icons/heart.svg" alt="Ícone" width="24" />
            <p>2.2K</p>
        </div>
        <div class="d-flex ga-1">
            <img src="../assets/icons/chart.svg" alt="Ícone" width="24" class="g4"/>
            <p>8.6K</p>
        </div>
        <div class="d-flex ga-5 align-center">
            <img src="../assets/icons/bookmark.svg" alt="Ícone"  height="24" v-if="!salvo" @click="salvar" />
            <img src="../assets/icons/bookmark-selected.svg" alt="Ícone"  height="24" v-else @click="remover" />
            <img src="../assets/icons/share.svg" alt="Ícone" height="24" @click="compartilhar"/>
        </div>


        <v-bottom-sheet v-model="bottomSheet" >
            <v-card>
                <div style="padding: 25px 15px; display: flex; flex-direction: column; gap: 10px; ">
                    <div v-if="finalizando" style="display: flex; align-items: center; justify-content: center; margin: 30px;">
                        <v-progress-circular indeterminate ></v-progress-circular>
                    </div>
                    <div style="flex-direction: column; min-height: 80vh; display: flex; gap: 10px;" v-else>
                        <h3>Comentários</h3>

                        <div style="flex: 1;" class="coment">
                            <div style="margin-bottom: 20px; display: flex; align-items: center; gap: 5px;" v-for="comentario in comentarios" :key="comentario.uuid_comentario">
                                <v-avatar style="height: 40px; width: 40px; margin-right: 5px;" v-if="auth.usuario.foto !== ''">
                                    <v-img :src="comentario.foto" ></v-img>
                                </v-avatar>
                                <div class="avatar" v-else>{{comentario.usuario.charAt(0)}}</div>
                                <div>
                                    <label for=""><b>{{comentario.usuario}}</b></label>
                                    <p class="bottom-p">{{ comentario.comentario }}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 10px;" v-if="!comentando">
                            <v-avatar style="height: 40px; width: 40px; margin-right: 5px;" v-if="auth.usuario.foto !== ''">
                                <v-img :src="auth.usuario.foto" ></v-img>
                            </v-avatar>
                            <div class="avatar" v-else>{{auth.usuario.nome.charAt(0)}}</div>
                            <input type="text" placeholder="Adicione um comentário" v-model="comentario" style="flex: 1;" >
                            <button @click="comentar" class="bottom-button" style="color: #fff; background-color: black;" :disabled="!comentario">
                                <span class="mdi mdi-arrow-up"></span>
                            </button>
                        </div>
                        <v-progress-linear indeterminate style="margin: 10px 0px;" v-else></v-progress-linear>
                    </div>
                </div>
            </v-card>
        </v-bottom-sheet>

    </div>
</template>

<script>
import { authStore } from '@/stores/authStore';
import { useHead } from "@vueuse/head";

import axios from "axios";

export default {
    name: "PreviaAcoes",
    data() {
        return {
            bottomSheet: false,
            finalizando: true,
            comentario: '',
            comentando: false,
            comentarios: [],
        };
    },
    props: {
        salvo: {
            type: Boolean,
            default: false
        },
        uuid_livro: {
            type: String,
            default: ''
        },
        uuid_usuario: {
            type: String,
            default: ''
        },
        favorito: {
            type: Object,
            default: {}
        },
        livro: {
          type: Object,
          default: () => ({})
        },
    },
    methods: {
        async comentar(){
            try{
                this.comentando = true;

                const body = {
                    uuid_usuario: this.uuid_usuario,
                    uuid_livro: this.uuid_livro,
                    comentario: this.comentario,
                }

                await axios.post(`https://inkforge-api.onrender.com/comentarios`, body, { headers: { "Content-Type": "application/json" } });
            }
            catch(e){

            }
            finally{
                this.comentando = false;
                this.comentario = '';
                this.abrircomentario();
            }
        },

        async abrircomentario(){
            try{
                this.bottomSheet = true
                const comentarios = await axios.get(`https://inkforge-api.onrender.com/comentarios?uuid_livro=${this.uuid_livro}`);
                this.comentarios = comentarios.data
                console.log(this.comentarios)
            }
            catch(e){

            }
            finally{
                this.finalizando = false
            }
        },

        async salvar(){
            //this.$emit('update:salvo', true);
            try{
                let body = {
                    uuid_usuario: this.uuid_usuario,
                    uuid_livro: this.uuid_livro
                }
                
                const response = await axios.post("https://inkforge-api.onrender.com/favoritos",body, {
                    headers: { "Content-Type": "application/json" }
                });

                //console.log(this.$route.path)

                //this.$router.replace({ path: this.$route.path, query: { t: Date.now() } });
                this.$router.go(0);
            }
            catch(e){
                console.error(e)
            }
        },

        async remover(){
            try{
                let body = {
                    uuid_usuario: this.uuid_usuario,
                    uuid_livro: this.uuid_livro
                }
                
                const response = await axios.delete(`https://inkforge-api.onrender.com/favoritos/${this.favorito.uuid_favorito}`, {
                    headers: { "Content-Type": "application/json" }
                });

                this.$router.go(0);
                console.log(this.favorito)
            }
            catch(e){
                console.error(e)
            }
        },


        async compartilhar() {
            // Alterando as meta tags dinamicamente antes de compartilhar
            useHead({
                title: this.livro.titulo,
                meta: [
                { property: "og:title", content: this.livro.titulo },
                { property: "og:description", content: this.livro.descricao },
                { property: "og:url", content: this.livro.url },
                { property: "og:image", content: this.livro.imagem },
                { property: "og:type", content: "website" },
                ],
            });
            if (navigator.share) {

                navigator.share({
                    title: "Confira essa história!",
                    text: "Dá uma olhada nesse conteúdo incrível!",
                    url: window.location.href
                })
                .then(() => console.log("Compartilhado com sucesso"))
                .catch((error) => console.error("Erro ao compartilhar:", error));
            } 
            else {
                console.log("Seu navegador não suporta compartilhamento nativo.");
            }
        },
    },
    computed: {
        auth() { return authStore().usuario }
    }
};
</script>

<style scoped>
.acoes {
    font-family: 'Satoshi-Regular', sans-serif;
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 10px;
}

.icon {
    color: #555;
    font-size: 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.icon:hover {
    color: #000;
}

.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated {
  border-radius: 25px 25px 0px 0px;
}

.bottom-button {
    padding: 5px 10px;
    border-radius: 57px;
    font-size: 24px;
}

.bottom-button:disabled {
    background-color: gray !important; /* Cor mais clara */
    cursor: not-allowed; /* Indica que está desabilitado */
    opacity: 0.5; /* Deixa o botão mais transparente */
}

input[type="text"] {
    border: 2px solid #E2E2E2;
    border-radius: 16px;
    padding: 12px;
    width: 100%;
    font-size: 16px;
    background-color: #fff;
    transition: border-color 0.3s ease;
}

input[type="text"]:focus {
    border-color: #151515; /* Muda a borda quando o input está focado */
    outline: none; /* Remove o contorno padrão do navegador */
}

input[type="text"]:not(:placeholder-shown) {
    border-color: #151515; /* Muda a borda quando o input tem algum valor */
}

.coment p {
    font-family: 'Noto Serif', serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 19.07px;
    letter-spacing: -0.4px;
}

.avatar{
    background-color: #DFDFDF;
    color: #878787;
    width: 40px;
    height:40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 14px;
    margin-right: 5px;
}
</style>