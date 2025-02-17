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
            <div id="text-container" ref="textContainer">
                {{ currentText }}
            </div>
        </div>

        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; padding: 15px 5px;">
            <v-btn class="btn-footer" rounded="xl" height="48" width="144" flat @click="previousPage"> Página anterior </v-btn>
            <!-- <v-btn class="btn-footer" rounded="xl" height="48" width="144" flat color="black" @click="dialog = true"> Próxima página</v-btn> -->
            <v-btn class="btn-footer" rounded="xl" height="48" width="144" flat color="black" @click="nextPage"> Próxima página</v-btn>
            <!-- <button @click="previousPage" :disabled="selectedPage === 0">Anterior</button>
            <button @click="nextPage" :disabled="selectedPage === pages.length - 1">Próximo</button> -->
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            loading: false,
            capitulo: {},
            capitulos: [],

            text: `Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.KAIO`,
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
                tempDiv.textContent = testText;

                if (tempDiv.clientHeight > container.clientHeight) {
                    this.pages.push(currentText);
                    currentText = word;
                } else {
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
            if (this.selectedPage < this.pages.length - 1) {
                this.selectedPage++;
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
        }
    },
    watch: {
        selectedPage: "updateText",
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
    async mounted() {
        try {
            const capitulos = await axios.get(`https://inkforge-be.onrender.com/capitulos/${this.$route.query.livro}`);

            this.capitulos = capitulos.data;
            this.capitulo = capitulos.data.find(c => c.uuid_capitulo === this.$route.query.capitulo);
            
            this.opcaoSelecionada = this.capitulo.uuid_capitulo; 
            this.text = this.capitulo.conteudo
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
h3 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
}

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
    /* font-family: 'Noto Serif', serif; */
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

</style>


<!-- <template>
    <div id="app">
        <div id="pagination-controls">
            <label for="page-select">Página:</label>
            <select id="page-select" v-model="selectedPage">
                <option v-for="(page, index) in pages" :key="index" :value="index">
                    Página {{ index + 1 }}
                </option>
            </select>
        </div>

        <div id="text-container" ref="textContainer">
            {{ currentText }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: `Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.KAIO`, // Seu texto longo aqui
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
                tempDiv.textContent = testText;

                if (tempDiv.clientHeight > container.clientHeight) {
                    this.pages.push(currentText);
                    currentText = word;
                } else {
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
    },
    watch: {
        selectedPage: "updateText",
    },
    mounted() {
        this.splitTextIntoPages();
        window.addEventListener("resize", this.splitTextIntoPages);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.splitTextIntoPages);
    },
};
</script>

<style scoped>
#app {
    border: 1px solid red;
    height: calc(100vh - 64px);
    display: flex;
    flex-direction: column;
    padding: 20px;
}

#pagination-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

#text-container {
    flex: 1;
    overflow: hidden;
    border: 1px solid #ccc;
    font-size: 14px;
    text-align: justify;
}
</style> -->