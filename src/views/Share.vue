<template>
  <div>
    <h1>Minha História Interativa</h1>
    <p>Leia essa história incrível e compartilhe com seus amigos!</p>
    <v-btn @click="prepareAndShare" color="green" prepend-icon="mdi-whatsapp">
      Compartilhar no WhatsApp
    </v-btn>
  </div>
</template>

<script>
import { useHead } from "@vueuse/head";

export default {
  data() {
    return {
      text: "Confira esta história interativa que eu criei!",
      url: window.location.href,
      thumbnail: "https://placehold.co/600x400",
    };
  },
  methods: {
    prepareAndShare() {
      // Alterando as meta tags dinamicamente antes de compartilhar
      useHead({
        title: "Minha História Interativa - Compartilhamento",
        meta: [
          { property: "og:title", content: "Minha História Interativa - Compartilhamento" },
          { property: "og:description", content: "Compartilhe esta história incrível com seus amigos!" },
          { property: "og:image", content: "https://placehold.co/600x400" }, // Altere para a miniatura desejada
          { property: "og:image:width", content: "600" },
          { property: "og:image:height", content: "400" },
          { property: "og:url", content: window.location.href },
          { property: "og:type", content: "website" },
        ],
      });

      // Agora, cria a URL para o WhatsApp e compartilha
      const message = `${this.text} ${this.url}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    },
  },
};
</script>
