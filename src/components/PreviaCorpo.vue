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
    font-size: 14px;
    color: #333;
    margin: 16px 0;
    line-height: 1.6;
}
</style>