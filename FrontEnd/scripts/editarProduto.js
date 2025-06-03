const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const form = document.querySelector('form');

fetch(`http://localhost:3000/produtos/${id}`)
    .then(res => res.json())
    .then(produto => {
        form.nome.value = produto.nome || '';
        form.preco.value = produto.preco || '';
        form.descricao.value = produto.descricao || '';
        form.imagemUrl.value = produto.imagem || '';
    })
    .catch(err => {
        console.error('Erro ao buscar produto:', err);
        alert('Erro ao carregar produto.');
    });

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dadosAtualizados = {
        nome: form.nome.value,
        preco: parseFloat(form.preco.value),
        descricao: form.descricao.value,
        imagem: form.imagemUrl.value
    };

    try {
        const resposta = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (!resposta.ok) throw new Error('Erro ao editar');

        alert('Produto atualizado com sucesso!');
        window.location.href = `../AcoesProdutos/AcoesProdutos.html`;
    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        alert('Erro ao atualizar produto.');
    }
});