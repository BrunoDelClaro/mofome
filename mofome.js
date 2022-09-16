let compras = [];
/* 
  Função responsável por inciar os dados lendo do LocalStorage,
  apresentar os dados na tela inicial e atribuir as funções de evento a cada item do resto da aplicação.
*/
onload = () => {
  const t = JSON.parse(localStorage.getItem('compras'));
  if (t) compras = t;
  mostraCompras();
  document.querySelector('#inputName').oninput = monitoraCampoNomeAdic;
  document.querySelector('#inputNum').oninput = monitoraCampoQuantidadeAdic
  document.querySelector('#inputAlteraNome').oninput = monitoraCampoAltName;
  document.querySelector('#inputAlteraNum').oninput = monitoraCampoAltQuantidade;
  document.querySelector('#inputName').onkeypress = (e) => {
    if (e.key == 'Enter') adicionaCompra();
  };
  document.querySelector('#inputAlteraNome').onkeypress = (e) => {
    if (e.key == 'Enter') alteraCompra();
  };

  document.querySelector('#btnAdic').onclick = () => {
    document.querySelector('#btnInc').disabled = true;
    ativa('tela2');
    document.querySelector('#inputName').focus();
  };

  if(compras.length <= 0){
    document.querySelector('#btnClear').classList.add('hidden')
  }

  document.querySelector('#btnClear').onclick = () => {
    compras = [];
    document.querySelector('#btnClear').classList.add('hidden');
    salvaCompras();
    mostraCompras();
  };

  document.querySelector('#btnCanc1').onclick = () => {
    document.querySelector('#inputName').value = '';
    ativa('tela1');
  };

  document.querySelector('#btnCanc2').onclick = () => {
    let campo = document.querySelector('#inputAlteraNome');
    campo.value = '';
    campo.removeAttribute('data-id');
    ativa('tela1');
  };

  document.querySelector('#btnInc').onclick = () => {
    adicionaCompra();
  };

  document.querySelector('#btnAlt').onclick = () => {
    alteraCompra();
  };

  document.querySelector('#btnDel').onclick = () => {
    apagaCompra();
  };
};
/*
  Função para apresentar na tela inicial todos os itens, ela monta cada objeto que representa um produto
  e apresenta ele na tela com os devidos recursos. Isso inclui a atribuição das funções de evento.
*/
const mostraCompras = () => {
  const listaDeCompras = document.querySelector('#listaDeCompras');
  listaDeCompras.innerHTML = '';
  compras.forEach((t) => {
    let elemCompra = document.createElement('li');
    let elemGroup = document.createElement('div');
    let elemRow = document.createElement('div');
    let elemName = document.createElement('h3');
    let elemDesc = document.createElement('h4');
    let elemNum = document.createElement('div');
    let elemBtn = document.createElement('button');

    elemBtn.classList.add('button','half','light')
    elemGroup.classList.add('groupList');
    elemRow.classList.add('groupRow');
    elemNum.classList.add('badgeList','half');
    
    
    elemName.innerHTML = t.name;
    elemDesc.innerHTML = t.descricao;
    elemNum.innerHTML = `<span>${t.quantidade}<\span>`;
    elemBtn.innerHTML = 'Alterar'

    let aux = parseInt(t.quantidade)

    if(aux <= 0 || isNaN(aux)){
      console.log("Zerado")
      
      elemNum.classList.add('hidden');
      elemNum.classList.remove('badgeList')
    }

    elemGroup.appendChild(elemName);
    elemGroup.appendChild(elemDesc);
    elemRow.appendChild(elemNum);
    elemRow.appendChild(elemBtn)
    elemCompra.appendChild(elemGroup);
    elemCompra.appendChild(elemRow);

    console.log(elemCompra.innerHTML);
    elemCompra.setAttribute('data-id', t.id);


    let i = compras.findIndex((x) => x.id == t.id);
    if(compras[i].comprado){
      elemCompra.classList.add('completed');
    }else{
      elemCompra.classList.remove('completed');
    }

    elemBtn.onclick = () => {
      let nome = document.querySelector('#inputAlteraNome');
      let desc = document.querySelector('#inputAlteraDesc');
      let quant = document.querySelector('#inputAlteraNum');
      ativa('tela3');
      nome.value = t.name;
      desc.value = t.descricao;
      quant.value = t.quantidade;
      nome.setAttribute('data-id', t.id);
      nome.focus();

    }

    elemCompra.ondblclick = () => {
      let i = compras.findIndex((x) => x.id == t.id);
      if(compras[i].comprado){
        elemCompra.classList.remove('completed');
        compras[i].comprado = false;
      }else{
        elemCompra.classList.add('completed');
        compras[i].comprado = true;
      }
      
      salvaCompras();

    };

    

    listaDeCompras.appendChild(elemCompra);
  });
  document.querySelector('#estado').innerText = compras.length;
  if (compras.length > 0) {
    listaDeCompras.classList.remove('hidden');
    document.querySelector('#blank').classList.add('hidden');
    document.querySelector('#btnClear').classList.remove('hidden');
  } else {
    listaDeCompras.classList.add('hidden');
    document.querySelector('#blank').classList.remove('hidden');
  }
};


