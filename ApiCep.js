function mostrarConsultaCep() {
    var cover = document.getElementById('cepCover');
    cover.style.display = 'none'; // Esconde a capa
}
function toggleCepBox(show) {
    var overlay = document.getElementById('cepOverlay');
    var closeButton = document.getElementById('closeButton');
    if (show) {
        overlay.style.display = 'none'; // Esconde a capa
        closeButton.style.display = 'block'; // Mostra o botão Sair
    } else {
        overlay.style.display = 'flex'; // Mostra a capa
        closeButton.style.display = 'none'; // Esconde o botão Sair
    }
}
function buscarCep() {
    var cep = document.getElementById('cepInput').value;
    var url = 'https://viacep.com.br/ws/' + cep + '/json/';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById('resultadoCep').innerHTML = 'CEP não encontrado.';
            } else {
                document.getElementById('resultadoCep').innerHTML =
                    'Endereço: ' + data.logradouro + '<br>' +
                    'Bairro: ' + data.bairro + '<br>' +
                    'Cidade: ' + data.localidade + '<br>' +
                    'Estado: ' + data.uf;
            }
        })
        .catch(error => {
            document.getElementById('resultadoCep').innerHTML = 'Erro ao buscar o CEP.';
        });
}




