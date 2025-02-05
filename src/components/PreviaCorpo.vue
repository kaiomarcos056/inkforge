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
    color: #151515;
    font-size: 11px;
    font-weight: 400;
    line-height: 13.6px;
    letter-spacing: -0.4px;
}
</style>