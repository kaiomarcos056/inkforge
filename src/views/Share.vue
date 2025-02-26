<template>
    <div>
      <h1>{{ bookTitle }}</h1>
      <p>{{ bookDescription }}</p>
      <img :src="bookCover" :alt="bookTitle" width="300">
  
      <div class="share-buttons">
        <button @click="share('whatsapp')">Compartilhar no WhatsApp</button>
        <button @click="share('facebook')">Compartilhar no Facebook</button>
        <button @click="share('twitter')">Compartilhar no Twitter</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bookTitle: "O Senhor dos Anéis",
        bookDescription: "Uma aventura épica de J.R.R. Tolkien. Leia mais sobre essa incrível história!",
        bookUrl: "https://meusite.com/livro/senhor-dos-aneis",
        bookCover: "https://meusite.com/imagens/senhor-dos-aneis.jpg",
      };
    },
    mounted() {
      this.updateMetaTags();
    },
    methods: {
      updateMetaTags() {
        document.title = this.bookTitle; // Atualiza o título da página
  
        this.setMetaTag("og:title", this.bookTitle);
        this.setMetaTag("og:description", this.bookDescription);
        this.setMetaTag("og:image", this.bookCover);
        this.setMetaTag("og:url", this.bookUrl);
        this.setMetaTag("og:type", "book");
  
        // Twitter Cards
        this.setMetaTag("twitter:card", "summary_large_image");
        this.setMetaTag("twitter:title", this.bookTitle);
        this.setMetaTag("twitter:description", this.bookDescription);
        this.setMetaTag("twitter:image", this.bookCover);
        this.setMetaTag("twitter:url", this.bookUrl);
      },
      setMetaTag(property, content) {
        let tag = document.querySelector(`meta[property='${property}'], meta[name='${property}']`);
        if (tag) {
          tag.setAttribute("content", content);
        } else {
          tag = document.createElement("meta");
          if (property.startsWith("og:") || property.startsWith("twitter:")) {
            tag.setAttribute("property", property);
          } else {
            tag.setAttribute("name", property);
          }
          tag.setAttribute("content", content);
          document.head.appendChild(tag);
        }
      },
      share(platform) {
        const text = `Confira este livro: ${this.bookTitle}`;
        let shareUrl = "";
  
        switch (platform) {
          case "whatsapp":
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + this.bookUrl)}`;
            break;
          case "facebook":
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.bookUrl)}`;
            break;
          case "twitter":
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.bookUrl)}&hashtags=livros,leitura`;
            break;
        }
  
        window.open(shareUrl, "_blank");
      },
    },
  };
  </script>
  
  <style scoped>
  .share-buttons {
    margin-top: 10px;
  }
  button {
    margin: 5px;
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  