<template>
    

    <div style="display: flex; border: 1px solid red;">
        <v-card
            class="elevation-5 mr-3" width="150" height="225"
            image="https://marketplace.canva.com/EAFq91U_RUs/1/0/1003w/canva-capa-de-livro-de-fantasia-elegante-verde-e-bege-awJX91ybn9w.jpg"
        ></v-card>
        <div style="flex: 1; border: 1px solid blue; display: flex; flex-direction: column;">
            <div style="margin-bottom: 8px;">
                <previa-titulo :titulo="titulo" :tags="tags" />
            </div>

            <div style="flex: 1; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; text-overflow: ellipsis;">
                <previa-corpo :texto="texto" />
            </div>
            
            <div style="display: flex; align-items: center;">
                <p>Ver mais</p>
            </div>

            <div style="display: flex; align-items: center;">
                <div class="avatar">M</div>
                <label class="avatar-titulo">Marcos Kaio</label>
            </div>
        </div>
    </div>

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