/*
  Adiciona a classe de ativo para uma tela especifica e esconde as outras
*/
const ativa = (comp) => {
  let listaDeTelas = document.querySelectorAll('body > .component');
  listaDeTelas.forEach((c) => c.classList.add('hidden'));
  document.querySelector('#' + comp).classList.remove('hidden');
};

/*
  Adiciona um produto na lista e salva esse dados no LocalStorage;
*/
const adicionaCompra = () => {
  let pname = document.querySelector('#inputName');
  let desc = document.querySelector('#inputDesc');
  let quant = document.querySelector('#inputNum');
  let name = pname.value;
  let descricao = desc.value;
  let quantidade = quant.value;
   
  if (name != '') {
    compras.push({
      id: Math.random().toString().replace('0.', ''),
      name: name,
      descricao: descricao,
      quantidade: quantidade,
      comprado: false
    });
    pname.value = '';
    desc.value = '';
    quant.value = '';
    pname.classList.remove('invalid','valid')
    desc.classList.remove('invalid','valid')
    quant.classList.remove('invalid','valid')
    ativa('tela1');
    salvaCompras();
    mostraCompras();
  }
};
/*
  Função do evento de input, ele monitora e valida os dados inseridos
  no campo de nome na tela de adição de produto.
*/
const monitoraCampoNomeAdic = (e) => {
  let botao = document.querySelector('#btnInc');
  let nome = document.querySelector('#inputName');
  let quant = document.querySelector('#inputNum');
  let quantidadeValue = parseInt(e.target.value);
  if (e.target.value.length > 0){
    botao.disabled = false;
    nome.classList.add('valid')
    nome.classList.remove('invalid')
  }else{
    botao.disabled = true;
    
    nome.classList.add('invalid')

  }
};

/*
  Função do evento de input, ele monitora e valida os dados inseridos
  no campo de quantidade na tela de adição de produto.
*/
const monitoraCampoQuantidadeAdic = (e) => {
  let botao = document.querySelector('#btnInc');
  let quant = document.querySelector('#inputNum');
  let quantidadeValue = parseInt(e.target.value);
  if ((quantidadeValue > 0 && quantidadeValue < 100000 && !isNaN(quantidadeValue)) || quant.value === ''){
    console.log("Valido")
    botao.disabled = false;
  }else{
    console.log("Invalido")
    quant.classList.add('valid')
    quant.classList.remove('invalid')
    botao.disabled = true;
    if(isNaN(quantidadeValue)){
      console.log('vermeio')
      
      quant.classList.add('invalid')
    }
  }
};

/*
  Altera um produto no LocalStorage de acordo com os dados inseridos nos respectivos campos
*/

const alteraCompra = () => {
  let nome = document.querySelector('#inputAlteraNome');
  let desc = document.querySelector('#inputAlteraDesc');
  let quant = document.querySelector('#inputAlteraNum');
  let idCompra = nome.getAttribute('data-id');
  let i = compras.findIndex((t) => t.id == idCompra);
  compras[i].name = nome.value;
  compras[i].descricao = desc.value;
  compras[i].quantidade = quant.value;
  nome.value = '';
  desc.value = '';
  quant.value = '';
  nome.classList.remove('invalid','valid')
  desc.classList.remove('invalid','valid')
  quant.classList.remove('invalid','valid')
  nome.removeAttribute('data-id');
  ativa('tela1');
  salvaCompras();
  mostraCompras();
};

/*
  Apaga um item do LocalStorage.
*/

const apagaCompra = () => {
  let campo = document.querySelector('#inputAlteraNome');
  let idCompra = campo.getAttribute('data-id');
  compras = compras.filter((t) => t.id != idCompra);
  campo.value = '';
  campo.removeAttribute('data-id');
  ativa('tela1');
  salvaCompras();
  mostraCompras();
};
/*
  Função do evento de input, ele monitora e valida os dados inseridos
  no campo de nome na tela de alteração de produto.
*/
const monitoraCampoAltName = (e) => {
  let botao = document.querySelector('#btnAlt');
  let nome = document.querySelector('#inputAlteraNome');
  if (e.target.value.length > 0){
    botao.disabled = false;
    nome.classList.add('valid')
    nome.classList.remove('invalid')
  }else{
    botao.disabled = true;
    console.log("Nome invalido")
    
    nome.classList.add('invalid')

  }

};
/*
  Função do evento de input, ele monitora e valida os dados inseridos
  no campo de quantidade na tela de alteração de produto.
*/
const monitoraCampoAltQuantidade = (e) => {
  let botao = document.querySelector('#btnAlt');
  let quant = document.querySelector('#inputAlteraNum');
  let quantidadeValue = parseInt(e.target.value)
  if (quantidadeValue > 0 && quantidadeValue < 100000 && !isNaN(quantidadeValue) || quant.value === ''){
    console.log("Valido")
    botao.disabled = false;
    quant.classList.add('valid')
    quant.classList.remove('invalid')
  }else{
    console.log("Invalido")
    botao.disabled = true;
    if(isNaN(quantidadeValue)){
      console.log('vermeio')
      quant.classList.add('invalid')
    }
  }
};


/*
  Salva os dados no LocalStorage.
*/

const salvaCompras = () => {
  localStorage.setItem('compras', JSON.stringify(compras));
};

/*
  Instalação do Service Worker
*/  
navigator.serviceWorker.register('./mofome-sw.js');

