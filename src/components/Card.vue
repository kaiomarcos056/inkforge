<template>
    <v-card 
        :style="`width: 327px; height: 93px; background-image: url('${backgroundImage}'); background-size: cover; background-position: center; border-radius: 12px;`"
        class="d-flex flex-column justify-space-between" 
        elevation="4" 
    >
        <div class="overlay">
            <div class="d-flex justify-space-between align-center px-3">
                <div style="flex: 1;">
                    <h3 class="card-title my-2">{{ title }}</h3>
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div class="tags" style="display: flex;">
                            <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
                        </div>
                        <v-icon class="arrow-icon" @click="goToDetails">mdi-chevron-right</v-icon>
                    </div>
                </div>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    name: "CardComponent",
    props: {
        backgroundImage: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    methods: {
        goToDetails() {
            console.log("Navegando para Detalhes");
            this.$router.push(
                //{ name: "Historia"}
                "/historia/1"
            );
        },
    },
};
</script>

<style scoped>
@font-face {
  font-family: 'Satoshi-Regular';
  src: url('../assets/fonts/Satoshi-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

.overlay {
    height: 100%;
    width: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
}

.card-title {
    font-family: 'Satoshi-Regular', sans-serif;
    margin: 0;
    font-size: 20px;
    font-weight: 400;
}

.tags {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.tag {
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 13px;
  background-color: black;
  color: white;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 2px 6px;
}

.arrow-icon {
    color: white;
    font-size: 32px;
}
</style>