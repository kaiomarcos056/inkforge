<template>
    <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
    </div>
    <div class="container" v-else>
        <div style="padding: 10px 5px; border-bottom: 1px solid #D9D9D9;">
            <div style="display: flex; align-items: center;">
                <v-icon class="icon" @click="voltar">mdi-chevron-left</v-icon>
                <h3>{{ capitulo.titulo }}</h3>
            </div>
        </div>

        <div style="display: flex; padding: 10px; gap: 20px; padding-left: 15px; background-color: #F7F7F7;">
            <div class="custom-select">
                <select @change="escolherCapitulo" v-model="opcaoSelecionada">
                    <option v-for="(cap, index) in capitulos" :key="index" :value="cap.uuid_capitulo" :selected="cap.uuid_capitulo == $route.query.capitulo"> Cap. {{ index+1 }} </option>
                </select>
            </div>

            <div class="custom-select">
                <select>
                    <option >Pag. 1 </option>
                </select>
            </div>
        </div>

        <div style="border: 1px solid blue; flex: 1; padding: 20px; background-color: #F7F7F7; overflow: auto;">
            <div>
                <h2 class="mb-2"> Luzes na Escuridão </h2>
            
                <p class="cap-text">
                    O céu estava particularmente limpo naquela noite, um mar de estrelas brilhando intensamente sobre a montanha onde o velho Observatório Arcadia repousava. Noah ajustou o telescópio, concentrado em um ponto específico da abóbada celeste. Ele não precisava olhar para o relógio para saber que já passava da meia-noite; as estrelas tinham sua própria maneira de contar o tempo.
                    Havia algo incomum naquele mapa estelar. 
                    Ele o descobrira ao acaso, escondido em uma gaveta empoeirada na sala de arquivos do observatório. 
                    Era diferente de qualquer outro que já tinha visto: 
                    os traços das constelações pareciam mais intricados, quase como se contassem uma história esquecida.
                    “Mais um para a pilha de enigmas que ninguém se importa em resolver”, murmurou Noah para si mesmo, enquanto alinhava o telescópio com as coordenadas marcadas no mapa.
                    Assim que ajustou a lente, algo brilhou no visor. Não era uma estrela comum. Era uma luz pulsante, sutil e hipnótica, que parecia responder ao seu movimento. Ele piscou, certo de que sua mente pregava peças. Luzes não pulsavam assim no espaço.
                    De repente, o monitor ao lado do telescópio piscou com um código estranho. Linhas de números e símbolos começaram a preencher a tela, como se uma mensagem estivesse sendo transmitida diretamente do céu. Noah prendeu a respiração, sentindo um arrepio correr por sua espinha.
                    Por um momento, tudo ficou em silêncio. Somente o som do vento batendo nas janelas do observatório preenchia o espaço. Ele tentou decifrar os símbolos, mas a sensação de que estava prestes a cruzar um limite invisível o fez hesitar.
                    “Seja o que for isso, alguém está me mandando olhar mais de perto”, pensou, enquanto um lampejo de excitação e medo se misturava dentro dele.
                    Mal sabia Noah que aquela descoberta seria o primeiro passo para uma jornada que mudaria sua vida — e o destino das estrelas que tanto amava.
                </p>
            </div>
        </div>
        
        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; padding: 15px 5px;">
            <v-btn class="btn-footer" rounded="xl" height="48" width="144" flat> Página anterior </v-btn>
            <v-btn class="btn-footer" rounded="xl" height="48" width="144" flat color="black" @click="dialog = true"> Próxima página</v-btn>
        </div>
    </div>

    <!--
    <div style="display: flex; flex-flow: column;">
        
        

        
    </div>
    -->
</template>

<script>
import axios from "axios";

export default {
    name: 'Capitulo',
    data() {
        return {
            bottomSheet: false,
            dialog: false,
            loading: true,
            capitulo: {},
            capitulos: [],
            opcaoSelecionada: ''
        };
    },
    methods: {
        abrirBottomSheet() {
            this.bottomSheet = true;
            this.dialog = false;
        },
        voltar(){
            this.$router.push(`/historia/${this.$route.query.livro}`);
        },
        escolherCapitulo(event){
            console.log('Mudança detectada! Nova opção:', this.opcaoSelecionada);
            this.$router.push({ path: '/capitulo', query: { livro: this.$route.query.livro, capitulo: this.opcaoSelecionada } });
        }
    },
    async mounted() {
        try {
            const capitulos = await axios.get(`https://inkforge-api.onrender.com/capitulos/${this.$route.query.livro}`);
            this.capitulos = capitulos.data;
            this.capitulo = capitulos.data.find(c => c.uuid_capitulo === this.$route.query.capitulo);
            // this.opcaoSelecionada = this.capitulos.length > 0 ? this.capitulos[0].uuid_capitulo : ''; 
            this.opcaoSelecionada = this.capitulo.uuid_capitulo; 
        } 
        catch (error) {
            console.error(error);
        }
        finally {
            this.loading = false;
        }
    },
    watch: {
        '$route.query.capitulo': async function(newCapitulo, oldCapitulo) {
            if (newCapitulo !== oldCapitulo) {
                this.loading = true;
                try {
                    const capitulos = await axios.get(`https://inkforge-api.onrender.com/capitulos/${this.$route.query.livro}`);
                    this.capitulos = capitulos.data;
                    this.capitulo = capitulos.data.find(c => c.uuid_capitulo === newCapitulo);
                } 
                catch (error) {
                    console.error(error);
                }
                finally {
                    this.loading = false;
                }
            }
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.opcaoSelecionada = to.query.capitulo;
        next();
    }
};
</script>

<style scoped>

.container{
    height: calc(100vh - 64px);
    display: flex;
    flex-direction: column;
}



.icon{
    font-size: 34px;
}


span{
    font-family: 'Satoshi-Regular', sans-serif !important;
    font-size: 25px !important;
}
.btn-footer{
    font-family: 'Satoshi-Bold', sans-serif;
    font-weight: bold;
    font-size: 12px;
    text-transform: none;
    letter-spacing: 0px
}




.custom-select {
    position: relative;
    width: 100px;
    /* position: relative;
    display: inline-block;
    width: 200px; */
}

select {
    width: 100%;
    padding: 5px;
    /* padding-right: 30px; */
    font-size: 16px;
    appearance: none;
    font-family: 'Satoshi-Regular', sans-serif !important;
    font-weight: 700;
    -webkit-appearance: none;
    -moz-appearance: none;
}

select:focus{
    outline: none;
    border: none;
}

.custom-select::after {
    content: "";
    background-image: url('https://i.ibb.co/SX2fLFp0/seta-baixo.png');
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: 63%;
    right: 10px;
    transform: translateY(-50%);
    width: 20px; 
    height: 20px;
    pointer-events: none;
}
</style>