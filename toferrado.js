let compras = [];

onload = () => {
  const t = JSON.parse(localStorage.getItem('tarefas'));
  if (t) compras = t;
  mostraTarefas();
  document.querySelector('#inputName').oninput = monitoraCampoAdic;
  document.querySelector('#inputAlteraTarefa').oninput = monitoraCampoAlt;
  document.querySelector('#inputName').onkeypress = (e) => {
    if (e.key == 'Enter') adicionaCompra();
  };
  document.querySelector('#inputAlteraTarefa').onkeypress = (e) => {
    if (e.key == 'Enter') alteraTarefa();
  };

  document.querySelector('#btnAdic').onclick = () => {
    document.querySelector('#btnInc').disabled = true;
    ativa('tela2');
    document.querySelector('#inputName').focus();
  };

  document.querySelector('#btnCanc1').onclick = () => {
    document.querySelector('#inputName').value = '';
    ativa('tela1');
  };

  document.querySelector('#btnCanc2').onclick = () => {
    let campo = document.querySelector('#inputAlteraTarefa');
    campo.value = '';
    campo.removeAttribute('data-id');
    ativa('tela1');
  };

  document.querySelector('#btnInc').onclick = () => {
    adicionaCompra();
  };

  document.querySelector('#btnAlt').onclick = () => {
    alteraTarefa();
  };

  document.querySelector('#btnDel').onclick = () => {
    apagaTarefa();
  };
};

const mostraTarefas = () => {
  const listaDeTarefas = document.querySelector('#listaDeTarefas');
  listaDeTarefas.innerHTML = '';
  compras.forEach((t) => {
    let elemTarefa = document.createElement('li');
    let elemGroup = document.createElement('div');

    elemGroup.classList.add('groupList')

    let elemName = document.createElement('h3');
    let elemDesc = document.createElement('h4');
    let elemNum = document.createElement('div');

    elemNum.classList.add('badgeList');
    
    
    elemName.innerHTML = t.name;
    elemDesc.innerHTML = t.descricao;
    elemNum.innerHTML = `<span>${t.quantidade}<\span>`;

    let aux = parseInt(t.quantidade)

    if(aux <= 0 || isNaN(aux)){
      console.log("Zerado")
      elemNum.classList.add('hidden');
    }

    elemGroup.appendChild(elemName);
    elemGroup.appendChild(elemDesc);
    elemTarefa.appendChild(elemGroup);
    elemTarefa.appendChild(elemNum);
    //elemTarefa.appendChild(elemName);
    //elemTarefa.appendChild(elemDesc);
    console.log(elemTarefa.innerHTML);
    elemTarefa.setAttribute('data-id', t.id);
    elemTarefa.onclick = () => {
      let campo = document.querySelector('#inputAlteraTarefa');
      ativa('tela3');
      campo.value = t.descricao;
      campo.setAttribute('data-id', t.id);
      campo.focus();
    };
    listaDeTarefas.appendChild(elemTarefa);
  });
  document.querySelector('#estado').innerText = compras.length;
  if (compras.length > 0) {
    listaDeTarefas.classList.remove('hidden');
    document.querySelector('#blank').classList.add('hidden');
  } else {
    listaDeTarefas.classList.add('hidden');
    document.querySelector('#blank').classList.remove('hidden');
  }
};

const ativa = (comp) => {
  let listaDeTelas = document.querySelectorAll('body > .component');
  listaDeTelas.forEach((c) => c.classList.add('hidden'));
  document.querySelector('#' + comp).classList.remove('hidden');
};

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
      quantidade: quantidade
    });
    name.value = '';
    descricao.value = '';
    quantidade.value = '';
    ativa('tela1');
    salvaTarefas();
    mostraTarefas();
  }
};

const monitoraCampoAdic = (e) => {
  let botao = document.querySelector('#btnInc');
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

const alteraTarefa = () => {
  let campo = document.querySelector('#inputAlteraTarefa');
  let idTarefa = campo.getAttribute('data-id');
  let i = compras.findIndex((t) => t.id == idTarefa);
  compras[i].descricao = campo.value;
  campo.value = '';
  campo.removeAttribute('data-id');
  ativa('tela1');
  salvaTarefas();
  mostraTarefas();
};

const apagaTarefa = () => {
  let campo = document.querySelector('#inputAlteraTarefa');
  let idTarefa = campo.getAttribute('data-id');
  compras = compras.filter((t) => t.id != idTarefa);
  campo.value = '';
  campo.removeAttribute('data-id');
  ativa('tela1');
  salvaTarefas();
  mostraTarefas();
};

const monitoraCampoAlt = (e) => {
  let botao = document.querySelector('#btnAlt');
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

const salvaTarefas = () => {
  localStorage.setItem('tarefas', JSON.stringify(compras));
};
