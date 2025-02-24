<template>
    <v-container style="background-color: #F7F7F5;">

        <div style="display: flex; flex-flow: column;">
            <v-icon @click="voltar" style="font-size: 35px; margin-left: -8px;">mdi-chevron-left</v-icon>
            
            <div class="grupo-formulario"> 
                <h1>Hora da escolha</h1>
                <p>Normalmente damos aos leitores uma situação, e propomos dois caminhos pra a história seguir</p>
                <input type="text" placeholder="Qual será a situação?" :class="{ 'input-error': errors.titulo }" v-model="titulo">
                <span v-if="errors.titulo" class="error">{{ errors.titulo }}</span>
            </div>
            
            <div class="grupo-formulario">
                <h1>Escolha 1</h1>
                <p>Escreva um pequeno resumo da escolha e suas possiveis consequencias.</p>
                <textarea placeholder="O que acontece na história?" rows="6" :class="{ 'input-error': errors.escolhaUm }" v-model="escolhaUm"></textarea>
                <span v-if="errors.escolhaUm" class="error">{{ errors.escolhaUm }}</span>
            </div>

            <div class="grupo-formulario">
                <h1>Escolha 2</h1>
                <p>Escreva um pequeno resumo da escolha e suas possiveis consequencias.</p>
                <textarea placeholder="O que acontece na história?" rows="6" :class="{ 'input-error': errors.escolhaDois }" v-model="escolhaDois"></textarea>
                <span v-if="errors.escolhaDois" class="error">{{ errors.escolhaDois }}</span>
            </div>

            <div>
                <v-progress-linear indeterminate style="margin: 10px 0px;" v-if="finalizando"></v-progress-linear>
                <button class="floating-btn" @click="onClick" v-else>Finalizar</button>
            </div>
            
            <br>
        </div>

    </v-container>
</template>
  
<script>
import axios from "axios";
import { useSnackbarStore } from '@/stores/snackbarStore';
import { authStore } from '@/stores/authStore';

export default {
    name: 'NovoLivro',
    data() {
        return {
            titulo: '',
            escolhaUm: '',
            escolhaDois: '',
            errors: {},
            snackbar: false,
            snackbarMessage: '',
            finalizando: false
        };
    },
    computed: {
        auth(){ return authStore().usuario }
    },
    methods: {
        voltar() {
            this.$router.push(`/homelivro/${this.$route.query.livro}`);
        },
        async onClick() {
            let cadastrar = true;

            if (!this.titulo.trim()) {
                this.errors.titulo = "Por favor, informe uma situação.";
                cadastrar = false;
            }
            if (!this.escolhaUm.trim()) {
                this.errors.escolhaUm = "Por favor, informe um primeiro desfecho para situação.";
                cadastrar = false;
            }
            if (!this.escolhaDois.trim()) {
                this.errors.escolhaDois = "Por favor, informe um segundo desfecho para situação.";
                cadastrar = false;
            }

            if(cadastrar){
                try {
                    this.finalizando = true;

                    let body = {
                        uuid_capitulo: this.$route.query.capitulo,
                        titulo: this.titulo,
                        data_inicio: "2025-02-16T00:00:00Z",
                        data_fim: "2025-02-20T23:59:59Z",
                        opcoes: [
                            { descricao: this.escolhaUm },
                            { descricao: this.escolhaDois }
                        ]
                    }

                    const response = await axios.post("https://inkforge-api.onrender.com/votacao", body, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.auth.token}`,
                        }
                    });

                    let idVotacao = response.data.uuid_votacao;
                    
                    body = {
                        uuid_votacao: idVotacao,
                        uuid_usuario: this.auth.usuario.uuid_usuario,
                        descricao: this.escolhaUm
                    }

                    await axios.post("https://inkforge-api.onrender.com/item-votacao", body, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.auth.token}`,
                        }
                    });

                    body = {
                        uuid_votacao: idVotacao,
                        uuid_usuario: this.auth.usuario.uuid_usuario,
                        descricao: this.escolhaDois
                    }

                    await axios.post("https://inkforge-api.onrender.com/item-votacao", body, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.auth.token}`,
                        }
                    });

                    const update = await axios.put(`https://inkforge-api.onrender.com/capitulos/finalizar/${this.$route.query.capitulo}`, {}, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.auth.token}`,
                        }
                    });

                    const snackbarStore = useSnackbarStore();
                    snackbarStore.triggerSnackbar('Votação cadastrada com sucesso.');

                    this.$router.push(`/homelivro/${this.$route.query.livro}`);
                } 
                catch (error) {
                    console.log(error.message)
                }
                finally{
                    this.finalizando = false;
                }
            }

            //this.$router.push("/homelivro");
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
  width: 100%;
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