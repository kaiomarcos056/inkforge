<template>
    <div class="tab">
        <div class="tab-nav" id="tabNav">
            <div class="swiper-wrapper">
                <div v-for="(tab, index) in tabs" :key="index" class="swiper-slide"
                    :class="{ active: activeIndex === index }" @click="changeTab(index)" :data-slide-index="index">
                    {{ tab.name }}
                </div>
                <div class="tab-active-bar" id="tabActiveBar" :style="activeBarStyle"></div>
            </div>
        </div>
        <div class="tab-content">
            <div class="swiper-wrapper">
                <div v-for="(tab, index) in tabs" :key="index" class="swiper-slide"
                    :style="{ backgroundColor: tab.color }">
                    {{ tab.content }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css';

export default {
    data() {
        return {
            activeIndex: 0,
            barW: 20,
            btnW: 70,
            slideAmount: 10,
            tabs: [
                { name: 'Tab 1', content: 'Swipe', color: '#04a5c1' },
                { name: 'Tab 2', content: 'Swipe', color: '#f298e7' },
                { name: 'Tab 3', content: 'Swipe', color: '#846ef4' },
                { name: 'Tab 4', content: 'Swipe', color: '#f45509' },
                { name: 'Tab 5', content: 'Swipe', color: '#cf396f' },
                { name: 'Tab 6', content: 'Swipe', color: '#04a5c1' },
                { name: 'Tab 7', content: 'Swipe', color: '#f298e7' },
                { name: 'Tab 8', content: 'Swipe', color: '#846ef4' },
                { name: 'Tab 9', content: 'Swipe', color: '#f45509' },
                { name: 'Tab 10', content: 'Swipe', color: '#cf396f' }
            ],
            tabNavSwiper: null,
            tabContentSwiper: null
        };
    },
    computed: {
        activeBarStyle() {
            return {
                left: `${this.btnW * this.activeIndex}px`,
                width: `${this.barW}px`,
                backgroundColor: this.tabs[this.activeIndex].color,
                transitionDuration: '0.25s'
            };
        }
    },
    methods: {
        changeTab(index) {
            this.activeIndex = index;
            this.tabContentSwiper.slideTo(index);
        }
    },
    mounted() {
        this.tabNavSwiper = new Swiper('.tab-nav', {
            slidesPerView: 'auto'
        });

        this.tabContentSwiper = new Swiper('.tab-content', {
            on: {
                slideChange: () => {
                    this.activeIndex = this.tabContentSwiper.activeIndex;
                    this.tabNavSwiper.slideTo(this.activeIndex - 1);
                }
            }
        });
    }
};
</script>

<style scoped>
* {
    box-sizing: border-box;
    user-select: none;
}

body {
    margin: 0;
    background-color: #13232f;
}

.tab {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -125px;
    margin-left: -160px;
    width: 320px;
    height: 250px;
    background-color: #fff;
    overflow-x: hidden;
}

.tab-nav {
    position: relative;
    height: 50px;
    width: 320px;
    padding: 0 10px;
    background-color: #fff;
    overflow-x: hidden;
}

.tab-nav .swiper-slide {
    display: block;
    width: 50px;
    color: #999;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
    margin: 0 10px;
    cursor: pointer;
}

.tab-nav .swiper-slide.active {
    font-weight: bold;
}

.tab-active-bar {
    position: absolute;
    bottom: 9px;
    left: 0;
    height: 4px;
    width: 20px;
    margin-left: 25px;
    border-radius: 2px;
    transition-property: all;
}

.tab-content {
    height: 200px;
}

.tab-content .swiper-slide {
    color: #fff;
    line-height: 200px;
    text-align: center;
    cursor: pointer;
}
</style>