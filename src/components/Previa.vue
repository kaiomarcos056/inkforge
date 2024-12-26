<template>
    <v-card flat class="previa">
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
    width: 100%;
    max-width: 600px;
    margin: auto;

    margin-bottom: 30px;
    border-radius: 0px;
    border-bottom: 1px solid #D9D9D9;
}
</style>