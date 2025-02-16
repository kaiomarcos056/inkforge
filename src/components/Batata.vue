<template>
  
  <div style=" display: flex; gap: 25px; align-items: center; overflow-x: auto; scrollbar-width: none; width: 100%; height: 140px;">
    
    <div style="display: flex;" v-for="(item, index) in data" :key="index" @click="goToDetails(item.uuid_livro)">
      <v-card
        class="mx-auto elevation-5 mr-3 ml-2"
        color="surface-variant"
        :image="item.capa"
        width="80"
        height="120"
      ></v-card>
      <div style="flex: 1;">
        <p>{{ item.nome }}</p>
       
        <div class="tags" style="display: flex;">
          <span v-for="(tag, index) in item.generos" :key="index" class="tag">{{ tag.nome }}</span>
        </div>
        
        <label>Autor: {{item.autor}}</label>
      </div>
      
    </div>
  </div>
  
</template>

<script>
export default {
    name: 'Batata',
    props: {
        data: {
          type: Array,
          default: () => []
        },
    },
    methods: {
        goToDetails(id) { this.$router.push(`/historia/${id}`); },
    },
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