document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Verifica as credenciais
  const savedPassword = localStorage.getItem(email);

  if (savedPassword) {
      if (password === savedPassword) {
          // Se as credenciais estiverem corretas, salva o estado de autenticação e redireciona
          localStorage.setItem('authenticated', 'true');
          window.location.href = 'dashboard.html';
      } else {
          document.getElementById('errorMessage').innerText = 'Senha incorreta. Por favor, tente novamente.';
      }
  } else {
      document.getElementById('errorMessage').innerText = 'Credenciais inválidas. Por favor, verifique o e-mail e a senha.';
  }
});
