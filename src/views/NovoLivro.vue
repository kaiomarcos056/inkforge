<template>
    <v-container style="background-color: #F7F7F5;">

        <div style="display: flex; flex-flow: column;">

            <v-btn class="mb-3" @click="voltar" style="font-size: 20px; align-self: baseline;" flat>
                <v-icon style="text-align: left;">mdi-chevron-left</v-icon>
            </v-btn>
            
            <div class="grupo-formulario"> 
                <h1>Nova história</h1>
                <p>Como a história vai se chamar?</p>
                <input type="text" placeholder="Digite o nome da hitória...">
            </div>
            
            <div class="grupo-formulario">
                <h1>Do que a história se trata?</h1>
                <p>Escreva uma pequena sinopse da história</p>
                <textarea placeholder="O que acontece na história?" rows="6"></textarea>
            </div>
            
            <div class="grupo-formulario">
                <h1>Qual o tema da sua história</h1>
                <p>Se pudesse resumir o cerne da sua história sera:</p>
                <div class="checkbox-group">
                    <input type="checkbox" id="Romance" name="chips" value="Romance">
                    <label for="Romance">Romance</label>

                    <input type="checkbox" id="Aventura" name="chips" value="Aventura">
                    <label for="Aventura">Aventura</label>

                    <input type="checkbox" id="Misterio" name="chips" value="Mistério">
                    <label for="Misterio">Mistério</label>

                    <input type="checkbox" id="Terror" name="chips" value="Terror">
                    <label for="Terror">Terror</label>

                    <input type="checkbox" id="Suspense" name="chips" value="Suspense">
                    <label for="Suspense">Suspense</label>

                    <input type="checkbox" id="Comedia" name="chips" value="Comedia">
                    <label for="Comedia">Comédia</label>

                    <input type="checkbox" id="Infantil" name="chips" value="Infantil">
                    <label for="Infantil">Infantil</label>

                    <input type="checkbox" id="Drama" name="chips" value="Drama">
                    <label for="Drama">Drama</label>
                </div>
            </div>

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

            <button class="floating-btn" @click="onClick">Salvar</button>

        </div>

    </v-container>
</template>

<script>
export default {
    name: 'NovoLivro',
    data() {
        return {
            imagePreview: null, // Armazena a pré-visualização da imagem
        };
    },
    computed: {
        backgroundStyle() {
            return {
                backgroundImage: this.imagePreview ? `url(${this.imagePreview})` : "none",
                //backgroundSize: "cover",
                backgroundSize: "contain", // Ajusta a imagem sem cortá-la
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat", // Evita a repetição da imagem
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
        onClick() {
            // Adicione a lógica que você quiser ao clicar no botão
            alert("Botão flutuante clicado!");
        },
    },
};
</script>

<style scoped>
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
    font-size: 13px;
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