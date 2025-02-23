<template>
    <div class="titulo">
        <div class="info">
            <h3 class="book-title">{{ titulo }}</h3>
            <div class="tags">
                <span v-for="tag in tags" :key="tag" class="tag">{{ tag.nome }}</span>
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
            required: false,
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
    background-color: none;
    color: #505050;
    border: 1px solid #505050;
    border-radius: 20px;
    padding: 2px 6px;
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.4px;
}
</style>