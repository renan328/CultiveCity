const urlParams = new URLSearchParams(window.location.search);
const produtoId = urlParams.get('id');

if (produtoId) {
  fetch(`http://localhost:3000/produtos/${produtoId}`)
    .then(res => res.json())
    .then(produto => {
      document.getElementById('produto-imagem').src = produto.imagem;
      document.getElementById('produto-imagem').alt = produto.nome;
      document.getElementById('produto-nome').textContent = produto.nome;
      document.getElementById('produto-descricao').textContent = produto.descricao;
      document.getElementById('produto-preco').textContent = `R$ ${produto.preco.toFixed(2)}`;
      document.getElementById('ProdutoEspecifico').classList.add('loaded');
    })
    .catch(err => {
      console.error('Erro ao buscar produto:', err);
      document.getElementById('DetalhesProduto').innerHTML = '<p>Produto não encontrado.</p>';
    });
} else {
  document.getElementById('produto-nome').textContent = "ID do produto não informado.";
}