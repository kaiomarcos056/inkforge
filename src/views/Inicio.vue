<template>
    <div class="container">
        <div class="item" style="margin-bottom: 30%;">
            <img src="@/assets/logo.svg" width="260"> 
        </div>
        <div class="item" style="display: flex; flex-direction: column; gap: 20px;">
            <h5>Crie suas histórias e construa sua comunidade do seu jeito!</h5>
            <button @click="novoUsuario">Criar conta</button>
            <p @click="logar">Já tem uma conta? Entrar</p>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'NovoLivro',
    data() {
        return {

        };
    },
    computed: {

    },
    props: {

    },
    methods: {
        novoUsuario(){
            this.$router.push("/novousuario");
        },
        logar(){
            this.$router.push("/login");
        }
    },
};
</script>

<style scoped>
.container{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: end;
}
.item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
h5{
    font-family: 'Satoshi-Regular', sans-serif;
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0%;
    text-align: center;
}
button{
    background-color: black;
    width: 335px;
    height: 48px;
    border-radius: 60px;
    padding-top: 10px 20px;
    font-family: 'Satoshi-Regular', sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 16.2px;
    letter-spacing: 0%;
    text-align: center;
    color: white;
}
p{
    font-family: 'Satoshi-Regular', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 21.6px;
    letter-spacing: 0%;
    text-align: center;
    color: #1877F2;
    margin-bottom: 30px;
}
</style>