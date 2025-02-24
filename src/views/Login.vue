<template>
    <div style="height: 100vh; display: flex; flex-flow: column; padding: 10px;">

        <v-icon @click="voltar" style="font-size: 35px; margin-left: -8px;">mdi-chevron-left</v-icon>

        <div style="padding: 15px;">
            <h1 class="perfil">Entrar</h1><br>

            <div class="grupo-formulario">
                <h1>Email</h1>
                <input type="text" placeholder="Seu endereço de email" v-model="email"
                    :class="{ 'input-error': errors.email }">
                <span v-if="errors.email" class="error">{{ errors.email }}</span>
            </div>

            <div class="grupo-formulario">
                <div style="display: flex; align-items: center; gap: 5px;">
                    <h1>Senha </h1><label>( mínimo de 8 caracteres )</label>
                </div>
                <input type="password" placeholder="Sua senha" v-model="senha" :class="{ 'input-error': errors.senha }">
                <span v-if="errors.senha" class="error">{{ errors.senha }}</span>
            </div>
        </div>

        <div style="flex: 1; display: flex; justify-content: end; flex-direction: column; padding: 10px; gap: 10px;">
            <v-progress-linear indeterminate style="margin: 10px 0px;" v-if="logando"></v-progress-linear>
            <button @click="onClick()" class="button-float" v-else>Logar</button>
        </div>

        <v-snackbar v-model="snackbar.show" :timeout="5000" :color="snackbar.status" style="bottom: 12%;">
            {{ snackbar.message }}
            <template v-slot:actions>
                <v-btn color="white" text @click="snackbar.closeSnackbar">Fechar</v-btn>
            </template>
        </v-snackbar>

    </div>
</template>

<script>
import axios from "axios";
import { authStore } from '@/stores/authStore';
import { useSnackbarStore } from '@/stores/snackbarStore';

export default {
    name: 'NovoLivro',
    data() {
        return {
            nome: '',
            email: '',
            senha: '',
            errors: {},
            logando: false
        };
    },
    computed: {
        snackbar() { 
            return useSnackbarStore(); 
        },
    },
    methods: {
        voltar() {
            this.$router.push(`/`);
        },
        async onClick() {
            let cadastrar = true;
            this.errors = {}

            if (this.senha.trim().length < 8) {
                this.errors.senha = "Por favor, informe uma senha válida.";
                cadastrar = false;
            }
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(this.email.trim())) {
                this.errors.email = "Por favor, informe um email válido.";
                cadastrar = false;
            }

            if (cadastrar) {
                this.logando = true;

                try {
                    let body = {
	                email: this.email,
	                senha: this.senha
                }

                const response = await axios.post("https://inkforge-api.onrender.com/auth/login",body, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    const auth = authStore();
                    auth.setUsuario(response.data);

                    this.$router.push('/home');
                }
                catch (error) {
                    this.snackbar.abrirSnackbar("Usuário não encontrado.", "error")
                }
                finally{
                    this.logando = false
                }
            }
        },
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
    outline: none;
}

input[type="text"]:not(:placeholder-shown),
input[type="password"]:not(:placeholder-shown) {
    border-color: #151515;
}

.floating {
    position: fixed;
    bottom: 20px;
    right: 10px;
}

.button-float {
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

.button-float:hover {
    background-color: #1a1a1a;
}
</style>