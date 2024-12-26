<template>
    <div class="titulo">
        <v-avatar color="grey-darken-1"> M </v-avatar>
        
        <div class="info">
            <h3 class="book-title">{{ titulo }}</h3>
            <div class="tags">
                <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PreviaTitulo",
    props: {
        avatar: {
            type: String,
            required: true,
        },
        titulo: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style scoped>
.titulo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.avatar {
    width: 48px;
    height: 48px;
}

.info {
    flex-grow: 1;
}

.book-title {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
    margin: 0;
}

.tags {
    display: flex;
    gap: 8px;
    margin-top: 4px;
}

.tag {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 12px;
    background-color: rgb(255, 255, 255);
    color: #505050;
    border: 1px solid #505050;
    border-radius: 20px;
    padding: 2px 6px;
}
</style>