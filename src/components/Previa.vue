<template>
    <div style="display: flex; align-items: center;">
        <v-card
            class="elevation-5 mr-3" 
            width="150" 
            height="225"
            :image="livro.capa" 
            @click="golivro(livro.uuid_livro)"
        ></v-card>
        <div style="flex: 1; display: flex; flex-direction: column;">
            <div style="margin-bottom: 8px;">
                <previa-titulo :titulo="livro.nome" :tags="livro.generos" />
            </div>

            <div @click="golivro(livro.uuid_livro)" style="flex: 1; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical; text-overflow: ellipsis;">
                <previa-corpo :texto="livro.descricao" />
            </div>
            
            <div class="ver-mais" style="display: flex; align-items: center; " @click="golivro(livro.uuid_livro)">
                <p>Ver mais</p>
                <v-icon>mdi-chevron-right</v-icon>
            </div>

            <div style="display: flex; align-items: center;">
                <v-avatar style="height: 32px; width: 32px; margin-right: 5px;" v-if="livro.foto !== ''">
                    <v-img :src="livro.foto" ></v-img>
                </v-avatar>
                <div class="avatar" v-else>{{ livro.autor.charAt(0) }}</div>
                <label class="avatar-titulo"> {{ livro.autor }} </label>
            </div>
        </div>
    </div>
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
        livro: {
          type: Object,
          default: () => ({})
        },
    },
    methods: {
        golivro(id) {
            console.log(id)
            this.$router.push(`/historia/${id}`);
        }
    }
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
    font-size: 13px;
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