<template>
    <swiper 
        :slides-per-view="1.5" 
        space-between="50" 
        loop pagination 
        :navigation="navigation" 
        class="mySwiper"
    >
        <swiper-slide v-for="(card, index) in cards" :key="index">
            <v-card 
                width="250" 
                height="100" 
                class=""
            >

            
                <v-card-title class="text-subtitle-1">Além das Estrelas Caídas</v-card-title>
            </v-card>
        </swiper-slide>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
    name: 'CarouselSwiper',
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            cards: [1, 2, 3, 4, 5], // Cards to display
            navigation: true, // Show navigation by default
        };
    },
    watch: {
        // Watch for screen size change and toggle navigation
        $route(to, from) {
            if (window.innerWidth < 768) {
                this.navigation = false; // Hide navigation on mobile
            } else {
                this.navigation = true; // Show navigation on larger screens
            }
        }
    },
    mounted() {
        // Initial check on mount
        if (window.innerWidth < 768) {
            this.navigation = false; // Hide navigation on mobile
        }
    },
};
</script>

<style scoped>
.mySwiper {
    width: 100%;
    height: 110px;
    margin-bottom: 20px;
}

/* Hide navigation buttons on mobile */
@media (max-width: 768px) {
    .swiper-button-next,
    .swiper-button-prev {
        display: none !important;
    }
}
</style>