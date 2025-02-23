<template>
    <div class="container">
        <!-- <div v-for="(capitulo, index) in data" :key="capitulo.id" class="capitulo"> -->
        <div v-for="historico in historicos" :key="historico.uuid_livro">
            <div class="capitulo" >
                <div  style="display: flex; justify-content: space-between;">
                    <p> {{ historico.livro }}</p>
                    <p>{{ historico.data }}</p>
                </div>
                
                <div style="display: flex; justify-content: space-between;">
                    <h1> Cap. {{ historico.capitulo }}</h1>
                    <v-icon @click="goleitura(historico.rota)" class="arrow-icon elevation-0" style="font-size: 26px;">mdi-chevron-right</v-icon>
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
            historicos: []
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
            const historicos = await axios.get(`http://localhost:3000/historico/${this.auth.usuario.uuid_usuario}`);
            
            for(let i = 0; i < historicos.data.length; i++){
                let item = {
                    livro: historicos.data[i].nome, 
                    capitulo: historicos.data[i].titulo, 
                    data: historicos.data[i].data_criacao,
                    rota: `/dinamico?livro=${historicos.data[i].uuid_livro}&capitulo=${historicos.data[i].uuid_capitulo}`
                }
                this.historicos.push(item)
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
    height: calc(100vh - 64px);
    padding: 20px;
    background-color: #F7F7F7;
}

.capitulo{
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