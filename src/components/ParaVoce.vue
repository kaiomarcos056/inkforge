<template>
<!-- <Carousel /> -->

    <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
    </div>

    <v-container style="background-color: #F7F7F5;" v-else>
        <div v-for="livro in data" :key="livro.uui_livro" class="previa">
            <Previa  :livro="livro"
            />
        </div>
    </v-container>
</template>

<script>
    import axios from "axios";

    // COMPONENTES
    import Previa from '../components/Previa.vue'
    import Batata from '../components/Batata.vue';
    import Carousel from "./Carousel.vue";

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
            Batata,
            Carousel
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
h1{
    text-align: left;
}
.h1 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
}

.previa{
    margin-bottom: 30px;
}
</style>