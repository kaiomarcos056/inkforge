<template>
    <div v-if="loading" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <v-progress-circular indeterminate></v-progress-circular>
    </div>

    <div style="height: 100vh; display: flex; flex-flow: column; padding: 20px;" v-else>
        <h1 class="perfil">Criar Perfil</h1><br>
        <div style="display: flex; flex-direction: column; gap: 10px;">
            <div class="grupo-formulario">
                <h1>Tudo bem {{ usuario.nome }}?</h1>
                <p>Nos conte um pouco sobre você:</p>
                <textarea placeholder="" rows="5" v-model="descricao"
                    :class="{ 'input-error': errors.sinopse }"></textarea>
                <span v-if="errors.sinopse" class="error">{{ errors.sinopse }}</span>
            </div>

            <div class="grupo-formulario">
                <h1>O que você procura no InkForge?</h1>
                <p>Pode escolher mais de uma opção se for o caso:</p>
                <div class="checkbox-group">
                    <div v-for="interesse in interesses" :key="interesse.uuid_interesse">
                        <input type="checkbox" :id="interesse.nome" name="chips" :value="interesse.uuid_interesse"
                            v-model="interessesSelecionados">
                        <label :for="interesse.nome">{{ interesse.nome }}</label>
                    </div>
                </div>
                <div style="margin: 8px;"></div>
                <span v-if="errors.genero" class="error">{{ errors.genero }}</span>
            </div>

            <div class="grupo-formulario">
                <h1>Que tipo de história te atrai?</h1>
                <p>Escolha os gêneros que você mais gosta:</p>
                <div class="checkbox-group">
                    <div v-for="genero in generos" :key="genero.uuid_genero">
                        <input type="checkbox" :id="genero.nome" name="chips" :value="genero.uuid_genero"
                            v-model="generosSelecionados">
                        <label :for="genero.nome">{{ genero.nome }}</label>
                    </div>
                </div>
                <div style="margin: 8px;"></div>
                <span v-if="errors.genero" class="error">{{ errors.genero }}</span>
            </div>

            <div class="grupo-formulario">
                <h1>Imagem de Perfil</h1>
                <p>Anexar arquivo</p>

                <div class="upload-box" @click="selectImage" :style="backgroundStyle">
                    <h3 v-if="!imagePreview">Enviar Imagem</h3>
                    <p v-if="!imagePreview">Dimensão da imagem (720x1080)</p>
                    <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*" hidden>
                </div>
            </div>
        </div>
        <br>
        <div style="flex: 1; display: flex; justify-content: end; flex-direction: column;">
            <button @click="onClick()">Cadastrar</button>
            <br>
        </div>


    </div>
</template>

<script>
import axios from "axios";
import { useTokenStore } from '@/stores/tokenStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
import { userStore } from '../stores/userStore';

export default {
    name: 'NovoLivro',
    data() {
        const store = userStore();
        return {
            loading: true,
            imagePreview: null,
            nome: '',
            email: '',
            senha: '',
            descricao: '',
            errors: {},
            interesses: [],
            generos: [],
            generosSelecionados: [],
            interessesSelecionados: [],
            store,
        };
    },
    computed: {
        backgroundStyle() {
            return {
                backgroundImage: this.imagePreview ? `url(${this.imagePreview})` : "none",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: "none",
            };
        },
        usuario() {
            return this.store.usuario;
        },
    },
    props: {
        uuidLivro: {
            type: String,
            default: () => ''
        }
    },
    methods: {
        voltar() {
            this.$router.push(`/`);
        },
        selectImage() {
            this.$refs.fileInput.click();
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        async onClick(id) {
            try {
                let foto = '';

                if (this.$refs.fileInput.files.length > 0) {
                    const file = this.$refs.fileInput.files[0];

                    const formData = new FormData();
                    formData.append('image', file);

                    const imagem = await axios.post(
                        "https://api.imgbb.com/1/upload?key=0ce04a2dda81d85390146efdc2922070",
                        formData,
                        {
                            headers: { "Content-Type": "multipart/form-data" }
                        }
                    );

                    foto = imagem.data.data.url;
                }

                let body = {
	                nome: this.usuario.nome,
	                email: this.usuario.email,
	                senha: this.usuario.senha,
	                tipo: 'autor',
	                nivel: 'bronze',
	                foto: foto,
	                descricao: this.descricao,
	                interesses: this.interessesSelecionados
                }

                const response = await axios.post("http://localhost:3000/auth/registrar",body, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                const snackbarStore = useSnackbarStore();
                snackbarStore.triggerSnackbar('Usuário cadastrado com sucesso.');
                    
                this.$router.push('/login');
            }
            catch (e) {
                console.log(e.message)
            }
        },
    },
    async mounted() {
        try {
            const response = await axios.get(`https://inkforge-be.onrender.com/generos`);
            this.generos = response.data;

            const interesses = await axios.get(`http://localhost:3000/interesses`);
            this.interesses = interesses.data;
        }
        catch (error) {
            console.error(error.message);
        }
        finally {
            this.loading = false;
        }
    },
};
</script>

<style scoped>
.perfil {
    font-family: 'Satoshi-Bold', sans-serif;
    font-weight: 800;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0%;
}

.error {
    font-family: 'Satoshi-Regular';
    font-size: 14px;
    color: red;
}

.input-error {
    border: 2px solid red !important;
}

h1 {
    font-family: 'Satoshi-Bold', sans-serif;
    font-size: 20px;
}

p {
    font-family: 'Satoshi-Regular', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #151515;
    margin-bottom: 6px;
}

label {
    font-family: 'Satoshi-Regular', sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 16.2px;
    letter-spacing: 0%;
}

.grupo-formulario {
    margin-bottom: 10px;
}

input[type="text"],
input[type="password"] {
    border: 2px solid #E2E2E2;
    border-radius: 16px;
    padding: 16px;
    width: 100%;
    font-size: 16px;
    background-color: #fff;
    transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="password"]:focus {
    border-color: #151515;
    /* Muda a borda quando o input está focado */
    outline: none;
    /* Remove o contorno padrão do navegador */
}

input[type="text"]:not(:placeholder-shown),
input[type="password"]:not(:placeholder-shown) {
    border-color: #151515;
    /* Muda a borda quando o input tem algum valor */
}

textarea {
    width: 100%;
    border: 2px solid #E2E2E2;
    border-radius: 16px;
    padding: 16px;
    font-size: 16px;
    background-color: #fff;
    transition: border-color 0.3s ease;
    resize: vertical;
    /* Permite redimensionamento apenas na vertical */
}

textarea:focus {
    border-color: #151515;
    outline: none;
}

textarea:not(:placeholder-shown) {
    border-color: #151515;
}

.floating {
    position: fixed;
    bottom: 20px;
    right: 10px;
}

button {
    background-color: #151515;
    color: white;
    border: none;
    border-radius: 50px;
    width: 100%;
    height: 48px;
    padding: 8px 16px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.floating-btn:hover {
    background-color: #1a1a1a;
    /* Cor quando passar o mouse */
}

.checkbox-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

input[type="checkbox"] {
    display: none;
    /* Oculta o checkbox padrão */
}

.checkbox-group label {
    padding: 1px 8px;
    border: 1px solid #505050;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    padding: 3px 10px;
    background: none;
    color: #505050;
    transition: all 0.3s ease;
}

input[type="checkbox"]:checked+label {
    background-color: #E1FAE2;
    color: #73BC47;
    border-color: #73BC47;
}

.upload-box {
    width: 100%;
    height: 300px;
    background-color: #E2E2E2;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    transition: background 0.3s ease;
}
</style>