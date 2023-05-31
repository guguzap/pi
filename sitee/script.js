const form = document.getElementById('formEstoque');
const listaEstoque = document.getElementById('listaEstoque');
const listaSaida = document.getElementById('listaSaida');
const buscaCodigoInput = document.getElementById('buscaCodigo');
const botaoBuscar = document.getElementById('botaoBuscar');
const valorTotalSaida = document.getElementById('valorTotalSaida');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const codigoProduto = document.getElementById('codigoProduto').value;
  const nomeProduto = document.getElementById('nomeProduto').value;
  const quantidadeProduto = document.getElementById('quantidadeProduto').value;
  const valorProduto = document.getElementById('valorProduto').value;

  adicionarProduto(codigoProduto, nomeProduto, quantidadeProduto, valorProduto);

  form.reset();
});

botaoBuscar.addEventListener('click', () => {
  const codigoBusca = buscaCodigoInput.value;
  filtrarEstoquePorCodigo(codigoBusca);
});

function adicionarProduto(codigo, nome, quantidade, valor) {
  const li = document.createElement('li');
  li.dataset.codigo = codigo;

  const codigoSpan = document.createElement('span');
  codigoSpan.textContent = `Código: ${codigo}`;
  li.appendChild(codigoSpan);

  const nomeSpan = document.createElement('span');
  nomeSpan.textContent = `Nome: ${nome}`;
  li.appendChild(nomeSpan);

  const quantidadeSpan = document.createElement('span');
  quantidadeSpan.textContent = `Quantidade: ${quantidade} unidades`;
  li.appendChild(quantidadeSpan);

  const valorSpan = document.createElement('span');
  valorSpan.textContent = `Valor unitário: R$ ${valor}`;
  li.appendChild(valorSpan);

  const valorTotal = quantidade * valor;
  const valorTotalSpan = document.createElement('span');
  
  li.appendChild(valorTotalSpan);

  const botaoRemover = document.createElement('button');
  botaoRemover.textContent = 'Remover';
  botaoRemover.addEventListener('click', () => {
    removerUnidade(codigo, valor);
  });
  li.appendChild(botaoRemover);

  listaEstoque.appendChild(li);
}

function removerUnidade(codigo, valorUnitario) {
  const itemEstoque = document.querySelector(`[data-codigo="${codigo}"]`);
  const quantidadeSpan = itemEstoque.querySelector('span:nth-child(3)');
  let quantidade = parseInt(quantidadeSpan.textContent.split(' ')[1]);
  quantidade--;

  if (quantidade > 0) {
    quantidadeSpan.textContent = `Quantidade: ${quantidade} unidades`;
  } else {
    itemEstoque.remove();
  }

  const valorTotal = quantidade * valorUnitario;
  const valorTotalSpan = itemEstoque.querySelector('span:nth-child(5)');
  

  registrarSaida(codigo, quantidade, valorUnitario);
  atualizarValorTotalSaida();
}

function registrarSaida(codigo, quantidade, valorUnitario) {
  const itemEstoque = document.querySelector(`[data-codigo="${codigo}"]`);
  const nome = itemEstoque.querySelector('span:nth-child(2)').textContent.split(': ')[1];

  const li = document.createElement('li');

  const codigoSpan = document.createElement('span');
  codigoSpan.textContent = `Código: ${codigo}`;
  li.appendChild(codigoSpan);

  const nomeSpan = document.createElement('span');
  nomeSpan.textContent = `Nome: ${nome}`;
  li.appendChild(nomeSpan);

  const quantidadeSpanSaida = document.createElement('span');
  quantidadeSpanSaida.textContent = `Quantidade restante: ${quantidade} unidades`;
  li.appendChild(quantidadeSpanSaida);

  const valorTotalSaida = quantidade * valorUnitario;
  const valorTotalSaidaSpan = document.createElement('span');
  valorTotalSaidaSpan.textContent = `Valor do restante em estoque: R$ ${valorTotalSaida} (Saída)`;
  li.appendChild(valorTotalSaidaSpan);

  listaSaida.appendChild(li);
}

function filtrarEstoquePorCodigo(codigo) {
  const itensEstoque = listaEstoque.getElementsByTagName('li');

  for (let i = 0; i < itensEstoque.length; i++) {
    const item = itensEstoque[i];
    const codigoItem = item.querySelector('span').textContent.split(': ')[1];

    if (codigoItem === codigo) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  }
}

function atualizarValorTotalSaida() {
  const itensSaida = listaSaida.getElementsByTagName('li');
  let valorTotal = 0;

  for (let i = 0; i < itensSaida.length; i++) {
    const item = itensSaida[i];
    const valorUnitario = parseFloat(item.querySelector('span:nth-child(4)').textContent.split(' ')[2]);

    valorTotal += valorUnitario;
  }

  valorTotalSaida.textContent = `Valor total da saída: R$ ${valorTotal.toFixed(2)}`;
}
