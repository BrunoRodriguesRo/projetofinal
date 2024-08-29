document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  
  // Simulando credenciais corretas
  const isAuthenticated = true;

  if (isAuthenticated) {
      // Se as credenciais estiverem corretas, redireciona
      window.location.href = 'login.html';
  } else {
      // Exibe uma mensagem de erro
      document.getElementById('errorMessage').innerText = 'Credenciais inválidas. Por favor, tente novamente.';
  }
});
