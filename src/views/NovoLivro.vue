<template>
    <div v-if="isLoading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
    </div>

    <v-container v-else style="background-color: #F7F7F5;">

        <v-snackbar v-model="snackbar" :timeout="900" color="error" style="bottom: 70px;">
            {{ snackbarMessage }}
            <template v-slot:actions>
                <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
            </template>
        </v-snackbar>

        <div style="display: flex; flex-flow: column;">
            <v-icon @click="voltar" style="font-size: 35px; margin-left: -8px;">mdi-chevron-left</v-icon>

            <form @submit.prevent="submitForm">
                <div class="grupo-formulario"> 
                    <h1>Nova história</h1>
                    <p>Como a história vai se chamar?</p>
                    <input type="text" placeholder="Digite o nome da história..." v-model="titulo" :class="{ 'input-error': errors.titulo }">
                    <span v-if="errors.titulo" class="error">{{ errors.titulo }}</span>
                </div>
                
                <div class="grupo-formulario">
                    <h1>Do que a história se trata?</h1>
                    <p>Escreva uma pequena sinopse da história</p>
                    <textarea placeholder="O que acontece na história?" rows="6" v-model="sinopse" :class="{ 'input-error': errors.sinopse }"></textarea>
                    <span v-if="errors.sinopse" class="error">{{ errors.sinopse }}</span>
                </div>

                <div class="grupo-formulario">
                    <div class="checkbox-group">
                        <div v-for="genero in generos" :key="genero.uuid_genero">
                            <input type="checkbox" :id="genero.nome" name="chips" :value="genero.uuid_genero" v-model="generosSelecionados">
                            <label :for="genero.nome">{{ genero.nome }}</label>
                        </div>
                    </div>
                    <div style="margin: 8px;"></div>
                    <span v-if="errors.genero" class="error">{{ errors.genero }}</span>
                </div>
                
                <div style="height: 5px;"></div>

                <div class="grupo-formulario">
                    <h1>Imagem da capa</h1>
                    <p>Anexar arquivo</p>
                    
                    <div class="upload-box" @click="selectImage" :style="backgroundStyle">
                        <h3 v-if="!imagePreview">Enviar Imagem</h3>
                        <p v-if="!imagePreview">Dimensão da imagem (720x1080)</p>
                        <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*" hidden>
                    </div>
                </div>
                
                <div style="height: 60px;"></div>

                <button type="submit" class="floating-btn">Salvar</button>
            </form>
            
        </div>

    </v-container>

</template>

<script>
import axios from "axios";
import { useSnackbarStore } from '@/stores/snackbarStore';
import { useTokenStore } from '@/stores/tokenStore';

export default {
    name: 'NovoLivro',
    data() {
        return {
            titulo: '',
            sinopse: '',
            generosSelecionados: [],
            imagePreview: null,
            isLoading: true,
            generos: [],
            errors: {},
            snackbar: false,
            snackbarMessage: ''
        };
    },
    computed: {
        backgroundStyle() {
            return {
                backgroundImage: this.imagePreview ? `url(${this.imagePreview})` : "none",
                backgroundSize: "contain", // Ajusta a imagem sem cortá-la
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat", // Evita a repetição da imagem
                backgroundColor: "none",
            };
        },
    },
    methods: {
        voltar() {
            if (window.history.length > 1) {
                this.$router.back();
            } 
            else {
                this.$router.push("/");
            }
        },
        selectImage() {
            this.$refs.fileInput.click(); // Simula o clique no input de arquivo
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result; // Atualiza a pré-visualização
                };
                reader.readAsDataURL(file);
            }
        },
        async submitForm() {
            this.errors = {}

            let cadastrar = true;
            
            if (!this.titulo.trim()) {
                this.errors.titulo = "Por favor, informe um nome para a história.";
                cadastrar = false;
            }
            if (!this.sinopse.trim()) {
                this.errors.sinopse = "Por favor, informe uma sinopse para a história.";
                cadastrar = false;
            }
            if (this.generosSelecionados.length < 1) {
                this.errors.genero = "Por favor, informe pelo menos uma categoria para a história.";
                cadastrar = false;
            }

            const body = {
                nome: this.titulo,
                generos: this.generosSelecionados,
                capa: this.imagePreview
            }

            if(cadastrar){
                try {
                    
                    const response = await axios.post("https://inkforge-be.onrender.com/livros",body, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${useTokenStore().token}`,
                        }
                    });

                    const snackbarStore = useSnackbarStore();
                    snackbarStore.triggerSnackbar('Livro cadastrado com sucesso.');
                    
                    this.$router.push('/biblioteca');
                } 
                catch (error) {
                    this.snackbarMessage = error.message;
                    this.snackbar = true;
                }
            }
        }
    },
    async mounted() {
        try {
            // LIVRO
            const response = await axios.get(`https://inkforge-be.onrender.com/generos`);
            this.generos = response.data;
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
.error{
    font-family: 'Satoshi-Regular';
    font-size: 14px;
    color: red;
}
.input-error {
  border: 2px solid red !important; 
}

h1 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-weight: 700;
    font-size: 20px;
}

p {
    font-family: 'Satoshi-Regular', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #151515;
    margin-bottom: 6px;
}

.grupo-formulario {
    margin-bottom: 10px;
}

input[type="text"] {
    border: 2px solid #E2E2E2;
    border-radius: 16px;
    padding: 16px;
    width: 100%;
    font-size: 16px;
    background-color: #fff;
    transition: border-color 0.3s ease;
}
input[type="text"]:focus {
    border-color: #151515; /* Muda a borda quando o input está focado */
    outline: none; /* Remove o contorno padrão do navegador */
}
input[type="text"]:not(:placeholder-shown) {
    border-color: #151515; /* Muda a borda quando o input tem algum valor */
}

textarea {
    width: 100%;
    border: 2px solid #E2E2E2;
    border-radius: 16px;
    padding: 16px;
    font-size: 16px;
    background-color: #fff;
    transition: border-color 0.3s ease;
    resize: vertical; /* Permite redimensionamento apenas na vertical */
}
textarea:focus {
    border-color: #151515;
    outline: none;
}

textarea:not(:placeholder-shown) {
    border-color: #151515;
}

.checkbox-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

input[type="checkbox"] {
    display: none; /* Oculta o checkbox padrão */
}

.checkbox-group label {
    padding: 1px 8px;
    border: 1px solid #505050;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    padding: 3px 10px;
    background: none;
    color: #505050;
    transition: all 0.3s ease;
}

input[type="checkbox"]:checked + label {
    background-color: #E1FAE2;
    color: #73BC47;
    border-color: #73BC47;
}

.upload-box {
  width: 100%;
  height: 300px;
  background-color: #E2E2E2;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.floating-btn {
  position: fixed; /* Fixa o botão na tela */
  bottom: 20px; /* Distância do fundo da janela */
  right: 10px; /* Distância da lateral direita */
  background-color: #151515; /* Cor do botão */
  color: white;
  border: none;
  border-radius: 50px; /* Botão redondo */
  width: 95%;
  height: 48px;
  padding: 8px 16px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.floating-btn:hover {
  background-color: #1a1a1a; /* Cor quando passar o mouse */
}
</style>