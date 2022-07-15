const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const Nome = document.querySelector("#nome");
const Telefone = document.querySelector("#telefone");
const Email = document.querySelector("#email");
const Cidade = document.querySelector("#cidade");
const btnSalvar = document.querySelector("#btnSalvar");

let itens;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (edit) {
    Nome.value = itens[index].nome;
    Telefone.value = itens[index].telefone;
    Email.value = itens[index].email;
    Cidade.value = itens[index].cidade;
    id = index;
  } else {
    Nome.value = "";
    Telefone.value = "";
    Email.value = "";
    Cidade.value = "";
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
  <td>${item.nome}</td>
  <td>${item.telefone}</td>
  <td>${item.email}</td>
  <td>${item.cidade}</td>
  <td class="acao">
  <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
  </td>
    <td class="acao">
    <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
    <td class="acao">
    <a href="https://api.whatsapp.com/send?phone=5511940028922&text=Envie%20sua%20mensagem!" class="whatssap"><i class="fa-brands fa-whatsapp"></i></a>
    </td>
    `;
  tbody.appendChild(tr);
}

btnSalvar.onclick = (e) => {
  if (
    Nome.value == "" ||
    Telefone.value == "" ||
    Email.value == "" ||
    Cidade.value == ""
  ) {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = Nome.value;
    itens[id].telefone = Telefone.value;
    itens[id].email = Email.value;
    itens[id].cidade = Cidade.value;
  } else {
    itens.push({
      nome: Nome.value,
      telefone: Telefone.value,
      email: Email.value,
      cidade: Cidade.value,
    });
  }

  setItensBD();

  modal.classList.remove("active");
  loadItens();
  id = undefined;
};

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = "";
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItensBD = () => JSON.parse(localStorage.getItem("dbfunc")) ?? [];
const setItensBD = () => localStorage.setItem("dbfunc", JSON.stringify(itens));

loadItens();
