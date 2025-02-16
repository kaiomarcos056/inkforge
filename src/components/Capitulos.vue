<template>

    <div class="container">
        <div class="novo-capitulo" v-if="data.length<1">
            <p>Esse livro ainda não possui nenhum capitulo</p>
            <a href="novocapitulo">Clique aqui para criar seu primeiro capitulo.</a>
        </div>
        <div class="capitulos" v-else>
            <div style="flex: 1; text-align: right;">
                <v-icon @click="voltar" style="font-size: 32px; text-align: left;">mdi mdi-plus</v-icon>
            </div>
            <div>
                <v-card v-for="(capitulo, index) in data" :key="capitulo.id" class="mb-4 rounded-lg elevation-1"
                    @click="navegarParaCapitulo(capitulo.id)">
                    <v-card-title class="cap-titulo">
                        Cap.{{index+1}}: {{ capitulo.titulo }}
                    </v-card-title>

                    <v-card-text class="cap-text">
                        {{ capitulo.conteudo }}
                    </v-card-text>
                    <v-card-actions class="cap-actions">
                        <v-btn class="cap-btn">Ler <v-icon class="arrow-icon"
                                style="font-size: 26px;">mdi-chevron-right</v-icon> </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
            
            
        </div>
    </div>

</template>

<script>
export default {
    name: 'Capitulos',
    methods: {
        abrir: function(event){
            this.$router.push("/novocapitulo");
        }
    },
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
};
</script>

<style scoped>
.container{
    background-color: #F7F7F7;
}

.novo-capitulo{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.novo-capitulo p{
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #151515;

}

.novo-capitulo a{
    font-family: 'Satoshi-Bold', sans-serif;
    font-size: 14px;
    font-weight: 800;
    color: #151515;
    letter-spacing: -1px;
}

.capitulos{
    display: flex;
    padding: 20px;
    flex-wrap: wrap;
    gap: 15px;
}
</style>