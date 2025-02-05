<template>
    <!-- BARRA DE NAVEGAÇÃO -->
    <v-app-bar app flat>
        
        <v-app-bar-nav-icon @click="toggleDrawer"> 
            <v-avatar color="grey-darken-1">M</v-avatar> 
        </v-app-bar-nav-icon>
        
        <v-app-bar-title class="text-center" @click="home"> 
            <img src="@/assets/logo.svg"> 
        </v-app-bar-title>

        <v-app-bar-nav-icon @click="navigate('new-book')"> 
            <img src="@/assets/icons/plus.svg"> 
        </v-app-bar-nav-icon>

    </v-app-bar>

    <!-- MENU LATERAL -->
    <v-navigation-drawer v-model="drawer" app>
        <v-list>

            <v-list-item class="mt-3">
                <v-avatar color="grey-darken-1">M</v-avatar>
                <v-list-item-title class="h2">Marcos Kaio</v-list-item-title>
                <v-list-item-title class="h3">@Jujubaferoz</v-list-item-title>
            </v-list-item>

            <v-list-item v-for="item in menuItems" :key="item.title" @click="navigate(item.route)">

                <div style="display: flex; gap: 8px;">
                    <img :src="icons[item.icon]" alt="icone">
                    <h4>{{ item.title }}</h4>
                </div>

            </v-list-item>

            <v-list-item>
                <v-card variant="outlined" class="px-2 rounded-xl">

                    <div v-for="i in historico" :key="i.id" @click="navigate(i.route)">
                        <v-list-item :title="i.title" :subtitle="i.subtitle"></v-list-item>
                        <v-divider></v-divider>
                    </div>
                    
                </v-card>
            </v-list-item>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
import bookIcon from "@/assets/icons/book.svg";
import rewindIcon from "@/assets/icons/rewind.svg";
import textArrowIcon from "@/assets/icons/textarrow.svg";

export default {
    name: "AppBar",
    data() {
        return {
            drawer: false, // ESTADO INICIAL DO DRAWER
            menuItems: [
                { title: "Minha Biblioteca", icon: "bookIcon", route: "/biblioteca" },
                { title: "Histórico de Leitura", icon: "rewindIcon", route: "/stories" },
                { title: "Continue de Onde Parou", icon: "textArrowIcon", route: "/settings" },
            ],
            icons: {
                bookIcon,
                rewindIcon,
                textArrowIcon
            },
            historico: [
                { id: 1, title: "Um viciado nas estrelas", subtitle: "Cap 2: Tomada de marte", route: "/" },
                { id: 2, title: "No cair das árvores", subtitle: "Cap 1: Decisão Forte", route: "/" },
                { id: 3, title: "Fagulhas Impetuosas", subtitle: "Cap 1: Carne e Osso", route: "/" },
                { id: 4, title: "Império Hemácio", subtitle: "Cap 3: transfução", route: "/" },
            ]
        };
    },
    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer; // ALTERANDO O ESTADO DO DRAWER
        },
        navigate(route) {
            this.$router.push(route); // NAVEGANDO PARA ROTA ESPECIFICA
            this.drawer = false; // FECHANDO O DRAWER DEPOIS DE CLICAR NO ITEM DO MENU
        },
        home(){
            this.$router.push("/"); // NAVEGANDO PARA ROTA ESPECIFICA
            this.drawer = false; // FECHANDO O DRAWER DEPOIS DE CLICAR NO ITEM DO MENU
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