<template>
    <div>
      <h1>{{ bookTitle }}</h1>
      <p>{{ bookDescription }}</p>
      <img :src="bookCover" :alt="bookTitle" width="300">
  
      <div class="share-buttons">
        <button @click="share('whatsapp')">📲 WhatsApp</button>
        <button @click="share('facebook')">📘 Facebook</button>
        <button @click="share('twitter')">🐦 Twitter</button>
        <button @click="nativeShare">📢 Compartilhar</button>
      </div>
    </div>
  </template>
  
  <script>
  import "share-api-polyfill"; // Garante compatibilidade
  
  export default {
    data() {
      return {
        bookTitle: "O Senhor dos Anéis",
        bookDescription: "Uma aventura épica de J.R.R. Tolkien. Leia mais sobre essa incrível história!",
        bookUrl: "https://inkforge.vercel.app/share",
        bookCover: "https://br.web.img3.acsta.net/medias/nmedia/18/92/91/32/20224832.jpg",
      };
    },
    methods: {
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
      nativeShare() {
        if (navigator.share) {
          navigator.share({
            title: this.bookTitle,
            text: this.bookDescription,
            url: this.bookUrl
          }).catch(err => console.error("Erro ao compartilhar:", err));
        } else {
          alert("Seu navegador não suporta compartilhamento nativo.");
        }
      }
    }
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
  