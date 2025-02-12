<template>
    <v-container style="background-color: #F7F7F5;">

        <div style="display: flex; flex-flow: column;">
            <v-icon @click="voltar" style="font-size: 35px; margin-left: -8px;">mdi-chevron-left</v-icon>
            
            <div class="grupo-formulario"> 
                <h1>Hora da escolha</h1>
                <p>Normalmente damos aos leitores uma situação, e propomos dois caminhos pra a história seguir</p>
                <input type="text" placeholder="Qual será a situação?">
            </div>
            
            <div class="grupo-formulario">
                <h1>Escolha 1</h1>
                <p>Escreva um pequeno resumo da escolha e suas possiveis consequencias.</p>
                <textarea placeholder="O que acontece na história?" rows="6"></textarea>
            </div>

            <div class="grupo-formulario">
                <h1>Escolha 2</h1>
                <p>Escreva um pequeno resumo da escolha e suas possiveis consequencias.</p>
                <textarea placeholder="O que acontece na história?" rows="6"></textarea>
            </div>
            
            <div style="height: 50px;"></div>

            <button class="floating-btn" @click="onClick">Finalizar</button>

        </div>

    </v-container>
</template>
  
<script>
export default {
    name: 'NovoLivro',
    data() {
        return {
            
        };
    },
    computed: {

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
        onClick() {
            this.$router.push("/homelivro");
        },
    },
};
</script>

<style scoped>
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