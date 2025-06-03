const areaProdutos = document.getElementById('AreaProdutos');

fetch('http://localhost:3000/produtos')
  .then(res => res.json())
  .then(produtos => {
    produtos.forEach(produto => {
      const produtoEl = document.createElement('div');
      produtoEl.className = 'Produto';

      produtoEl.innerHTML = `
        <div class="FundoProduto">
          <img src="${produto.imagem}" alt="${produto.nome}">
        </div>
        <div class="DetalhesProdutos">
          <span>${produto.nome}</span>
          <span>R$ ${produto.preco.toFixed(2)}</span>
        </div>
        <div class="acoes">
          <button class="editar">
            <a href="../EditarProduto/Editar.html?id=${produto._id}">Editar</a>
          </button>
          <button class="excluir" data-id="${produto._id}">
            Excluir
          </button>
        </div>
      `;

      areaProdutos.appendChild(produtoEl);
    });

    document.querySelectorAll('.excluir').forEach(botao => {
      botao.addEventListener('click', async () => {
        const id = botao.getAttribute('data-id');
        const confirmar = confirm('Tem certeza que deseja excluir este produto?');

        if (confirmar) {
          try {
            const resposta = await fetch(`http://localhost:3000/produtos/${id}`, {
              method: 'DELETE'
            });

            if (!resposta.ok) throw new Error('Erro ao excluir produto');

            alert('Produto excluído com sucesso!');
            location.reload();
          } catch (err) {
            console.error('Erro ao excluir:', err);
            alert('Erro ao excluir produto.');
          }
        }
      });
    });
  })
  .catch(err => console.error('Erro ao carregar produtos:', err));
