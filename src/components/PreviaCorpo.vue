<template>
    <div class="corpo">
        <p>{{ texto }}</p>
    </div>
</template>

<script>
export default {
    name: "PreviaCorpo",
    props: {
        texto: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.corpo {
    font-family: 'Noto Serif', serif;
    font-size: 12px;
    color: #151515;
    line-height: 1.6;
}
</style>