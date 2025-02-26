<template>
  <h1>Minha História Interativa</h1>
  <p>Leia essa história incrível e compartilhe com seus amigos!</p>
  <v-btn @click="shareOnWhatsApp" color="green" prepend-icon="mdi-whatsapp">
    Compartilhar no WhatsApp
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      text: "Confira esta história interativa que eu criei!",
      shareUrl: "https://seusite.com/compartilhar.html", // Página estática
    };
  },
  methods: {
    shareOnWhatsApp() {
      const message = `${this.text} ${this.shareUrl}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    },
  },
};
</script>
