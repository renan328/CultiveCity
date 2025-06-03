const form = document.getElementById('form-produto');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const descricao = document.getElementById('descricao').value;
  const imagem = document.getElementById('imagemUrl').value;
  const disponivel = true;

  const produto = { nome, descricao, imagem, preco, disponivel };

  try {
    const response = await fetch('http://localhost:3000/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto),
    });

    if (!response.ok) throw new Error('Erro ao cadastrar produto');

    const resultado = await response.json();
    alert('Produto cadastrado com sucesso!');
    form.reset();

  } catch (error) {
    console.error(error);
    alert('Erro ao cadastrar produto!');
  }
});