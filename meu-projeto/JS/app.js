var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");
var body = document.querySelector("body");

// Função para mudar a classe do body
function changeBodyClass(className) {
    body.className = ""; // Remove qualquer classe existente
    body.classList.add(className); // Adiciona a nova classe
}

// Verifica se o botão de signin existe
if (btnSignin) {
    btnSignin.addEventListener("click", function () {
        changeBodyClass("sign-in-js");
    });
}

// Verifica se o botão de signup existe
if (btnSignup) {
    btnSignup.addEventListener("click", function () {
        changeBodyClass("sign-up-js");
    });
}


function togglePasswordVisibility(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(iconId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

document.getElementById('signup-confirm-password').addEventListener('input', function() {
    const password = document.getElementById('signup-password').value;
    const confirmPassword = this.value;

    if (confirmPassword !== password) {
        this.setCustomValidity("As senhas não correspondem.");
    } else {
        this.setCustomValidity(""); // Reseta a mensagem de erro
    }
});
