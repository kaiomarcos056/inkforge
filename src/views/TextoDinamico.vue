<template>
    <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
    </div>
    <div id="app" v-else>
        <div style="padding: 10px 5px; border-bottom: 1px solid #D9D9D9;">
            <div style="display: flex; align-items: center;">
                <v-icon class="icon" @click="voltar">mdi-chevron-left</v-icon>
                <h3>{{ capitulo.titulo }}</h3>
            </div>
        </div>

        <div style="display: flex; padding: 5px 10px; gap: 20px; background-color: #F7F7F7;">
            <div class="custom-select">
                <select @change="escolherCapitulo" v-model="opcaoSelecionada">
                    <option v-for="(cap, index) in capitulos" :key="index" :value="cap.uuid_capitulo" :selected="cap.uuid_capitulo == $route.query.capitulo"> Cap. {{ index+1 }} </option>
                </select>
            </div>

            <div id="pagination-controls" class="custom-select">   
                <select id="page-select" v-model="selectedPage">
                    <option v-for="(page, index) in pages" :key="index" :value="index">
                        Pág. {{ index + 1 }}
                    </option>
                </select>
            </div>
        </div>

        <div style="display: flex; flex: 1; background-color: #F7F7F7; box-sizing: border-box; padding: 15px;">
            <!-- <div id="text-container" ref="textContainer">
                {{ currentText }}
            </div> -->
            <div id="text-container" ref="textContainer" v-html="currentText"></div>

        </div>

        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; padding: 15px 5px;">
            <v-btn class="btn-footer" rounded="xl" height="48" width="144" flat @click="previousPage"> Página anterior </v-btn>

            <!-- <v-btn class="btn-footer" rounded="xl" height="48" width="144" flat color="black" @click="dialog = true"> Próxima página</v-btn> -->

            <v-btn class="btn-footer" rounded="xl" height="48" width="144" flat color="black" @click="nextPage"> Próxima página</v-btn>

            <!-- <button @click="previousPage" :disabled="selectedPage === 0">Anterior</button>
            <button @click="nextPage" :disabled="selectedPage === pages.length - 1">Próximo</button> -->
        </div>

        <v-dialog v-model="dialog" width="auto">
            
            <v-card max-width="400" class="rounded-lg">
                <div style="padding: 20px; display: flex; flex-direction: column; gap: 10px;">
                    <!-- <p style="font-size: 18px; font-weight: bold; font-family: 'Satoshi-Regular', sans-serif;" >Escolha</p>

                    <p class="cap-text" style="border-left: 1px solid #d9d9d9; padding-left: 10px; line-height:19px; letter-spacing: -0.4px;">
                        {{ escolhas[0].titulo }}
                    </p>

                    <div class="radio-group">
                        <label>
                            <input type="radio" name="customRadio" value="op1" />
                            <div class="radio-button">
                                <p style="font-family: 'Noto Serif', serif; font-weight: 400; font-size: 14px; line-height:19px; letter-spacing: -0.4px;">    
                                    {{ escolhas[0].opcoes[0].descricao }}
                                </p>
                            </div>
                        </label>

                        <p style="text-align: center; font-size: 14px; font-weight: 700; font-family: 'Satoshi-Regular', sans-serif;">Ou</p>

                        <label>
                            <input type="radio" name="customRadio" value="op2" />
                            <div class="radio-button">
                                <p style="font-family: 'Noto Serif', serif; font-weight: 400; font-size: 14px; line-height:19px; letter-spacing: -0.4px;">
                                    {{ escolhas[0].opcoes[1].descricao }}
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
                    </div> -->
                    <p style="font-size: 18px; font-weight: bold; font-family: 'Satoshi-Regular', sans-serif; margin-bottom: 10px; text-align: center;" >
                        Este capítulo está com uma votação aberta! Venha fazer parte da história e decidir os próximos passos dessa aventura!
                    </p>
                    
                    <div style="display: flex; gap: 10px;">
                        <v-btn class="btn-footer" rounded="xl" height="48"  flat @click="home"> Voltar para capítulos </v-btn>
                        <v-btn class="btn-footer" rounded="xl" height="48" width="144" flat color="black" @click="votar"> Votar </v-btn>
                    </div>        
                </div>
            </v-card>
        </v-dialog>

        <v-dialog v-model="modal" width="auto">
            <v-card max-width="400" class="rounded-lg">
                <div style="padding: 20px; display: flex; flex-direction: column; gap: 10px;">
                    <p style="font-size: 18px; font-weight: bold; font-family: 'Satoshi-Regular', sans-serif;" >
                        Desculpe, este capítulo ainda não recebeu uma votação. Enquanto isso, que tal continuar explorando os próximos capítulos? Temos muitas histórias esperando por você!
                    </p>
                    <v-btn class="btn-footer" rounded="xl" height="48" flat color="black" @click="home"> Outros capítulos </v-btn>
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
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            loading: true,
            capitulo: {},
            capitulos: [],
            escolhas: [],

            dialog: false,
            modal: false,
            bottomSheet: false,

            text: ``,
            pages: [],
            selectedPage: 0,
            currentText: "",
        };
    },
    methods: {
        splitTextIntoPages() {
            if (!this.$refs.textContainer) return;

            this.pages = [];
            let words = this.text.split(" ");
            let tempDiv = document.createElement("div");
            let container = this.$refs.textContainer;

            Object.assign(tempDiv.style, {
                position: "absolute",
                visibility: "hidden",
                width: `${container.clientWidth}px`,
                fontSize: window.getComputedStyle(container).fontSize,
                lineHeight: window.getComputedStyle(container).lineHeight,
            });

            document.body.appendChild(tempDiv);

            let currentText = "";
            words.forEach((word) => {
                let testText = currentText ? currentText + " " + word : word;
                // tempDiv.textContent = testText;
                tempDiv.innerHTML = testText;

                if (tempDiv.clientHeight > container.clientHeight) {
                    this.pages.push(currentText);
                    currentText = word;
                } 
                else {
                    currentText = testText;
                }
            });

            if (currentText) this.pages.push(currentText);

            document.body.removeChild(tempDiv);
            this.updateText();
        },
        updateText() {
            this.currentText = this.pages[this.selectedPage] || "";
        },
        previousPage() {
            if (this.selectedPage > 0) {
                this.selectedPage--;
            }
        },
        nextPage() {
            console.log('PAGINA SELECIONADA = ' + this.selectedPage);
            console.log('QUANTIDADE DE PAGINAS = '+this.pages.length);

            if (this.selectedPage < this.pages.length - 1) {
                this.selectedPage++;
            }
            else{
                if(this.escolhas.length > 0){
                    this.dialog = true;
                }
                else{
                    this.modal = true
                }
            }
        },
        abrirBottomSheet() {
            this.bottomSheet = true;
            this.dialog = false;
        },
        voltar(){
            this.$router.push(`/historia/${this.$route.query.livro}`);
        },
        escolherCapitulo(event){
            this.$router.push({ path: '/dinamico', query: { livro: this.$route.query.livro, capitulo: this.opcaoSelecionada } });
        },
        home(){
            this.$router.push(`/historia/${this.$route.query.livro}`);
        },
        votar(){
            this.$router.push(`/votacao/${this.$route.query.capitulo}`);
        }
    },
    watch: {
        selectedPage: "updateText",
        '$route.query.capitulo': async function(newCapitulo, oldCapitulo) {
            if (newCapitulo !== oldCapitulo) {
                this.loading = true;
                try {
                    const capitulos = await axios.get(`http://localhost:3000/capitulos/${this.$route.query.livro}`);
                    this.capitulos = capitulos.data;
                    this.capitulo = capitulos.data.find(c => c.uuid_capitulo === newCapitulo);
                    this.text = this.capitulo.conteudo

                    try{
                        const escolhas = await axios.get(`http://localhost:3000/votacao/capitulo/${this.$route.query.capitulo}`);
                        this.escolhas = escolhas.data
                    }
                    catch (error) {
                     
                    }
                } 
                catch (error) {
                    console.error(error);
                }
                finally {
                    this.loading = false;
                    this.$nextTick(() => {
                        this.splitTextIntoPages();
                        window.addEventListener("resize", this.splitTextIntoPages);
                    });
                }
            }
        }
    },
    async mounted() {
        try {
            const capitulos = await axios.get(`http://localhost:3000/capitulos/${this.$route.query.livro}`);

            this.capitulos = capitulos.data;
            this.capitulo = capitulos.data.find(c => c.uuid_capitulo === this.$route.query.capitulo);
            
            this.opcaoSelecionada = this.capitulo.uuid_capitulo; 
            this.text = this.capitulo.conteudo

            try{
                const escolhas = await axios.get(`http://localhost:3000/votacao/capitulo/${this.$route.query.capitulo}`);
                this.escolhas = escolhas.data
            }
            catch (error) {
             
            }
        } 
        catch (error) {
            console.error(error);
        }
        finally {
            this.loading = false;
            this.$nextTick(() => {
                this.splitTextIntoPages();
                window.addEventListener("resize", this.splitTextIntoPages);
            });
        }
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.splitTextIntoPages);
    },
    beforeRouteUpdate(to, from, next) {
        this.opcaoSelecionada = to.query.capitulo;
        next();
    }
};
</script>

<style scoped>

#app {
    height: calc(100vh - 64px);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

#pagination-controls button {
    padding: 5px 10px;
    cursor: pointer;
}

#pagination-controls button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

#text-container {
    flex: 1;
    overflow: hidden;
    font-family: 'Noto Serif', serif;
    /* font-weight: 400; */
    font-size: 14px;
    text-align: justify;
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

.cap-text {
    font-family: 'Noto Serif', serif;
    font-weight: 400;
    font-size: 14px;
    text-align: justify;
}
</style>