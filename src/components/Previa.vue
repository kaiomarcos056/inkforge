<template>
    <div style="display: flex;">
        <v-card
            class="elevation-5 mr-3" width="150" height="225"
            :image="livro.capa"
        ></v-card>
        <div style="flex: 1; display: flex; flex-direction: column;">
            <div style="margin-bottom: 8px;">
                <previa-titulo :titulo="livro.nome" :tags="tags" />
            </div>

            <div style="flex: 1; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 7; -webkit-box-orient: vertical; text-overflow: ellipsis;">
                <previa-corpo :texto="texto" />
            </div>
            
            <div class="ver-mais" style="display: flex; align-items: center;">
                <p>Ver mais</p>
                <v-icon>mdi-chevron-right</v-icon>
            </div>

            <div style="display: flex; align-items: center;">
                <div class="avatar">M</div>
                <label class="avatar-titulo"> {{ livro.autor }} </label>
            </div>
        </div>
    </div>

    <!--
    <v-card flat class="previa">
        <previa-titulo :avatar="avatar" :titulo="titulo" :tags="tags" />
        <previa-corpo :texto="texto" />
        <previa-acoes />
    </v-card>
    -->
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
        livro:{
            type: Object,
            default: () => {}
        },
        avatar: {
            type: String,
            required: false,
        },
        titulo: {
            type: String,
            required: false,
        },
        tags: {
            type: Array,
            default: () => [],
        },
        texto: {
            type: String,
            required: false,
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

.ver-mais{
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 5px;
    margin-top: 10px;
}

.avatar{
    background-color: #DFDFDF;
    color: #878787;
    width: 32px;
    height:32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 14px;
    margin-right: 5px;
}

.avatar-titulo{
    font-size: 14px;
    font-style: italic;
    font-weight: 400;
}
</style>