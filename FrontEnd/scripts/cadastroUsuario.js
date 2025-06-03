const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = form.nome.value;
  const sobrenome = form.sobrenome.value;
  const email = form.email.value;
  const senha = form.senha.value;
  const confirmarSenha = form.confirmar_senha.value;
  const plano = form.plano.value;
  const cep = form.cep.value;
  const numerocasa = form.numero.value;

  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
  }

  const usuario = {
    nome,
    sobrenome,
    email,
    senha,
    plano,
    cep,
    numerocasa,
  };

  try {
    const response = await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const erro = await response.json();
      alert('Erro ao cadastrar: ' + erro.message);
      return;
    }

    alert('Usuário cadastrado com sucesso!');
    window.location.href = './login/login.html';
  } catch (err) {
    console.error('Erro na requisição:', err);
    alert('Erro ao conectar com o servidor.');
  }
});