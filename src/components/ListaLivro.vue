<template>
    <div class="container">
        <div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 20px;">
            <div 
                v-for="(i, index) in data"
                :key="index"
                style="flex: 0 0 calc(50% - 10px); display: flex; align-items: center; justify-content: center;"
            >
                <v-card
                    class="elevation-5"
                    color="surface-variant"
                    :image="i.capa"
                    width="150"
                    height="225"
                    @click="teste(i.uuid_livro)"
                ></v-card>
            </div>
            
        </div>
    </div>
</template>

<script>

export default {
    name: 'ListaLivro',
    data() {
        return {
          
        };
    },
    methods: {
        teste(id){
            this.$router.push(`/homelivro/${id}`);
        },
        // homeLivro: function(event){
        //     this.$router.push('/homelivro');
        // }
        homeLivro(id) {
            console.log(id)
            //this.$router.push(`homelivro/${id}`);
            this.$router.push(`${id}`);
        },
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
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    gap: 25px;
}
</style>