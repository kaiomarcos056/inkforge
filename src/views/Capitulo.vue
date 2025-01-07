<template>
    <div style="display: flex; flex-flow: column;">

        <div style="padding: 10px 5px; border-bottom: 1px solid #D9D9D9;">
            <div style="display: flex; align-items: center;">
                <v-icon class="icon">mdi-chevron-left</v-icon>
                <h3>Um viciado nas estrelas</h3>
            </div>
        </div>

        <div style="padding: 20px; background-color: #F7F7F5;">

            <div style="display: flex; gap: 10px; width: 70%;">                
                <v-select label="" variant="outline" density="compact" :items="items" v-model="selected"></v-select>
                <v-select label="" variant="outline" density="compact" :items="items" v-model="selected"></v-select>
            </div>

            <div>
                <h2 class="mb-2"> Luzes na Escuridão </h2>
            
                <p class="cap-text">
                    O céu estava particularmente limpo naquela noite, um mar de estrelas brilhando intensamente sobre a montanha onde o velho Observatório Arcadia repousava. Noah ajustou o telescópio, concentrado em um ponto específico da abóbada celeste. Ele não precisava olhar para o relógio para saber que já passava da meia-noite; as estrelas tinham sua própria maneira de contar o tempo.
                    Havia algo incomum naquele mapa estelar. 
                    Ele o descobrira ao acaso, escondido em uma gaveta empoeirada na sala de arquivos do observatório. 
                    Era diferente de qualquer outro que já tinha visto: 
                    os traços das constelações pareciam mais intricados, quase como se contassem uma história esquecida.
                    “Mais um para a pilha de enigmas que ninguém se importa em resolver”, murmurou Noah para si mesmo, enquanto alinhava o telescópio com as coordenadas marcadas no mapa.
                    Assim que ajustou a lente, algo brilhou no visor. Não era uma estrela comum. Era uma luz pulsante, sutil e hipnótica, que parecia responder ao seu movimento. Ele piscou, certo de que sua mente pregava peças. Luzes não pulsavam assim no espaço.
                    De repente, o monitor ao lado do telescópio piscou com um código estranho. Linhas de números e símbolos começaram a preencher a tela, como se uma mensagem estivesse sendo transmitida diretamente do céu. Noah prendeu a respiração, sentindo um arrepio correr por sua espinha.
                    Por um momento, tudo ficou em silêncio. Somente o som do vento batendo nas janelas do observatório preenchia o espaço. Ele tentou decifrar os símbolos, mas a sensação de que estava prestes a cruzar um limite invisível o fez hesitar.
                    “Seja o que for isso, alguém está me mandando olhar mais de perto”, pensou, enquanto um lampejo de excitação e medo se misturava dentro dele.
                    Mal sabia Noah que aquela descoberta seria o primeiro passo para uma jornada que mudaria sua vida — e o destino das estrelas que tanto amava.
                </p>
            </div>
        </div>

        <v-footer style="display: flex; justify-content: center; align-items: center; gap: 20px; padding: 20px;">
            <v-btn flat rounded="xl" height="48" width="144"> Página anterior </v-btn>
            <v-btn flat rounded="xl" height="48" width="144" color="black" @click="dialog = true"> Próxima página</v-btn>
        </v-footer>


        <v-dialog v-model="dialog" width="auto">
            <!-- <v-card max-width="400" prepend-icon="" text="" title="" > -->
            <v-card max-width="400" class="rounded-lg">
                <div style="padding: 20px; display: flex; flex-direction: column; gap: 10px;">
                    <p style="font-size: 18px; font-weight: 500; font-family: 'Satoshi-Regular', sans-serif;" >Escolha</p>

                    <p class="cap-text" style="border-left: 1px solid #d9d9d9; padding-left: 10px; line-height:19px; letter-spacing: -0.4px;">
                        Noah encara o monitor piscando, o brilho dos símbolos refletindo em seus olhos. Ele sente o peso da decisão iminente. A mensagem é clara: alguém — ou algo — está tentando se comunicar. Mas o que fazer?
                    </p>

                    <div class="radio-group">
                        <label>
                            <input type="radio" name="customRadio" value="op1" />
                            <div class="radio-button">
                                <p style="font-family: 'Noto Serif', serif; font-weight: 400; font-size: 14px; line-height:19px; letter-spacing: -0.4px;">    
                                    <b>Decifrar os símbolos:</b> Noah decide mergulhar nos códigos, cruzando referências com seu banco de dados astronômico e histórico, determinado a descobrir quem ou o que está enviando a mensagem. Ele acredita que a resposta está na lógica e na ciência.
                                </p>
                            </div>
                        </label>

                        <p style="text-align: center; font-size: 14px; font-weight: 700; font-family: 'Satoshi-Regular', sans-serif;">Ou</p>

                        <label>
                            <input type="radio" name="customRadio" value="op2" />
                            <div class="radio-button">
                                <p style="font-family: 'Noto Serif', serif; font-weight: 400; font-size: 14px; line-height:19px; letter-spacing: -0.4px;">
                                    <b>Seguir as coordenadas:</b> Ignorando os códigos por ora, Noah escolhe investigar fisicamente o local indicado pelas coordenadas no mapa estelar. Ele sente que precisa ver o que está lá com seus próprios olhos, mesmo que isso signifique sair da segurança do observatório e enfrentar o desconhecido.
                                </p>
                            </div>
                        </label>
                    </div>

                    <div>
                        <button>Cancelar</button>
                        <button>Sugerir</button>
                        <button>Escolher</button>
                    </div>
                </div>
            </v-card>
        </v-dialog>


    </div>
</template>

<script>
    export default {
        name: 'Capitulo',
        data() {
            return {
                dialog: false,
                selected: "Cap. 1", // Valor selecionado inicial
                items: ["Cap. 1", "Cap. 2", "Cap. 3"], // Itens do select
            };
        },
    };
</script>

<style scoped>
h3 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 16px;
}

h2 {
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 18px;
}

.icon{
    font-size: 34px;
}

.cap-text {
    font-family: 'Noto Serif', serif;
    font-weight: 400;
    font-size: 14px;
    text-align: justify;
}
span{
    font-family: 'Satoshi-Regular', sans-serif !important;
    font-size: 25px !important;
}

/* RADIO */

/* Grupo de botões de rádio */
.radio-group {
    display: flex;
    flex-direction: column;
    gap: 10px; /* Espaçamento entre os botões */
}

/* Estilo do botão de rádio */
.radio-button {
    font-family: 'Noto Serif', serif;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f5;
    border: 1px solid #d9d9d9;
    border-radius: 16px;
    padding: 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: #151515;
    transition: all 0.3s ease; /* Transição suave */
}

/* Ocultando o input de rádio padrão */
input[type="radio"] {
    display: none;
}

/* Estilo para o botão selecionado */
input[type="radio"]:checked + .radio-button {
    border: 2px solid #4caf50;
}
</style>