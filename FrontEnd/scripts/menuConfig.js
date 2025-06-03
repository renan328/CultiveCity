const gearIcon = document.getElementById('gearIcon');
const menuOpcoes = document.getElementById('menuOpcoes');

gearIcon.addEventListener('click', () => {
  menuOpcoes.classList.toggle('show');
});


// Editar Perfil
document.getElementById('editarPerfil').addEventListener('click', () => {
  window.location.href = '../editarperfil/editar.html';
});

// Sair
document.getElementById('sairConta').addEventListener('click', () => {
  localStorage.removeItem('token');
  alert('Sessão encerrada!');
  window.location.href = '../login/login.html';
});

// Excluir Conta
document.getElementById('excluirConta').addEventListener('click', async () => {
  if (confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
    const token = localStorage.getItem('token');

    try {
      const resposta = await fetch('http://localhost:3000/usuarios/me', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!resposta.ok) {
        alert('Erro ao excluir conta.');
        return;
      }

      localStorage.removeItem('token');
      alert('Conta excluída com sucesso.');
      window.location.href = '../login/login.html';
    } catch (err) {
      console.error(err);
      alert('Erro de rede ao excluir conta.');
    }
  }
});