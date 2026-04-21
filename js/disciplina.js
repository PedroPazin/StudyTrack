<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#sec-disciplinas form');
  const listItems = document.querySelector('#sec-disciplinas .lista-itens');

  let disciplinas =
    JSON.parse(localStorage.getItem('studytrack_disciplinas')) || [];

  const salvarEDesenhar = () => {
    localStorage.setItem('studytrack_disciplinas', JSON.stringify(disciplinas));
    renderizarLista();
  };

  const renderizarLista = () => {
    listItems.innerHTML = '';
    if (disciplinas.length === 0) {
      listItems.innerHTML =
        '<p class="small-text">Nenhuma disciplina cadastrada.</p>';
      return;
    }

    disciplinas.forEach((disc, index) => {
      const card = document.createElement('div');
      card.className = 'item-lista';
      card.setAttribute('data-id', 'discipline');
      card.setAttribute('data-nome', disc.nome);
      card.setAttribute('data-discipline-nome', disc.nome);

      card.style.backgroundColor = '#e65c5c';
      card.style.borderLeft = '6px solid #e65c5c';
      card.innerHTML = `
        <div>
          <strong style="color: white;">${disc.nome}</strong>
          <p style="color: white; font-size: 0.85rem; margin-top: 4px;">Meta: ${disc.carga} horas</p>
        </div>
        <button type="button" class="remover-btn" onclick="removerDisc(${index})" style="background:white; color:#e65c5c">Remover</button>
      `;
      listItems.appendChild(card);
    });
  };

  window.removerDisc = (index) => {
    disciplinas.splice(index, 1);
    salvarEDesenhar();
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = form.querySelector('input[placeholder="ex: Cálculo I"]').value;
    const carga = form.querySelector('input[type="number"]').value;

    if (!nome || !carga) return alert('Preencha todos os campos');

    disciplinas.push({ nome, carga: parseFloat(carga) });
    salvarEDesenhar();
    form.reset();
  });

  renderizarLista();
=======
const inputDiscipline = document.querySelector('input[placeholder="ex: Cálculo I"]');
const inputWorkload = document.querySelector('input[type="number"]');

if (inputDiscipline) {
  inputDiscipline.addEventListener('input', function(event) {
    console.log('Discipline changed:', event.target.value);

    const error = inputDiscipline.parentElement.querySelector('.erro-message');
    if (error) error.remove();
  });
}

if (inputWorkload) {
  inputWorkload.addEventListener('input', function(event) {
    const error = inputWorkload.parentElement.querySelector('.erro-message');
    if (error) error.remove();
  });
}

let disciplineId = 0;

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#sec-disciplinas form');
  const listItems = document.querySelector('#sec-disciplinas .lista-itens');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const inputName = form.querySelector('input[placeholder="ex: Cálculo I"]');
      const inputHours = form.querySelector('input[type="number"]');
      const disciplineName = inputName.value;
      const workload = inputHours.value;

      const errorPreviousName = inputName.parentElement.querySelector('.erro-message');
      if (errorPreviousName) errorPreviousName.remove();

      const errorPreviousHours = inputHours.parentElement.querySelector('.erro-message');
      if (errorPreviousHours) errorPreviousHours.remove();

      const createErrorMessage = (input, message) => {
        const msgError = document.createElement('label');
        msgError.className = 'erro-message';
        msgError.textContent = message;
        msgError.style.color = '#c55a5a';
        msgError.style.fontSize = '0.85rem';
        msgError.style.marginTop = '6px';
        msgError.style.display = 'block';
        input.parentElement.appendChild(msgError);
      };

      let hasError = false;

      if (!disciplineName.trim()) {
        createErrorMessage(inputName, 'Por favor, digite o nome da disciplina');
        hasError = true;
      }

      if (!workload) {
        createErrorMessage(inputHours, 'Por favor, informe a carga horária');
        hasError = true;
      } else if (isNaN(workload) || workload <= 0) {
        createErrorMessage(inputHours, 'Por favor, digite um número válido');
        hasError = true;
      }

      if (hasError) return;

      const emptyMsg = listItems.querySelector('.small-text');
      if (emptyMsg) emptyMsg.remove();

      const card = document.createElement('div');
      card.className = 'item-lista';
      card.setAttribute('data-id', 'discipline');
      card.setAttribute('discipline-name', disciplineName);
      card.style.backgroundColor = '#e65c5c';
      card.style.borderLeft = '6px solid #e65c5c';
      card.style.border = '2px solid #c92c3a';
      card.innerHTML = `
        <div>
          <strong style="color: white;">${disciplineName}</strong>
          <p style="color: white; font-size: 0.85rem; margin-top: 4px;">Carga Horária: ${workload || 'Não definida'} horas</p>
        </div>
        <button type="button" class="remover-btn" onclick="this.parentElement.remove()">Remover</button>
      `;

      const removeBtn = card.querySelector('.remover-btn');
      removeBtn.style.backgroundColor = '#ffffff';
      removeBtn.style.color = '#e65c5c';

      listItems.appendChild(card);
      form.reset();
      console.log('Discipline registered:', disciplineName);
    });
  }
>>>>>>> 3a7e18910d6dc5f403f899ebdcd69224b5ba5d4a
});
