document.getElementById('mostrarSenha').addEventListener('click', () => {
  document.getElementById('campoSenha').style.display = 'block';
});

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Usuário não autenticado!');
    window.location.href = '../login/login.html';
    return;
  }

  let userId = null;

  try {
    const res = await fetch('http://localhost:3000/usuarios/me', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      throw new Error('Erro ao buscar dados do usuário');
    }

    const user = await res.json();
    userId = user._id;

    if (user.cep) {
      const respostaCep = await fetch(`https://viacep.com.br/ws/${user.cep}/json/`);
      const dadosCep = await respostaCep.json();

      document.getElementById('estado').value = dadosCep.uf || '';
      document.getElementById('cidade').value = dadosCep.localidade || '';
      document.getElementById('bairro').value = dadosCep.bairro || '';
      document.getElementById('rua').value = dadosCep.logradouro || '';
    }


    document.querySelector('input[name="nome"]').value = user.nome || '';
    document.querySelector('input[name="sobrenome"]').value = user.sobrenome || '';
    document.querySelector('input[name="email"]').value = user.email || '';
    document.querySelector('select[name="plano"]').value = user.plano.toLowerCase() || '';
    document.querySelector('input[name="cep"]').value = user.cep || '';
    document.querySelector('input[name="numero"]').value = user.numerocasa || '';

  } catch (err) {
    console.error(err);
    alert('Erro ao carregar dados do usuário.');
  }

  document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.querySelector('input[name="nome"]').value;
    const sobrenome = document.querySelector('input[name="sobrenome"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const plano = document.querySelector('select[name="plano"]').value;
    const cep = document.querySelector('input[name="cep"]').value;
    const numerocasa = document.querySelector('input[name="numero"]').value;

    const senhaAtualInput = document.querySelector('input[name="senha_atual"]');
    const novaSenhaInput = document.querySelector('input[name="nova_senha"]');
    const confirmarSenhaInput = document.querySelector('input[name="confirmar_senha"]');

    const senhaAtual = senhaAtualInput ? senhaAtualInput.value : null;
    const novaSenha = novaSenhaInput ? novaSenhaInput.value : null;
    const confirmarSenha = confirmarSenhaInput ? confirmarSenhaInput.value : null;

    const updateData = { nome, sobrenome, email, plano, cep, numerocasa };

    if (novaSenha || confirmarSenha) {
      if (!senhaAtual) {
        alert('Por favor, informe sua senha atual para alterar a senha.');
        return;
      }
      if (novaSenha !== confirmarSenha) {
        alert('As novas senhas não coincidem!');
        return;
      }

      updateData.senha = novaSenha;
      updateData.senhaAtual = senhaAtual;
    }

    try {
      const res = await fetch(`http://localhost:3000/usuarios/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!res.ok) {
        const erro = await res.json();
        throw new Error(erro.message || 'Erro ao atualizar usuário');
      }

      alert('Perfil atualizado com sucesso!');
      window.location.href = '../perfil/perfil.html'; 
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar: ' + err.message);
    }
  });
});