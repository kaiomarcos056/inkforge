<template>
    <div>
        <v-container style="border-bottom: 1px solid #D9D9D9;">
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
        <v-container style="background-color: #F7F7F5; height: 100vh;">

        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'Historia',
        data() {
            return {};
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
</style>