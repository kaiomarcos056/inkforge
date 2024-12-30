<template>
        <div id="my-slider" class="mb-5">
            <div v-for="(item, index) in items" :key="index" class="slide">
                <Card
                    :backgroundImage="item.capa"
                    :title="item.titulo" 
                    :tags="item.tags" />
            </div>
        </div>
</template>

<script>
import { tns } from 'tiny-slider';
import 'tiny-slider/dist/tiny-slider.css';

import Card from "@/components/Card.vue";

export default {
    name: 'Carousel',
    data() {
        return {
            items: [
                {
                    capa: 'https://www.designi.com.br/images/preview/11014873.jpg', // Imagem de capa
                    titulo: 'Aventura na Floresta', // Título da história
                    tags: ['Aventura', 'Fantasia', 'Mistério'] // Gêneros
                },
                {
                    capa: 'https://ik.imagekit.io/storybird/images/78d434d0-67f2-43d4-8b1e-b84498b890f7/0_1014998.webp', // Imagem de capa
                    titulo: 'O Segredo do Castelo', // Título da história
                    tags: ['Mistério', 'Suspense', 'Histórico'] // Gêneros
                },
                {
                    capa: 'https://img.freepik.com/fotos-premium/um-poster-para-um-novo-livro-chamado-futuro_900775-7975.jpg', // Imagem de capa
                    titulo: 'Viagem ao Futuro', // Título da história
                    tags: ['Ciência-Ficção', 'Ação', 'Futurista'] // Gêneros
                }
            ]
        };
    },
    mounted() {
        tns({
            container: '#my-slider',
            controls: false,
            items: 1.2,
            slideBy: 1,
            gutter: 50,
            autoplay: false,
            loop: true,
            mouseDrag: true,
            nav: false,
        });
    },
    components: {
        Card
    }
};
</script>

<style scoped>

</style>