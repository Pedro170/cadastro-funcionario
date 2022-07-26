const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#nome')
const sFuncao = document.querySelector('#funcao')
const sSalario = document.querySelector('#salario')
const btnSave = document.querySelector('.btn')

let itens, id;

function openModal( edit = false, index = 0 ) {
  const close = document.querySelector('.fa-times')
  modal.classList.add('mostrar')

  close.addEventListener('click', () => {
    modal.classList.remove('mostrar')
  })

  if( edit ) {
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    id = index

  } else {
    sNome.value = ''
    sFuncao.value = ''
    sSalario.value = ''
  }

}

function insertItem( item, index ) {
  let tr = document.createElement( 'tr' )

  tr.innerHTML = `
    <tr><td>${ item.nome }</td></tr>
    <tr><td>${ item.funcao }</td></tr>
    <tr><td>R$ ${ item.salario }</td></tr>
    <tr>
      <td class="action">
        <button class="btnAction" onClick="editItem(${ index })">
          <i class="fas fa-edit"></i>
        </button>
      </td>
    </tr>

    <tr>
      <td class="action">
        <button class="btnAction" onClick="deletedItem(${ index })">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  `

  tbody.appendChild( tr )
}

function editItem( index ) {
  openModal( true, index )
}

function deletedItem( index ) {
  itens.splice( index, 1 )
  setItensBD()
  loadingItens()
  confirm("Este item será apagado");
  location.reload()
}

btnSave.addEventListener('click', ( event ) => {
  if( sNome.value == '' || sFuncao.value == '' || sSalario.value == '' ) {
    return
  }

  event.preventDefault();

  if( id !== undefined ) {
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value

  } else {
    itens.push({ 'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value })
  }

  setItensBD()

  modal.classList.remove('mostrar')
  loadingItens()
  location.reload()
  id = undefined;
})

const loadingItens = () => {
  itens = getItensBD();
  itens.forEach(( item, index ) => {
    insertItem( item, index )
  })
}

const getItensBD = () => JSON.parse( localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify( itens ))

loadingItens()
