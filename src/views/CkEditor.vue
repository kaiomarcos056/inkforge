<template>
    <div>
      <h2>Editor de Texto com Jodit</h2>
      <textarea ref="editor"></textarea>
      <h3>Pré-visualização:</h3>
      <div v-html="content" style="border: 1px solid #ccc; padding: 10px;"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        content: "<p>Escreva algo aqui...</p>",
        editorInstance: null,
      };
    },
    mounted() {
      this.editorInstance = new Jodit(this.$refs.editor, {
        autofocus: true,
        minHeight: 300,
      });
  
      this.editorInstance.value = this.content;
      this.editorInstance.events.on("change", () => {
        this.content = this.editorInstance.value;
      });
    },
    watch: {
      content(newValue) {
        if (this.editorInstance && this.editorInstance.value !== newValue) {
          this.editorInstance.value = newValue;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos opcionais */
  </style>
  