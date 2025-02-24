<template>
    <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
    </div>

    <div class="container" v-else>
        <div class="tab">
            <div class="tab-nav" id="tabNav">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" :class="{ active: activeIndex === 0 }" @click="changeTab(0)">
                        Para você
                    </div>
                    <div style="height: 20px; border: 1.5px solid #d9d9d9; align-self: center;"></div>
                    <div class="swiper-slide" :class="{ active: activeIndex === 1 }" @click="changeTab(1)">
                        Seguindo
                    </div>
                </div>
            </div>
            <div class="tab-content">
                <div class="swiper-wrapper">
            
                    <div class="swiper-slide">
                        <component :is="tabs[0].componente"/>
                    </div>
                    
                    <div class="swiper-slide">
                        <component :is="tabs[1].componente"/>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import previas from '@/previas.json'; // JSON

    // COMPONENTES
    import Previa from '../components/Previa.vue'
    import Carousel from '../components/Carousel.vue';
    import Batata from '../components/Batata.vue';
    import ParaVoce from "../components/ParaVoce.vue";
    import Seguindo from "../components/Seguindo.vue";

    import Swiper from 'swiper';
    import 'swiper/css';

    export default {
        name: 'Home',
        data() {
            return {
                activeIndex: 0,
                tabs: [
                    { name: 'Para você', content: 'Swipe', color: '#04a5c1', componente: ParaVoce},
                    { name: 'Seguindo', content: 'Swipe', color: '#f298e7', componente: Seguindo }
                ],
                data: null,
                loading: true,
            };
        },
        components: {
            Previa,
            Carousel,
            Batata
        },
        methods: {
            changeTab(index) {
                this.activeIndex = index; // Atualiza o índice da aba ativa
                this.tabContentSwiper.slideTo(index); // Move o Swiper para a aba correspondente
            },

            initializeSwiper() {
                //this.tabNavSwiper = new Swiper('.tab-nav', {
                    //slidesPerView: 'auto'
                //});

                this.tabContentSwiper = new Swiper('.tab-content', {
                    simulateTouch: false,
                    touchMove: false,
                    touchRatio: 0,
                    on: {
                        slideChange: () => {
                            this.activeIndex = this.tabContentSwiper.activeIndex;
                            this.tabNavSwiper.slideTo(this.activeIndex - 1);
                        }
                    }
                });
            }
        },
        async mounted() {
            try {
                const response = await axios.get("https://inkforge-api.onrender.com/livros");
                this.data = response.data;
            } 
            catch (error) {
                console.error("#ERRO AO BUSCAR LIVROS = ", error);
            }
            finally {
                this.loading = false;
                this.$nextTick(() => {
                    this.initializeSwiper();
                });
            }
        },
    };

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
}

.h1 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
}

.previa{
    margin-bottom: 25px;
}

.tab {
    /* flex: 1; */
    width: 100%;
    overflow-x: hidden;
    background-color: #f7f7f7;
}

.tab-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #fff;
    overflow-x: hidden;
}

.tab-nav .swiper-slide {
    font-family: 'Satoshi-Regular', sans-serif;
    width: 50%;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    line-height: 50px;
    transition: all 0.3s ease-in-out;
    position: relative;
}

.tab-nav .swiper-slide.active {
    color: black;
}

.tab-nav .swiper-slide.active::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 4px;
    background-color: black;
    border-radius: 5px;
}

.tab-content {
    /* flex: 1; */
    width: 100%;
    /* height: 85%; */
}


.tab-content .swiper-slide {
    width: 100%;
    background-color: #f7f7f7;
    /* height: 100%; */
}

</style>