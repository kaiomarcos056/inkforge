<template>
    <div style="height: 100vh; display: flex; flex-flow: column; padding: 10px;">

        <v-icon @click="voltar" style="font-size: 35px; margin-left: -8px;">mdi-chevron-left</v-icon>

        <div style="padding: 15px;">
            <div class="grupo-formulario">
                <h1>Comece agora</h1>
                <p>Crie uma conta para começar a contar suas próprias histórias e sugerir novos caminhos para aquelas
                    que você mais gostou.</p>
            </div>

            <div class="grupo-formulario">
                <h1>Nome</h1>
                <input type="text" placeholder="Seu nome" v-model="nome" :class="{ 'input-error': errors.nome }">
                <span v-if="errors.nome" class="error">{{ errors.nome }}</span>
            </div>

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
            <p>
                Ao criar uma conta, você confirma que leu e concorda com nossos 
                <b style="color: #1877F2;">Termos e Condições.</b>
            </p>
            <button @click="onClick(uuidLivro)">Continuar</button>
        </div>


    </div>
</template>

<script>
import axios from "axios";
import { userStore } from '../stores/userStore';

export default {
    name: 'NovoLivro',
    data() {
        return {
            nome: '',
            email: '',
            senha: '',
            errors: {},
        };
    },
    computed: {

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
        onClick(id) {
            let cadastrar = true;
            this.errors = {}

            if (!this.nome.trim()) {
                this.errors.nome = "Por favor, informe seu nome.";
                cadastrar = false;
            }
            if (!this.email.trim()) {
                this.errors.email = "Por favor, informe seu email.";
                cadastrar = false;
            }
            if (!this.senha.trim()) {
                this.errors.senha = "Por favor, informe sua senha.";
                cadastrar = false;
            }
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
                const store = userStore();
                store.setNome(this.nome);
                store.setEmail(this.email);
                store.setSenha(this.senha);
                this.$router.push(`/novoperfil`);
            }
        },
    },
};
</script>

<style scoped>
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
</style>