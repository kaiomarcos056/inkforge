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
                    @click="homeLivro(i.uuid_livro)"
                ></v-card>
            </div>
            
        </div>
        <br>
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
        homeLivro(id){
            this.$router.push(`/historia/${id}`);
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
    justify-content: start;
    align-items: start;
    flex-wrap: wrap;
    padding: 20px;
    gap: 25px;
    /* min-height: 100%; */
}
</style>