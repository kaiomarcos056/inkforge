<template>
  <div style="display: flex;">
    <v-card
      class="mx-auto elevation-5 mr-4"
      color="surface-variant"
      image="https://marketplace.canva.com/EAFq91U_RUs/1/0/1003w/canva-capa-de-livro-de-fantasia-elegante-verde-e-bege-awJX91ybn9w.jpg"
      width="80"
      height="120"
    ></v-card>
    <div style="flex: 1;">
      <p>O Mistério da Casa Borcelle</p>
      
      <div class="tags" style="display: flex;">
        <span class="tag">Suspense</span>
        <span class="tag">Romance</span>
        <span class="tag">Drama</span>
      </div>
      
      <label>Autor: Marcos Kaio</label>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Batata',
    props: {
        backgroundImage: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: false,
        },
        tags: {
            type: Array,
            required: false,
            default: () => [],
        },
    }
};
</script>

<style scoped>
  p{
    font-size: 16px;
    font-weight: 500;
    color: #151515;
  }
  label{
    font-weight: 400;
    font-size: 12px;
    font-style: italic;
  }
  .tags {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.tag {
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 12px;
  background: none;
  color: #505050;
  border: 1px solid #505050;
  border-radius: 30px;
  padding: 2px 6px;
}
</style>