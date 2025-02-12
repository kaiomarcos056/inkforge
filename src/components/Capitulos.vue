<template>

    <div class="container">
        <div class="novo-capitulo">
            <p>Esse livro ainda não possui nenhum capitulo</p>
            <a href="novocapitulo">Clique aqui para criar seu primeiro capitulo.</a>
            <!--<button @click="abrir">aqui</button>-->
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
    }
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
</style>