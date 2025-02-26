<template>
    <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
    </div>

    <div class="container" v-else>
        <v-icon @click="voltar" style="font-size: 38px;" class="m-0 p-0">mdi-chevron-left</v-icon>
        <div style="display: flex; align-items: center; margin: 10px 0px;">
            <h2>Gênero</h2>
            <v-icon style="font-size: 25px; margin-top: 2px;">mdi-chevron-right</v-icon>
            <h2>{{genero.nome}}</h2>
        </div>
        
        <div v-for="livro in data" :key="livro.uui_livro" class="previa">
            <Previa :livro="livro"/>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    import Previa from '@/components/Previa.vue';

    export default {
    name: 'Generos',
    components: {
        Previa
    },
    data() {
        return {
            data: [],
            loading: true,
            genero: {}
        };
    },
    async mounted() {
        await this.carregarGenero(this.$route.params.id);
    },
    beforeRouteUpdate(to, from, next) {
        this.carregarGenero(to.params.id);
        next(); // Continua a navegação normalmente
    },
    methods: {
        async carregarGenero(id) {
            this.loading = true;
            try {
                const response = await axios.get(`https://inkforge-api.onrender.com/livros/genero/${id}`);
                this.data = response.data;

                const generos = await axios.get(`https://inkforge-api.onrender.com/generos`);
                this.genero = generos.data.find(genero => genero.uuid_genero === id);
            } 
            catch (error) {
                console.error("Erro ao buscar gênero:", error);
            }
            finally {
                this.loading = false;
            }
        },
        voltar(){
            this.$router.push("/home");
        }
    }
};

</script>

<style scoped>
.container{
    min-height: calc(100vh - 64px);
    background-color: #F7F7F5;
    padding: 15px;
    display: flex;
    flex-direction: column;
}

.h1 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
}

.previa{
    margin-bottom: 30px;
}
</style>