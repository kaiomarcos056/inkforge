<template>
    <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
    </div>

    <v-container style="background-color: #F7F7F5;" v-else>
        <h1 class="h1 mb-2">Em destaque</h1>
        
        <Batata :data="data"></Batata>
        <Batata :data="data" style="margin-bottom: 20px;"></Batata>

        <div v-for="livro in data" :key="livro.uui_livro" class="previa">
            <Previa 
                :livro="livro"
            />
        </div>
    </v-container>
</template>

<script>
    import axios from "axios";

    // COMPONENTES
    import Previa from '../components/Previa.vue'
    import Batata from '../components/Batata.vue';

    export default {
        name: 'Home',
        data() {
            return {
                data: null,
                loading: true,
            };
        },
        components: {
            Previa,
            Batata
        },
        methods: {
            
        },
        async mounted() {
            try {
                const response = await axios.get("https://inkforge-api.onrender.com/livros");
                this.data = response.data;
            } 
            catch (error) {
                console.error(error);
            }
            finally {
                this.loading = false;
            }
        },
    };

</script>

<style scoped>
.h1 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
}

.previa{
    margin-bottom: 30px;
}
</style>