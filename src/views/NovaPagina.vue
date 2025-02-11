<template>
    <div>
      <!-- Barra de ferramentas personalizada -->
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
  
      <!-- Editor -->
      <div id="editor-container"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'QuillEditor',
    mounted() {
      // Inicializando o Quill após o componente ser montado
      this.initQuill();
    },
    methods: {
      initQuill() {
        // Inicializa o Quill.js
        this.quill = new Quill('#editor-container', {
          modules: {
            toolbar: '#toolbar',  // Conecta a barra de ferramentas personalizada
          },
          theme: 'snow', // Tema do Quill
        });
      }
    }
  };
  </script>
  
  <style scoped>
  #editor-container {
    height: 400px;
  }
  
  .ql-toolbar {
    background: #f3f3f3;
    border-radius: 5px;
  }
  
  .ql-container {
    border-radius: 5px;
  }
  </style>
  