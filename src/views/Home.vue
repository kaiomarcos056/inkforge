<template>
    <v-container>
        <h1 class="h1 mb-2">Em destaque</h1>
        
        <Carousel ></Carousel>
        <br>
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

    import previas from '@/previas.json'; // JSON

    // COMPONENTES
    import Previa from '../components/Previa.vue'
    import Carousel from '../components/Carousel.vue';

    export default {
        name: 'Home',
        data() {
            return {
                livros: previas
            };
        },
        components: {
            Previa,
            Carousel
        }
    };

</script>

<style scoped>

.h1 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
}

</style>