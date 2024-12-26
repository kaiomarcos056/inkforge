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
    font-size: 14px;
    color: #151515;
    margin: 16px 0;
    line-height: 1.6;
    padding-left: 20px;
}
p{
    padding-left: 10px;
    border-left:1px solid #d9d9d9;
}
</style>