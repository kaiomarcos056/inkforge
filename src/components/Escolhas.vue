<template>

    <div class="container">
        <br>
        
        <div class="capitulos">
            <div style="flex: 1;">
                <div v-for="(item, index) in votacao" :key="index" class="capitulo">
                    <h1> Cap. {{index+1}}: {{item.titulo}} </h1>
                    <v-icon class="arrow-icon elevation-0" style="font-size: 26px;"  @click="escolha(item.uuid_capitulo)">mdi-chevron-right</v-icon> 
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Escolhas',
    data() {
        return {
            escolhas: [],
        };
    },
    methods: {
        escolha(id){
            this.$router.push(`/listaescolha/${id}`);
        }
    },
    props: {
        votacao: {
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
    gap: 10px;
    margin-bottom: 20px;
    justify-content: space-between;
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