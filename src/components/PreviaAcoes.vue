<template>
    <div class="acoes">
        <div class="d-flex ga-1">
            <img src="../assets/icons/comment.svg" alt="Ícone" width="16" />
            <p>20</p>
        </div>
        <div class="d-flex ga-1">
            <img src="../assets/icons/heart.svg" alt="Ícone" width="16" />
            <p>2.2K</p>
        </div>
        <div class="d-flex ga-1">
            <img src="../assets/icons/chart.svg" alt="Ícone" width="16" class="g4"/>
            <p>8.6K</p>
        </div>
        <div class="d-flex ga-3 align-center">
            <img src="../assets/icons/bookmark.svg" alt="Ícone"  height="17"/>
            <img src="../assets/icons/share.svg" alt="Ícone" height="17"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "PreviaAcoes",
};
</script>

<style scoped>
.acoes {
    font-family: 'Satoshi-Regular', sans-serif;
    display: flex;
    justify-content: space-around;
    margin-top: 12px;
    margin-bottom: 12px;
}

.icon {
    color: #555;
    font-size: 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.icon:hover {
    color: #000;
}
</style>