<template>
        
    <section>

        <div style="padding: 15px;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div class="avatar">M</div>
                <div>
                    <h3>Marcos Kaio dos Santos</h3>
                    <div class="grupo-tags">
                        <span>Escritor nato</span>
                        <span>Aventura</span>
                        <span>Mistério</span>
                    </div>
                </div>
            </div>
            <div>
                <p>
                    Apaixonado por histórias que transportam para outros mundos e exploram as complexidades do coração humano. Cada palavra é uma peça de um quebra-cabeça narrativo onde você é parte essencial da jornada. Vamos escrever juntos a próxima grande aventura?"
                </p>
            </div>
        </div>

        <div style="border: 1px solid blue; flex: 1;">
            <Tabs></Tabs>
        </div>

    </section>

</template>

<script>

import Tabs from '../components/Tabs.vue';

export default {
    name: 'MinhaBiblioteca',
    data() {
        return {
          
        };
    },
    methods: {
        voltar() {
            if (window.history.length > 1) {
                this.$router.back();
            } else {
                this.$router.push("/");
            }
        }
    },
    components: {
        Tabs
    }
};

</script>

<style scoped>
section{
    height: 100%;
    display: flex;
    flex-direction: column;
}

h3{
    font-family: 'Satoshi-Bold', sans-serif;
    font-size: 16px;
    font-weight: 500;
}

span{
    font-family: 'Satoshi-Bold', sans-serif;
    font-size: 13px;
    font-weight: 500;
    padding: 1px 8px;
    border: 1px solid #505050;
    color: #505050;
    border-radius: 10px;
}

p{
    font-family: 'Satoshi-Bold', sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
}

.avatar{
    background-color: #DFDFDF;
    color: #878787;
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 20px;
    margin-right: 10px;
}

.grupo-tags{
    display: flex;
    gap: 8px;
}

</style>