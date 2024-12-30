<template>
    <v-navigation-drawer app :value="drawer" permanent color="grey lighten-4" @input="updateDrawer">
        <v-list>
            <v-list-item-group>
                <!-- Itens do menu -->
                <v-list-item v-for="item in menuItems" :key="item.title" @click="navigate(item.route)">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "NavigationDrawer",
    props: {
        drawer: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        updateDrawer(value) {
            this.$emit("update:drawer", value); // Atualiza o valor do drawer no componente pai
        },
        navigate(route) {
            this.$router.push(route);
            this.updateDrawer(false); // Fecha o menu após navegar
        },
    },
};
</script>