<template>
    <v-container style="background-color: #F7F7F5; height: 90vh;">

        <div style="display: flex; flex-flow: column;">
            <v-icon @click="voltar" style="font-size: 35px; margin-left: -8px;">mdi-chevron-left</v-icon>
            
            <div class="grupo-formulario"> 
                <h1>Novo Capitulo</h1>
                <p>Como o capitulo vai se chamar</p>
                <input type="text" placeholder="Digite o noe do capitulo" v-model="capitulo" :class="{ 'input-error': errors.capitulo }">
                <span v-if="errors.capitulo" class="error">{{ errors.capitulo }}</span>
            </div>
            
            <div class="grupo-formulario">
                <h1>Do que esse capitulo se trata?</h1>
                <p>Escreva um pequeno resumo do capitulo</p>
                <textarea placeholder="O que acontece na história?" rows="6" v-model="sinopse" :class="{ 'input-error': errors.sinopse }"></textarea>
                <span v-if="errors.sinopse" class="error">{{ errors.sinopse }}</span>
            </div>

            <button class="floating-btn" @click="onClick(uuidLivro)">Próximo</button>

        </div>

    </v-container>
</template>
  
<script>
import axios from "axios";
import { useTokenStore } from '@/stores/tokenStore';

export default {
    name: 'NovoLivro',
    data() {
        return {
            capitulo: '',
            sinopse: '',
            errors: {},
        };
    },
    computed: {

    },
    props: {
        uuidLivro: {
            type: String,
            default: () => ''
        }
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
                    const body = {
                        titulo: this.capitulo,
                        conteudo: this.sinopse,
                        uuid_livro: this.$route.params.id
                    }

                    const response = await axios.post("https://inkforge-be.onrender.com/capitulos", body, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${useTokenStore().token}`,
                        }
                    });

                    this.$router.push(`/novapagina/${this.$route.params.id}`);
                } 
                catch (error) {
                    console.log(error.message)
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