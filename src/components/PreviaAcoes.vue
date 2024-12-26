<template>
    <div class="acoes">
        <v-icon class="icon">mdi-comment</v-icon>
        <v-icon class="icon">mdi-heart</v-icon>
        <v-icon class="icon">mdi-share</v-icon>
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
    justify-content: space-between;
    margin-top: 12px;
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