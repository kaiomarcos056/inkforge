<template>
    <div class="acoes">
        <div class="d-flex ga-1">
            <img src="../assets/icons/comment.svg" alt="Ícone" width="24" />
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
            <img src="../assets/icons/share.svg" alt="Ícone" height="24" @click="compartilharWhatsApp"/>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useSnackbarStore } from '@/stores/snackbarStore';

export default {
    name: "PreviaAcoes",
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
        }
    },
    methods: {
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

        compartilhar() {
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
                alert("Seu navegador não suporta compartilhamento nativo.");
            }
        },
        compartilharWhatsApp() {
            const mensagem = `📖 *${this.titulo}*\n\n_${this.titulo}_\n\n🔗 ${this.url}`;
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`, "_blank");
        }
    },
    computed: {
        url() {
            return encodeURIComponent(window.location.href);
        },
        titulo() {
            return encodeURIComponent("titulo");
        },
        sinopse() {
            return encodeURIComponent("sinopse");
        },
        imagem() {
            return encodeURIComponent("https://i.ibb.co/h1Tqpfn8/1000291900.jpg"); // URL da capa do livro
        }
    },
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
</style>