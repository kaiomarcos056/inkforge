<template>
    <div>
        <v-container style="border-bottom: 1px solid #D9D9D9; width: 100%;">
            <div style="display: flex; align-items: center; gap: 5px;">
                <v-avatar color="pink-darken-1"> P </v-avatar>
                <div style="display: flex; flex-flow: column;">
                    <h3>Um viciado nas estrelas</h3>
                    <div style="display: flex; gap: 5px;">
                        <p>Romance</p>
                        <p>Aventura</p>
                        <p>Mistério</p>
                    </div>
                </div>
            </div>
        </v-container>
        <v-container style="background-color: #F7F7F5;">

            <div v-for="i in historico" :key="i.id" @click="navigate(i.route)">
                        <v-list-item :title="i.title" :subtitle="i.subtitle"></v-list-item>
                        <v-divider></v-divider>
                    </div>

            <v-card 
                v-for="capitulo in capitulos" 
                :key="capitulo.id"
                class="mb-4 rounded-lg"
            >
                <v-card-title class="cap-titulo">
                    {{ capitulo.titulo }}
                </v-card-title>
                
                <v-card-text class="cap-text">
                    {{ capitulo.resumo }}
                </v-card-text>
                <v-card-actions class="cap-actions">
                    <v-btn class="cap-btn">Ler <v-icon class="arrow-icon" style="font-size: 26px;">mdi-chevron-right</v-icon> </v-btn>
                </v-card-actions>
            </v-card>

        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'Historia',
        data() {
            return {
                capitulos: [
                    { id: 1, titulo: "Cap. 1: Luzes na Escuridão", resumo: "Noah, um astrônomo recluso, encontra coordenadas ocultas em mapas celestes antigos enquanto trabalha em um observatório. Movido pela curiosidade, ele decide investigar, mas estranhos fenômenos começam a ocorrer, deixando-o com mais perguntas do que respostas.", route: "/" },
                    { id: 2, titulo: "Cap. 2: Encontro Sob as Estrelas", resumo: "Durante uma exposição fotográfica, Noah conhece Clara, uma fotógrafa ousada que compartilha sua paixão pelo céu. Eles descobrem que suas pistas se cruzam e decidem unir forças. Mas uma figura sombria os observa de longe, sugerindo que eles podem estar mexendo com algo perigoso.", route: "/" },
                    { id: 3, titulo: "Cap. 3: O Primeiro Destino", resumo: "Seguindo as pistas, Noah e Clara chegam a um remoto deserto, onde encontram uma estrutura antiga que guarda mais enigmas. Entre desvendá-los e escapar de perigos inesperados, os dois começam a perceber que suas jornadas pessoais podem estar mais conectadas do que imaginavam.", route: "/" },
                ]
            };
        }
    };
</script>

<style scoped>
h3{
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
}

p{
    border: 1px solid gray;
    border-radius: 50px;
    text-align: center;
    padding: 2px 5px;
    font-size: 12px;

}

.cap-titulo{
    font-family: 'Satoshi-Bold', sans-serif;
    font-weight: 600;
    font-size: 18px;
}

.cap-text{
    font-family: 'Noto Serif', serif;
    font-weight: 400;
    font-size: 14px;
    border-left: 1px solid #d9d9d9;
    margin-left: 20px;
}

.cap-actions{
    justify-content: end;
}

.cap-btn{
    font-family: 'Satoshi-Bold', sans-serif;
    font-weight: bold;
    font-size: 16px;
    text-transform: none;
    letter-spacing: 0px
}
</style>