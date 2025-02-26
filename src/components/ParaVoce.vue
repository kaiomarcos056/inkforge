<template>
    <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate></v-progress-circular>
    </div>

    <v-container style="background-color: #F7F7F5;" v-else>
        <!-- Swiper interno -->
        <div class="swiper meu-swiper-interno">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="livro in data" :key="livro.uui_livro">
                    <Previa :livro="livro" />
                </div>
            </div>

            <!-- Paginação e Navegação -->
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>

        <h1 class="h1 mb-2">Em destaque</h1>
        
        <Batata :data="data"></Batata>
        <Batata :data="data" style="margin-bottom: 20px;"></Batata>

        <div v-for="livro in data" :key="livro.uui_livro" class="previa">
            <Previa :livro="livro" />
        </div>
    </v-container>
</template>

<script>
import axios from "axios";

// Swiper
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
        initializeSwiper() {
    this.swiper = new Swiper('.meu-swiper-interno', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        observer: true,
        observeParents: true,
        nested: true
    });

    // Esperar um curto período e forçar atualização
    setTimeout(() => {
        this.swiper.update();
    }, 500);
}
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
            this.$nextTick(() => {
    setTimeout(() => {
        this.initializeSwiper();
    }, 100); // Pequeno atraso para garantir a renderização
});

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

/* Swiper estilos */
.meu-swiper-interno {
    width: 100%;
    height: auto;
}

.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    padding: 10px;
    border-radius: 8px;
}

.swiper-button-prev, .swiper-button-next {
    color: black;
}

.swiper-pagination {
    position: relative;
    margin-top: 10px;
}
</style>
