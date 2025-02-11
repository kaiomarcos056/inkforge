<template>
   
    <v-card
      class="mx-auto elevation-5 mr-3 ml-2"
      color="surface-variant"
      image="https://marketplace.canva.com/EAFq91U_RUs/1/0/1003w/canva-capa-de-livro-de-fantasia-elegante-verde-e-bege-awJX91ybn9w.jpg"
      width="150"
      height="225"
      @click="homeLivro"
    ></v-card>

</template>

<script>

export default {
    name: 'ListaLivro',
    data() {
        return {
          
        };
    },
    methods: {
        homeLivro: function(event){
            this.$router.push('/homelivro');
        }
    }
};

</script>

<style scoped>
h1{
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
}
</style>