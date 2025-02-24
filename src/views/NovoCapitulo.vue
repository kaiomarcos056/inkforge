<template>
    <v-container style="background-color: #F7F7F5; height: calc(100vh - 64px); display: flex; flex-direction: column;">

        <v-icon @click="voltar" style="font-size: 35px; margin-left: -8px;">mdi-chevron-left</v-icon>
            
        <div style="flex: 1;">
            <div class="grupo-formulario"> 
                <h1>Novo Capitulo</h1>
                <p>Como o capitulo vai se chamar</p>
                <input type="text" placeholder="Digite o nome do capitulo" v-model="capitulo" :class="{ 'input-error': errors.capitulo }">
                <span v-if="errors.capitulo" class="error">{{ errors.capitulo }}</span>
            </div>
            <div class="grupo-formulario">
                <h1>Do que esse capitulo se trata?</h1>
                <p>Escreva um pequeno resumo do capitulo</p>
                <textarea placeholder="O que acontece na história?" rows="6" v-model="sinopse" :class="{ 'input-error': errors.sinopse }"></textarea>
                <span v-if="errors.sinopse" class="error">{{ errors.sinopse }}</span>
            </div>
        </div>

        <div style="width: 100%;">
            <button class="floating-btn" @click="onClick(uuidLivro)" v-if="!proximo">Próximo</button>
            <v-progress-linear indeterminate style="margin: 10px 0px;" v-else></v-progress-linear>
        </div>
        
    </v-container>
</template>
  
<script>
import axios from "axios";

import { authStore } from '@/stores/authStore';
import { useSnackbarStore } from '@/stores/snackbarStore';

export default {
    name: 'NovoLivro',
    data() {
        return {
            capitulo: '',
            sinopse: '',
            errors: {},
            proximo: false,
        };
    },
    computed: {
        auth(){ return authStore().usuario }
    },
    props: {
        uuidLivro: {
            type: String,
            default: () => ''
        }
    },
    methods: {
        voltar() {
            this.$router.push(`/homelivro/${this.$route.params.id}`);
        },
        async onClick(id) {
            let cadastrar = true;

            if (!this.capitulo.trim()) {
                this.errors.capitulo = "Por favor, informe um nome para o capitulo.";
                cadastrar = false;
            }
            if (!this.sinopse.trim()) {
                this.errors.sinopse = "Por favor, informe uma sinopse para o capitulo.";
                cadastrar = false;
            }
            
            if(cadastrar){
                try {
                    this.proximo = true;

                    const body = {
                        titulo: this.capitulo,
                        descricao: this.sinopse,
                        conteudo: '',
                        uuid_livro: this.$route.params.id
                    }

                    const capitulo = await axios.post("https://inkforge-api.onrender.com/capitulos", body, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.auth.token}`,
                        }
                    });
                    
                    const snackbarStore = useSnackbarStore();
                    snackbarStore.triggerSnackbar('Capitulo cadastrado com sucesso.');

                    this.$router.push({ path: '/novapagina', query: { livro: this.$route.params.id, capitulo: capitulo.data.uuid_capitulo } });
                } 
                catch (error) {
                    console.log(error.message)
                }
                finally{
                    this.proximo = false;
                }
            }
        },
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
    font-family: 'Satoshi-Bold', sans-serif;
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

.floating-btn {
  background-color: #151515;
  color: white;
  border: none;
  border-radius: 50px;
  height: 48px;
  width: 100%;
  padding: 8px 16px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.floating-btn:hover {
  background-color: #1a1a1a; /* Cor quando passar o mouse */
}
</style>