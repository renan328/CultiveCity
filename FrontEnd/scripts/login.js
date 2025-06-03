document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const resposta = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      alert('Erro ao fazer login: ' + erro.message);
      return;
    }

    const { access_token } = await resposta.json();
    localStorage.setItem('token', access_token);
    window.location.href = '../perfil/perfil.html';
  } catch (err) {
    console.error(err);
    alert('Erro de rede ao tentar fazer login.');
  }
});