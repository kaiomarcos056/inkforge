<template>
    <div class="container">
        <!-- <div v-for="(capitulo, index) in data" :key="capitulo.id" class="capitulo"> -->
        <div v-for="voto in votacoes" :key="voto.uuid_livro">
            <div class="capitulo" >
                <div  style="display: flex; justify-content: space-between;">
                    <p> {{ voto.livro }}</p>
                    <p>{{ voto.data }}</p>
                </div>
                
                <div style="display: flex; justify-content: space-between;">
                    <h1> Cap. {{ voto.capitulo }}</h1>
                    <v-icon @click="goleitura(voto.rota)" class="arrow-icon elevation-0" style="font-size: 26px;">mdi-chevron-right</v-icon>
                </div>
                
            </div>
        </div>


    </div>
</template>

<script>
import axios from "axios";
import { authStore } from '@/stores/authStore';

export default {
    name: 'Historico',
    data() {
        return {
            loading: true,
            votacoes: []
        };
    },
    methods: {
        goleitura(id){
            this.$router.push(`${id}`);
        }
    },
    computed: {
        auth(){ return authStore().usuario }
    },
    async mounted() {
        try {
            const votacoes = await axios.get(`https://inkforge-api.onrender.com/votacao/usuario-votacao/${this.auth.usuario.uuid_usuario}`);
            
            for(let i = 0; i < votacoes.data.length; i++){
                console.log(votacoes.data[i])

                let item = {
                    livro: votacoes.data[i].nome, 
                    capitulo: votacoes.data[i].titulo, 
                    data: votacoes.data[i].data_criacao,
                    rota: `/votacao?livro=${votacoes.data[i].uuid_livro}&capitulo=${votacoes.data[i].uuid_capitulo}`
                }

                this.votacoes.push(item)
            }
        } 
        catch (e) {
            console.error(e.message);
        }
        finally {
            this.loading = false
        }
    },
};
</script>

<style scoped>
.container{
    padding: 20px;
    height: calc(100vh - 64px);
    background-color: #F7F7F7;
}

.capitulo{
    width: 100%;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 0px 95.42px 0px #0000000D;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.capitulo h1{
    font-family: 'Satoshi-Regular', sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: #151515;
    margin-left: 10px;
}

.capitulo p{
    font-family: 'Noto Serif', serif;
    font-weight: 400;
    font-size: 14px;
    padding-left: 10px;
}

.capitulo label{
    font-family: 'Satoshi-Regular', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #151515;
    margin-left: 10px;
}
</style>