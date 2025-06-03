const areaProdutos = document.getElementById('AreaProdutos');

fetch('http://localhost:3000/produtos')
  .then(res => res.json())
  .then(produtos => {
    produtos.forEach(produto => {
      const produtoEl = document.createElement('a');
      produtoEl.className = 'Produto';
      produtoEl.href = `produto.html?id=${produto._id}`;

      produtoEl.innerHTML = `
        <div class="FundoProduto">
          <img src="${produto.imagem}" alt="${produto.nome}">
        </div>
        <div class="DetalhesProdutos">
          <span>${produto.nome}</span>
          <span>R$ ${produto.preco.toFixed(2)}</span>
          <div class="ButtonProduto">
          <img src="img/cesta.svg" alt="Cesta de compras">
          <span>Comprar</span>
          </div>
        </div>
      `;

      areaProdutos.appendChild(produtoEl);
    });
  })
  .catch(err => console.error('Erro ao carregar produtos:', err));