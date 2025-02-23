<template>
    <!-- BARRA DE NAVEGAÇÃO -->
    <v-app-bar app flat>
        
        <v-app-bar-nav-icon @click="toggleDrawer"> 
            <v-avatar style="height: 44px; width: 44px; margin-left: 10px;" v-if="auth.usuario.foto !== ''">
                <v-img :src="auth.usuario.foto" ></v-img>
            </v-avatar>
            <v-avatar color="grey-darken-1" v-else>M</v-avatar>
        </v-app-bar-nav-icon>
        
        <v-app-bar-title class="text-center" @click="home"> 
            <img src="@/assets/logo.svg"> 
        </v-app-bar-title>

        <v-app-bar-nav-icon @click="navigate('novolivro')"> 
            <img src="@/assets/icons/plus.svg"> 
        </v-app-bar-nav-icon>

    </v-app-bar>

    <!-- MENU LATERAL -->
    <v-navigation-drawer v-model="drawer" app>
        <v-list>

            <v-list-item class="mt-3">
                <v-avatar style="height: 44px; width: 44px; margin-right: 10px;" v-if="auth.usuario.foto !== ''">
                    <v-img :src="auth.usuario.foto" ></v-img>
                </v-avatar>
                <v-avatar color="grey-darken-1" v-else>M</v-avatar>
                <v-list-item-title class="h2"> {{ auth.usuario.nome }} </v-list-item-title>
                <v-list-item-title class="h3">{{ auth.usuario.email }}</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigate('biblioteca')">
                <div style="display: flex; gap: 8px;">
                    <img :src="icons.bookIcon" alt="icone">
                    <h4>Minha Biblioteca</h4>
                </div>
            </v-list-item>

            <v-list-item @click="navigate('historico')">
                <div style="display: flex; gap: 8px;">
                    <img :src="icons.rewindIcon" alt="icone">
                    <h4>Histórico de Leitura</h4>
                </div>
            </v-list-item>

            <v-list-item>
                <div style="display: flex; gap: 8px;">
                    <img :src="icons.textArrowIcon" alt="icone">
                    <h4>Continue de Onde Parou</h4>
                </div>
            </v-list-item>

            <v-list-item>
                <v-card variant="outlined" class="px-2 rounded-xl">

                    <div v-for="(historico, index) in historicos" :key="index" @click="navigate(historico.rota)">
                        <v-list-item :title="historico.livro" :subtitle="historico.capitulo"></v-list-item>
                        <v-divider></v-divider>
                    </div>
                    
                </v-card>
            </v-list-item>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
import axios from "axios";

import bookIcon from "@/assets/icons/book.svg";
import rewindIcon from "@/assets/icons/rewind.svg";
import textArrowIcon from "@/assets/icons/textarrow.svg";

import { authStore } from '@/stores/authStore';

export default {
    name: "AppBar",
    data() {
        return {
            drawer: false, // ESTADO INICIAL DO DRAWER
            menuItems: [
                { title: "Minha Biblioteca", icon: "bookIcon", route: "biblioteca" },
                { title: "Histórico de Leitura", icon: "rewindIcon", route: "historico" },
                { title: "Continue de Onde Parou", icon: "textArrowIcon", route: "settings" },
            ],
            icons: {
                bookIcon,
                rewindIcon,
                textArrowIcon
            },
            historicos: []
        };
    },
    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer; // ALTERANDO O ESTADO DO DRAWER
        },
        navigate(route) {
            this.$router.push(`${route}`); // NAVEGANDO PARA ROTA ESPECIFICA
            this.drawer = false; // FECHANDO O DRAWER DEPOIS DE CLICAR NO ITEM DO MENU
        },
        home(){
            this.$router.push("/home"); // NAVEGANDO PARA ROTA ESPECIFICA
            this.drawer = false; // FECHANDO O DRAWER DEPOIS DE CLICAR NO ITEM DO MENU
        }
    },
    computed: {
        auth(){ return authStore().usuario }
    },
    async mounted() {
        try {
            const historicos = await axios.get(`https://inkforge-api.onrender.com/historico/leituras/${this.auth.usuario.uuid_usuario}`);
            
            for(let i = 0; i < historicos.data.length; i++){
                let item = {
                    livro: historicos.data[i].nome, 
                    capitulo: historicos.data[i].titulo, 
                    rota: `/dinamico?livro=${historicos.data[i].uuid_livro}&capitulo=${historicos.data[i].uuid_capitulo}`
                }
                this.historicos.push(item)
            }
        } 
        catch (e) {
            console.error(e.message);
        }
        finally {
            
        }
    },
};
</script>

<style scoped>
.h2{
  font-family: 'Satoshi-Bold', sans-serif;
  font-weight: bold;
  font-size: 18px;
}

.h3{
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 16px;
}
</style>