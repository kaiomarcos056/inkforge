<template>

    <div class="container">
        <div class="novo-capitulo" v-if="data.length<1">
            <p>Esse livro ainda não possui nenhum capitulo</p>
            <a @click="novoCapitulo(uuidLivro)">Clique aqui para criar seu primeiro capitulo.</a>
        </div>
        <div class="capitulos" v-else>
            <div style="flex: 1; text-align: right; margin-bottom: 10px; margin-top: 10px;">
                <v-icon @click="novoCapitulo(uuidLivro)" style="font-size: 32px; text-align: left;">mdi mdi-plus</v-icon>
            </div>
            <div style="flex: 1;">
                <div v-for="(capitulo, index) in data" :key="capitulo.id" class="capitulo">
                    <h1> Cap. {{index+1}}: {{capitulo.titulo}} </h1>
                    <p> {{capitulo.descricao}} </p>
                    <div style="align-self: end; display: flex; align-items: center;" @click="escolha(capitulo.uuid_capitulo)" v-show="!capitulo.finalizado">
                        <label style="line-height: 1px;">Editar</label>
                        <v-icon class="arrow-icon elevation-0" style="font-size: 26px;">mdi-chevron-right</v-icon> 
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Capitulos',
    methods: {
        novoCapitulo(id){
            this.$router.push(`/novocapitulo/${id}`);
        },
        escolha(id){
            this.$router.push({ path: '/novapagina', query: { livro: this.uuidLivro, capitulo: id } });
        }
    },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        uuidLivro: {
            type: String,
            default: () => ''
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
    text-decoration: underline;
}

.capitulos{
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
}

.capitulo{
    background: white;
    border-radius: 10px;
    box-shadow: 0px 0px 95.42px 0px #0000000D;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.capitulo h1{
    font-family: 'Satoshi-Regular', sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: #151515;
    margin-left: 10px;
}

.capitulo p{
    font-family: 'Noto Serif', serif;
    font-weight: 400;
    font-size: 14px;
    border-left: 1px solid #d9d9d9;
    padding-left: 10px;
}

.capitulo label{
    font-family: 'Satoshi-Regular', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #151515;
    margin-left: 10px;
}
</style>