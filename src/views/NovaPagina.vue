<template>
  <!--<v-container style="background-color: #F7F7F5; height: 100vh;">-->
  <div
    style="background-color: #F7F7F5; display: flex; flex-direction: column; gap: 15px; height: 100%; padding: 10px;">

    <div class="top">
      <v-icon @click="voltar" style="font-size: 35px; margin-left: -8px;">mdi-chevron-left</v-icon>
      <label @click="finalizar"> Finalizar</label>
    </div>

    <h1>Páginas</h1>

    <div id="toolbar">
      <select class="ql-font"></select>
      <select class="ql-size"></select>
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>
      <button class="ql-strike"></button>
      <button class="ql-blockquote"></button>
      <button class="ql-code-block"></button>
      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>
      <button class="ql-indent" value="-1"></button>
      <button class="ql-indent" value="+1"></button>
      <button class="ql-align" value=""></button>
      <button class="ql-align" value="center"></button>
      <button class="ql-align" value="right"></button>
      <button class="ql-image"></button>
      <button class="ql-video"></button>
      <button class="ql-link"></button>
    </div>


    <div ref="editorContainer" id="editor-container"></div>

    <button class="floating-btn" @click="onClick">Salvar</button>

    <v-bottom-sheet v-model="bottomSheet" max-width="500">
      <v-card>
        <div style="padding: 25px 15px; display: flex; flex-direction: column; gap: 10px;">
          <h2>Finalizar Capítulo?</h2>
          <p class="bottom-p">
            Ao finalizar este capítulo, você será direcionado para a tela de sugestões,
            onde poderá adicionar opções de interação para os leitores. Depois de finalizar,
            não será mais possível editar o capítulo. Se ainda deseja continuar escrevendo,
            escolha <b>"Continuar escrevendo".</b> Caso tenha terminado, toque em <b>"Finalizar".</b>
          </p>
          <div style="display: flex; justify-content: space-evenly;">
            <button class="bottom-button">Continuar escrevendo</button>
            <button @click="goEscolha" class="bottom-button"
              style="color: #fff; background-color: black;">Finalizar</button>
          </div>
        </div>
      </v-card>
    </v-bottom-sheet>

    <!--</v-container>-->
  </div>

</template>

<script>
export default {
  name: 'QuillEditor',
  data() {
    return {
      bottomSheet: false,
      quill: null,
    };
  },
  mounted() {
    // Inicializando o Quill após o componente ser montado
    this.initQuill();
  },
  methods: {
    initQuill() {
      if (!this.$refs.editorContainer) {
      console.error("Erro: editorContainer não encontrado!");
      return;
    }

    this.quill = new Quill(this.$refs.editorContainer, {
      modules: {
        toolbar: '#toolbar',
      },
      theme: 'snow',
    });

      // Adiciona a borda vermelha quando o usuário clica no editor
    this.quill.on('selection-change', (range) => {
      if (range) {
        this.$refs.editorContainer.classList.add('active-border');
      } else {
        this.$refs.editorContainer.classList.remove('active-border');
      }
    });
    },
    finalizar: function (event) {
      this.bottomSheet = true;
    },
    goEscolha: function (event) {
      //this.$router.push(`/novaescolha/${this.$route.params.id}`);
      this.$router.push({ path: '/novaescolha', query: { livro: this.$route.query.livro, capitulo: this.$route.query.capitulo } });
    }
  }
};
</script>

<style scoped>
.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated {
  border-radius: 15px 15px 0px 0px;
}

.bottom-p {
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
}

.bottom-button {
  font-family: 'Satoshi-Bold', sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  height: 48px;
  width: 158px;
  border-radius: 57px;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.top label {
  font-family: 'Satoshi-Bold', sans-serif;
  font-size: 12px;
  font-weight: 800;
}

#editor-container {
  flex: 1;
  border-radius: 20px;
  border: 1px solid #E2E2E2;
  transition: border 0.2s ease-in-out;
}

.active-border {
  border: 1px solid #151515 !important;
}

.ql-toolbar {
  background: #f3f3f3;
  border-radius: 5px;
}

.ql-container {
  border-radius: 5px;
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
  border-color: #151515;
  /* Muda a borda quando o input está focado */
  outline: none;
  /* Remove o contorno padrão do navegador */
}

input[type="text"]:not(:placeholder-shown) {
  border-color: #151515;
  /* Muda a borda quando o input tem algum valor */
}

textarea {
  width: 100%;
  border: 2px solid #E2E2E2;
  border-radius: 16px;
  padding: 16px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.3s ease;
  resize: vertical;
  /* Permite redimensionamento apenas na vertical */
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
  /* Cor do botão */
  color: white;
  border: none;
  border-radius: 50px;
  /* Botão redondo */
  width: 100%;
  height: 48px;
  padding: 8px 16px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.floating-btn:hover {
  background-color: #1a1a1a;
  /* Cor quando passar o mouse */
}
</style>