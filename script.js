document.addEventListener('DOMContentLoaded', function () {
    // Função para o campo de CEP
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('blur', function () {
            const cep = this.value.replace(/\D/g, '');

            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => {
                        if (!response.ok) throw new Error('CEP não encontrado!');
                        return response.json();
                    })
                    .then(data => {
                        if (data.erro) {
                            alert('CEP não encontrado!');
                            return;
                        }

                        document.getElementById('rua').value = data.logradouro || '';
                        document.getElementById('bairro').value = data.bairro || '';
                        document.getElementById('cidade').value = data.localidade || '';
                        document.getElementById('estado').value = data.uf || '';
                    })
                    .catch(error => {
                        console.error('Erro ao buscar o CEP:', error);
                        alert('Erro ao buscar o CEP. Tente novamente.');
                    });
            } else {
                alert('Digite um CEP válido!');
            }
        });
    } else {
        console.warn('Elemento com id="cep" não encontrado.');
    }

    // Função para o slider
    let count = 1;
    const radio1 = document.getElementById("radio1");
    if (radio1) {
        radio1.checked = true;

        setInterval(function () {
            nextImage();
        }, 4000);

        function nextImage() {
            count++;
            if (count > 4) {
                count = 1;
            }

            const radio = document.getElementById("radio" + count);
            if (radio) {
                radio.checked = true;
            }
        }
    } else {
        console.warn('Elemento com id="radio1" não encontrado.');
    }
});
