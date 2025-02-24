<template>
  <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate ></v-progress-circular>
  </div>
  <div v-else style="background-color: #F7F7F5; display: flex; flex-direction: column; gap: 15px; height: 100%; padding: 10px;">
    <v-snackbar v-model="snackbar.show" :timeout="2000" color="success" style="bottom: 70px;">
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn color="white" text @click="snackbar.closeSnackbar">Fechar</v-btn>
      </template>
    </v-snackbar>

    <div class="top">
      <v-icon @click="voltar" style="font-size: 35px; margin-left: -8px;">mdi-chevron-left</v-icon>
      <label @click="finalizar"> Finalizar</label>
    </div>

    <h1>Páginas</h1>

    <div style="height: 100%;">
      <textarea ref="editor" style="flex: 1"></textarea>
    </div>
    

    <button class="floating-btn" @click="salvar" style="align-self: flex-end;" v-if="!salvando">Salvar</button>
    <v-progress-linear indeterminate v-else></v-progress-linear>

    <v-bottom-sheet v-model="bottomSheet" max-width="500">
      <v-card>

        <div style="padding: 25px 15px; display: flex; flex-direction: column; gap: 10px;">
          <div v-if="finalizando" style="display: flex; align-items: center; justify-content: center; margin: 30px;">
            <v-progress-circular indeterminate ></v-progress-circular>
          </div>
          <div v-else>
            <h2>Finalizar Capítulo?</h2>
            <p class="bottom-p" style="margin-bottom: 20px;">
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
          
        </div>

      </v-card>
    </v-bottom-sheet>
  </div>

</template>

<script>
import axios from "axios";

import { authStore } from '@/stores/authStore';
import { useSnackbarStore } from '@/stores/snackbarStore';

export default {
  name: 'NovaPagina',
  data() {
    return {
      editorInstance: null,
      editorContent: "<p>Este é o texto inicial do editor!</p>",
      loading: true,
      bottomSheet: false,
      capitulo: {},
      salvando: false,
      finalizando: true
    };
  },

  methods: {
    voltar() { this.$router.push(`/homelivro/${this.$route.query.livro}`); },

    async finalizar() {
      try{
        this.bottomSheet = true;
        this.finalizando = true;
        const body = {
          conteudo: this.capitulo.conteudo,
        }

        const capitulo = await axios.put(`https://inkforge-api.onrender.com/capitulos/conteudo/${this.$route.query.capitulo}`, body, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.auth.token}`,
          }
        });
        console.log('salvo')
        this.finalizando = false;
        
      }
      catch(e){

      }
      
    },

    goEscolha: function (event) {
      this.$router.push({ path: '/novaescolha', query: { livro: this.$route.query.livro, capitulo: this.$route.query.capitulo } });
    },

    async salvar() {
      try {
        this.salvando = true;
        
        const body = {
          conteudo: this.capitulo.conteudo,
        }

        const capitulo = await axios.put(`https://inkforge-api.onrender.com/capitulos/conteudo/${this.$route.query.capitulo}`, body, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.auth.token}`,
          }
        });

        this.voltar()
      }
      catch (error) {
        console.log(error.message)
      }
    },

    inicializarEditor() {
      if (!this.$refs.editor) {
        console.error("Elemento do editor não encontrado.");
        return;
      }

      if (window.ClassicEditor) {
        window.ClassicEditor.create(this.$refs.editor)
          .then(editor => {
            this.editorInstance = editor;

            // Define o conteúdo do CKEditor apenas se existir
            if (this.capitulo?.conteudo) {
              editor.setData(this.capitulo.conteudo);
            }

            editor.model.document.on("change:data", () => {
              this.capitulo.conteudo = editor.getData();
            });
          })
          .catch(error => {
            console.error("Erro ao carregar o CKEditor:", error);
          });
      } else {
        console.error("CKEditor não foi carregado corretamente pelo CDN.");
      }
    },
  },

  computed: {
    snackbar() { return useSnackbarStore(); },
    auth(){ return authStore().usuario }
  },

  async mounted() {
    try {
      const capitulos = await axios.get(`https://inkforge-api.onrender.com/capitulos/${this.$route.query.livro}`);
      this.capitulo = capitulos.data.find(capitulo => capitulo.uuid_capitulo === this.$route.query.capitulo);

      console.log(this.capitulo.conteudo)
    }
    catch (e) {
      console.error(e.message);
    }
    finally {
      this.loading = false;
      this.$nextTick(() => {
        this.inicializarEditor();
            });
      
    }
  },
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