<template>
    <div class="acoes">
        <div class="d-flex">
            <v-icon class="icon">mdi-comment</v-icon><p>20</p>
        </div>
        <div class="d-flex">
            <i class="fa-thin fa-heart"></i>
            <v-icon class="fa:fas fa-regular fa-heart"></v-icon>
            <p>2.2K</p>
        </div>
        <div class="d-flex">
            <v-icon class="icon">mdi-share</v-icon><p>8.6K</p>
        </div>
        
        <v-icon class="icon">mdi-bookmark</v-icon>
    </div>
</template>

<script>
export default {
    name: "PreviaAcoes",
};
</script>

<style scoped>
.acoes {
    display: flex;
    justify-content: space-around;
    margin-top: 12px;
    margin-bottom: 12px;
}

.icon {
    color: #555;
    font-size: 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.icon:hover {
    color: #000;
}
</style>