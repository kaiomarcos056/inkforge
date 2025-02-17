<template>
    <div v-if="isLoading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
    </div>
    <div style="display: flex; flex-flow: column; height: calc(100vh - 64px);" v-else>

        <v-icon @click="voltar" style="font-size: 38px;">mdi-chevron-left</v-icon>

        <div>
            <div style="display: flex; justify-content: center;">
                <v-card
                    :image="livro.capa"
                    width="90"
                    height="130"
                    class="mr-4"
                ></v-card>
                <div style="display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 class="mb-1">{{livro.nome}}</h3>
                        <div style="display: flex; gap: 5px;">
                            <p v-for="(genero, index) in livro.generos" :key="index" class="tag">{{ genero.nome }}</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center;">
                            <div class="avatar">M</div>
                            <label class="avatar-titulo">{{livro.autor}}</label>
                    </div>
                </div>
            </div>
            <hr style="margin: 15px 30px 10px 30px">
            <div style="padding: 0px 30px;">
                <previa-acoes />
            </div>
        </div>

        <div style="padding: 20px; background-color: #F7F7F5; height: 100%;">
            <v-card v-for="(capitulo, index) in capitulos" :key="capitulo.id" class="mb-4 rounded-lg elevation-1"
                @click="navegarParaCapitulo(capitulo.uuid_capitulo)">

                <v-card-title class="cap-titulo"> Cap. {{index+1}}: {{ capitulo.titulo }} </v-card-title>

                <v-card-text class="cap-text"> {{ capitulo.conteudo }} </v-card-text>

                <v-card-actions class="cap-actions">
                    <v-btn class="cap-btn">
                        Ler <v-icon class="arrow-icon" style="font-size: 26px;">mdi-chevron-right</v-icon> 
                    </v-btn>
                </v-card-actions>
            </v-card>

            <div style="height: 20px;"></div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import PreviaAcoes from "@/components/PreviaAcoes.vue";

export default {
    name: 'Historia',
    components: {
        PreviaAcoes
    },
    data() {
        return {
            livro: {},
            capitulos: [],
            isLoading: true,
        };
    },
    methods: {
        voltar() {
            this.$router.push("/");
        },
        navegarParaCapitulo(id) {
            // this.$router.push({ path: '/capitulo', query: { livro: this.$route.params.id, capitulo: id } });
            this.$router.push({ path: '/dinamico', query: { livro: this.$route.params.id, capitulo: id } });
        },
    },
    async mounted() {
        try {
            // LIVRO
            const response = await axios.get(`https://inkforge-be.onrender.com/livros/${this.$route.params.id}`);
            this.livro = response.data;

            // CAPITULO
            const capitulo = await axios.get(`https://inkforge-be.onrender.com/capitulos/${this.$route.params.id}`);
            this.capitulos = capitulo.data;
        } 
        catch (error) {
            console.error("#ERRO AO BUSCAR LIVROS = ", error);
        }
        finally {
            this.isLoading = false;
        }
    },
};
</script>

<style scoped>
h3 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
}

p {
    border: 1px solid gray;
    border-radius: 50px;
    text-align: center;
    padding: 2px 5px;
    font-size: 12px;

}

.cap-titulo {
    font-family: 'Satoshi-Regular', sans-serif;
    font-weight: 600;
    font-size: 18px;
}

.cap-text {
    font-family: 'Noto Serif', serif;
    font-weight: 400;
    font-size: 14px;
    border-left: 1px solid #d9d9d9;
    margin-left: 20px;
}

.cap-actions {
    justify-content: end;
}

.cap-btn {
    font-family: 'Satoshi-Bold', sans-serif;
    font-weight: bold;
    font-size: 16px;
    text-transform: none;
    letter-spacing: 0px
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