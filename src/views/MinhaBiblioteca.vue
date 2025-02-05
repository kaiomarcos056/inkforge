<template>
    <h1>Minha Biblioteca</h1>
</template>

<script>

export default {
    name: 'MinhaBiblioteca',
    data() {
        return {
            
        };
    },
    methods: {
        voltar() {
            if (window.history.length > 1) {
                this.$router.back();
            } else {
                this.$router.push("/");
            }
        }
    },
};

</script>

<style scoped>

</style>