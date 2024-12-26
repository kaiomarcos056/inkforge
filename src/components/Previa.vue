<template>
    <v-card class="previa">
        <previa-titulo :avatar="avatar" :titulo="titulo" :tags="tags" />
        <previa-corpo :texto="texto" />
        <previa-acoes />
    </v-card>
</template>

<script>
import PreviaTitulo from "./PreviaTitulo.vue";
import PreviaCorpo from "./PreviaCorpo.vue";
import PreviaAcoes from "./PreviaAcoes.vue";

export default {
    name: "Previa",
    components: {
        PreviaTitulo,
        PreviaCorpo,
        PreviaAcoes,
    },
    props: {
        avatar: {
            type: String,
            required: true,
        },
        titulo: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: () => [],
        },
        texto: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.previa {
    border-radius: 12px;
    width: 100%;
    max-width: 600px;
    margin: auto;
    padding: 16px;
    background-color: #f9f9f9;
}
</style>