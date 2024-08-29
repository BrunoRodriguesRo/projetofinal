document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Verifica se o e-mail já está registrado
    if (localStorage.getItem(email)) {
        document.getElementById('errorMessage').innerText = 'Este e-mail já está registrado. Por favor, faça login.';
    } else {
        // Salva o e-mail e a senha no localStorage
        localStorage.setItem(email, password);
        document.getElementById('errorMessage').innerText = 'Registro realizado com sucesso. Agora você pode fazer login.';
        
        // Redireciona para a página de login
        window.location.href = 'login.html';
    }
});
