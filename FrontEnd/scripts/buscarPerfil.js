async function carregarPerfil() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Você precisa estar logado!');
    window.location.href = 'login.html';
    return;
  }

  try {
    const resposta = await fetch('http://localhost:3000/usuarios/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!resposta.ok) {
      alert('Sessão expirada. Faça login novamente.');
      localStorage.removeItem('token');
      window.location.href = '../login/login.html';
      return;
    }

    const usuario = await resposta.json();
    document.getElementById('userName').textContent = usuario.nome;
    document.getElementById('userPlan').textContent = `Plano: ${usuario.plano}`;

    document.getElementById('cep').value = usuario.cep || '';
    document.getElementById('numero').value = usuario.numerocasa || '';

    if (usuario.cep) {
      const respostaCep = await fetch(`https://viacep.com.br/ws/${usuario.cep}/json/`);
      const dadosCep = await respostaCep.json();

      document.getElementById('estado').value = dadosCep.uf || '';
      document.getElementById('cidade').value = dadosCep.localidade || '';
      document.getElementById('bairro').value = dadosCep.bairro || '';
      document.getElementById('rua').value = dadosCep.logradouro || '';
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao carregar perfil.');
  }
}

carregarPerfil();