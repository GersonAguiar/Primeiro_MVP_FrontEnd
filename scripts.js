/*
  --------------------------------------------------------------------------------------
  Construção da Função "getList" para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/cliente';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.clientes.forEach(item => insertList(item.nome, item.numeroCPF, item.valor))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função "getList" para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Construção da Função "postItem" para adicionar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputClient, inputCPF, inputValor) => {
  const formData = new FormData();
  formData.append('nome', inputClient);
  formData.append('numeroCPF', inputCPF);
  formData.append('valor', inputValor);

  let url = 'http://127.0.0.1:5000/cliente';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Construção da Função "insertButton" para criar um botão de eliminação dos itens da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Construção da Função para remover um item da lista com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Cliente Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Construção de Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/cliente?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Construção de Função "newItem" para adicionar um novo cliente com nome, CPF e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputClient = document.getElementById("newClient").value;
  let inputCPF = document.getElementById("newCPF").value;
  let inputValor = document.getElementById("newValor").value;

  if (inputClient === '') {
    alert("Escreva o nome do cliente!");
  } else if (isNaN(inputCPF) || isNaN(inputValor)) {
    alert("Quantidade e valor precisam ser números!");
  } else {
    insertList(inputClient, inputCPF, inputValor)
    postItem(inputClient, inputCPF, inputValor)
    alert("Cliente adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Criação da Função "insertList" para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameClient, cpf, valor) => {
  var item = [nameClient, cpf, valor]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newClient").value = "";
  document.getElementById("newCPF").value = "";
  document.getElementById("newValor").value = "";

  removeElement()
}