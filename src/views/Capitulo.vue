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
        
        <v-dialog v-model="dialog" width="auto">
            
            <v-card max-width="400" class="rounded-lg">
                <div style="padding: 20px; display: flex; flex-direction: column; gap: 10px;">
                    <p style="font-size: 18px; font-weight: 500; font-family: 'Satoshi-Regular', sans-serif;" >Escolha</p>

                    <p class="cap-text" style="border-left: 1px solid #d9d9d9; padding-left: 10px; line-height:19px; letter-spacing: -0.4px;">
                        Noah encara o monitor piscando, o brilho dos símbolos refletindo em seus olhos. Ele sente o peso da decisão iminente. A mensagem é clara: alguém — ou algo — está tentando se comunicar. Mas o que fazer?
                    </p>

                    <div class="radio-group">
                        <label>
                            <input type="radio" name="customRadio" value="op1" />
                            <div class="radio-button">
                                <p style="font-family: 'Noto Serif', serif; font-weight: 400; font-size: 14px; line-height:19px; letter-spacing: -0.4px;">    
                                    <b>Decifrar os símbolos:</b> Noah decide mergulhar nos códigos, cruzando referências com seu banco de dados astronômico e histórico, determinado a descobrir quem ou o que está enviando a mensagem. Ele acredita que a resposta está na lógica e na ciência.
                                </p>
                            </div>
                        </label>

                        <p style="text-align: center; font-size: 14px; font-weight: 700; font-family: 'Satoshi-Regular', sans-serif;">Ou</p>

                        <label>
                            <input type="radio" name="customRadio" value="op2" />
                            <div class="radio-button">
                                <p style="font-family: 'Noto Serif', serif; font-weight: 400; font-size: 14px; line-height:19px; letter-spacing: -0.4px;">
                                    <b>Seguir as coordenadas:</b> Ignorando os códigos por ora, Noah escolhe investigar fisicamente o local indicado pelas coordenadas no mapa estelar. Ele sente que precisa ver o que está lá com seus próprios olhos, mesmo que isso signifique sair da segurança do observatório e enfrentar o desconhecido.
                                </p>
                            </div>
                        </label>
                    </div>

                    <div style="display: flex; justify-content: space-between;">
                        <v-btn size="x-small" class="btn-bottom-sheet" flat style="color: #747474;">Cancelar</v-btn>
                        <v-btn size="x-small" class="btn-bottom-sheet" flat @click="abrirBottomSheet"> 
                            <p class="mr-1">Sugerir</p>
                            <img src="../assets/icons/star.svg" alt="Star Icon"> 
                        </v-btn>
                        <v-btn size="x-small" class="btn-bottom-sheet" flat> 
                            <p class="mr-1">Escolher</p>
                            <img src="../assets/icons/chevron right.svg"> 
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-dialog>

        <v-bottom-sheet v-model="bottomSheet" max-width="500">
            <v-card>
                <div style="padding: 25px 15px; display: flex; flex-direction: column; gap: 10px;">
                    <h1 style="line-height: 0; margin:0; padding: 0; font-family: 'Satoshi-Regular', sans-serif; font-size: 20px; font-weight: 500;">Adicionar Sugestão</h1>
                    <p></p>
                    <h2 style="font-family: 'Satoshi-Regular', sans-serif; font-size: 14px; font-weight: 500;">Minha sugestão</h2>
                    <textarea rows="4" name="" id="" style="resize: none; border: 2px solid #151515; padding: 10px; border-radius: 16px; font-family: 'Satoshi-Regular', sans-serif; font-weight: 500;" ></textarea>
                </div>
            </v-card>
        </v-bottom-sheet>
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
            const capitulos = await axios.get(`https://inkforge-be.onrender.com/capitulos/${this.$route.query.livro}`);
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
                    const capitulos = await axios.get(`https://inkforge-be.onrender.com/capitulos/${this.$route.query.livro}`);
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

.btn-bottom-sheet{
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 14px;
    font-weight: 700;
    gap: 10px;
    text-transform: none;
}

h3 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
}

h2 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 18px;
}

.icon{
    font-size: 34px;
}

.cap-text {
    font-family: 'Noto Serif', serif;
    font-weight: 400;
    font-size: 14px;
    text-align: justify;
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

.radio-group {
    display: flex;
    flex-direction: column;
    gap: 10px; 
}

.radio-button {
    font-family: 'Noto Serif', serif;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f5;
    border: 2px solid #d9d9d9;
    border-radius: 16px;
    padding: 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: #151515;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

input[type="radio"] {
    display: none;
}

input[type="radio"]:checked + .radio-button {
    border: 2px solid #4caf50;
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