<template>
    <div v-if="isLoading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
    </div>

    <v-container style="background-color: #F7F7F5;" v-else>
        <h1 class="h1 mb-2">Em destaque</h1>
        
        <Batata :data="data"></Batata>
        <Batata :data="data" style="margin-bottom: 20px;"></Batata>

        <!-- <Carousel></Carousel> -->
        
        <div v-for="(livro, index) in livros" :key="index" class="previa">
            
            <Previa 
                class="bg-transparent" 
                avatar="https://via.placeholder.com/48" 
                :titulo="livro.titulo"
                :tags="livro.tags" 
                :texto="livro.previa"
            />

        </div>
    </v-container>
</template>

<script>
    import axios from "axios";
    import previas from '@/previas.json'; // JSON

    // COMPONENTES
    import Previa from '../components/Previa.vue'
    import Carousel from '../components/Carousel.vue';
    import Batata from '../components/Batata.vue';

    export default {
        name: 'Home',
        data() {
            return {
                livros: previas,
                item: {
                    capa: 'https://www.designi.com.br/images/preview/11014873.jpg',
                    titulo: 'Aventura na Floresta',
                    tags: ['Aventura', 'Fantasia', 'Mistério']
                },
                data: null,
                isLoading: true,
            };
        },
        components: {
            Previa,
            Carousel,
            Batata
        },
        methods: {

        },
        async mounted() {
            try {
                const response = await axios.get("https://inkforge-be.onrender.com/livros");
                this.data = response.data;
            } 
            catch (error) {
                console.error("#ERRO AO BUSCAR LIVROS = ", error);
            }
            finally {
                this.isLoading = false;
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
    margin-bottom: 25px;
}

</style>