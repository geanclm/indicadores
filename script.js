/**
 * ==========================================================================
 * PROJETO INDICADORES - MÓDULO DE AUTENTICAÇÃO
 * Arquivo: script.js
 * Descrição: Controlador do protótipo de login com validações e UX.
 * ==========================================================================
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // ----------------------------------------------------------------------
    // 1. CREDENCIAIS FICTÍCIAS PARA VALIDAÇÃO DO PROTÓTIPO
    // ----------------------------------------------------------------------
    const AUTH_CREDENTIALS = {
        username: "admin",
        password: "123"
    };

    // ----------------------------------------------------------------------
    // 2. SELEÇÃO DE ELEMENTOS DO DOM
    // ----------------------------------------------------------------------
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");
    const toastMessage = document.getElementById("toast-message");
    const btnSubmit = document.getElementById("btn-submit");
    const btnText = btnSubmit.querySelector(".btn-text");
    const btnIcon = btnSubmit.querySelector(".btn-icon");
    const spinner = btnSubmit.querySelector(".spinner");
    const btnClear = document.getElementById("btn-clear");
    const togglePasswordBtn = document.getElementById("toggle-password");
    const forgotPasswordLink = document.getElementById("forgot-password-link");

    // ----------------------------------------------------------------------
    // 3. FUNÇÕES AUXILIARES DE UX / FEEDBACK
    // ----------------------------------------------------------------------

    /**
     * Exibe um Toast Message configurável (Erro ou Sucesso)
     */
    const showToast = (message, type = "error") => {
        toastMessage.className = `toast ${type}`;
        toastMessage.innerHTML = type === "error" 
            ? `<i class="fa-solid fa-circle-exclamation"></i> <span>${message}</span>`
            : `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
        toastMessage.classList.remove("hidden");
    };

    /**
     * Oculta o Toast Message
     */
    const hideToast = () => {
        toastMessage.classList.add("hidden");
    };

    /**
     * Limpa mensagens de erro específicas dos campos
     */
    const clearInputErrors = () => {
        usernameError.textContent = "";
        passwordError.textContent = "";
        usernameInput.parentElement.classList.remove("input-error");
        passwordInput.parentElement.classList.remove("input-error");
    };

    /**
     * Define estado de carregamento do botão Submit
     */
    const setLoading = (isLoading) => {
        if (isLoading) {
            btnSubmit.disabled = true;
            btnText.textContent = "Autenticando...";
            btnIcon.classList.add("hidden");
            spinner.classList.remove("hidden");
        } else {
            btnSubmit.disabled = false;
            btnText.textContent = "Entrar";
            btnIcon.classList.remove("hidden");
            spinner.classList.add("hidden");
        }
    };

    // ----------------------------------------------------------------------
    // 4. VALIDAÇÕES DO FORMULÁRIO
    // ----------------------------------------------------------------------

    /**
     * Valida os campos obrigatórios
     * @returns {boolean} True se válido, False se contiver erros
     */
    const validateForm = () => {
        clearInputErrors();
        hideToast();
        let isValid = true;

        const usernameVal = usernameInput.value.trim();
        const passwordVal = passwordInput.value.trim();

        if (!usernameVal) {
            usernameError.textContent = "O campo Usuário é obrigatório.";
            usernameInput.parentElement.classList.add("input-error");
            isValid = false;
        }

        if (!passwordVal) {
            passwordError.textContent = "O campo Senha é obrigatório.";
            passwordInput.parentElement.classList.add("input-error");
            isValid = false;
        }

        if (!isValid) {
            showToast("Por favor, preencha todos os campos obrigatórios.");
        }

        return isValid;
    };

    // ----------------------------------------------------------------------
    // 5. MANIPULADORES DE EVENTOS (EVENT HANDLERS)
    // ----------------------------------------------------------------------

  /**
 * Envio do Formulário (Submissão, Geração de Sessão e Redirecionamento)
 */
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // 1. Validações locais dos campos
    if (!validateForm()) return;

    const usernameVal = usernameInput.value.trim();
    const passwordVal = passwordInput.value.trim();

    // 2. Aciona Estado de Loading
    setLoading(true);

    // 3. Simulação de autenticação assíncrona
    setTimeout(() => {
        if (usernameVal === AUTH_CREDENTIALS.username && passwordVal === AUTH_CREDENTIALS.password) {
            
            // ------------------------------------------------------------------
            // 🔑 GERAÇÃO DA SESSÃO E TOKEN SIMULADO (PROTEÇÃO DE ROTA)
            // ------------------------------------------------------------------
            const sessionData = {
                authenticated: true,
                user: usernameVal,
                // Define o token fictício e expiração para 2 horas a partir de agora
                token: "INDICADORES_AUTH_TOKEN_" + Math.random().toString(36).substr(2),
                expiresAt: Date.now() + (2 * 60 * 60 * 1000) 
            };

            const rememberMe = document.getElementById("remember-me").checked;
            const storage = rememberMe ? localStorage : sessionStorage;

            // Salva o estado da sessão de forma estruturada em JSON
            storage.setItem("indicadores_user_session", JSON.stringify(sessionData));

            if (rememberMe) {
                localStorage.setItem("remembered_user", usernameVal);
            } else {
                localStorage.removeItem("remembered_user");
            }

            // Sucesso e Redirecionamento para a URL do GitHub Pages ou local
            showToast("Acesso autorizado! Redirecionando...", "success");

            setTimeout(() => {
                // Redireciona para a página oficial do projeto no GitHub Pages
                window.location.href = "https://geanclm.github.io/indicadores/indicadores.html";
            }, 1000);

        } else {
            // Falha na Autenticação
            setLoading(false);
            showToast("Usuário ou senha inválidos.", "error");
            passwordInput.value = "";
            passwordInput.focus();
        }
    }, 1200);
});

    /**
     * Botão Limpar: Reseta os campos e os estados visuais
     */
    btnClear.addEventListener("click", () => {
        loginForm.reset();
        clearInputErrors();
        hideToast();
        usernameInput.focus();
    });

    /**
     * Botão do Olho: Alterna a visibilidade da senha
     */
    togglePasswordBtn.addEventListener("click", () => {
        const isPassword = passwordInput.getAttribute("type") === "password";
        passwordInput.setAttribute("type", isPassword ? "text" : "password");
        
        const icon = togglePasswordBtn.querySelector("i");
        icon.className = isPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    });

    /**
     * Link Esqueci Minha Senha
     */
    forgotPasswordLink.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("Para redefinir sua senha, entre em contato com o suporte corporativo.", "error");
    });

    /**
     * Limpa o estado de erro ao digitar nos campos
     */
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener("input", () => {
            if (input.parentElement.classList.contains("input-error")) {
                clearInputErrors();
                hideToast();
            }
        });
    });

    // ----------------------------------------------------------------------
    // 6. INICIALIZAÇÃO
    // ----------------------------------------------------------------------
    const savedUser = localStorage.getItem("remembered_user");
    if (savedUser) {
        usernameInput.value = savedUser;
        document.getElementById("remember-me").checked = true;
        passwordInput.focus();
    } else {
        usernameInput.focus();
    }
});