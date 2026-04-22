document.addEventListener('DOMContentLoaded', () => {
  const secRegistros = document.getElementById('sec-registros');
  const formRegistros = secRegistros.querySelector('form');
  const select = secRegistros.querySelector('select');
  const lista = secRegistros.querySelector('.lista-itens');

  let registros =
    JSON.parse(localStorage.getItem('studytrack_registros')) || [];

  const salvarNoStorage = () => {
    localStorage.setItem('studytrack_registros', JSON.stringify(registros));
  };

  const atualizarSelect = () => {
    const valorAnterior = select.value;
    select.innerHTML = '<option value="">Selecione uma disciplina...</option>';

    const disciplinas =
      JSON.parse(localStorage.getItem('studytrack_disciplinas')) || [];
    disciplinas.forEach((disc) => {
      select.insertAdjacentHTML(
        'beforeend',
        `<option value="${disc.nome}">${disc.nome}</option>`
      );
    });
    select.value = valorAnterior;
  };

  const renderizarRegistros = () => {
    lista.innerHTML = '';
    if (registros.length === 0) {
      lista.innerHTML = '<p class="small-text">Nenhum registro ainda.</p>';
      return;
    }

    registros.forEach((reg, index) => {
      const dataFormatada = reg.data.split('-').reverse().join('/');
      lista.insertAdjacentHTML(
        'beforeend',
        `
                <div class="item-lista">
                    <div>
                        <strong><i class="fas fa-book"></i> ${reg.disciplina}</strong><br>
                        <span style="font-size: 0.85em; color: #c55a5a;">
                            <i class="fas fa-calendar-alt"></i> ${dataFormatada}
                        </span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-weight: bold; color: #e65c5c; font-size: 1.1em;">
                            <i class="fas fa-clock"></i> ${reg.horas}h
                        </span>
                        <button class="remover-btn" onclick="removerRegistro(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `
      );
    });
  };

  window.removerRegistro = (index) => {
    registros.splice(index, 1);
    salvarNoStorage();
    renderizarRegistros();
  };

  formRegistros.addEventListener('submit', (e) => {
    e.preventDefault();

    const disciplina = select.value;
    const data = secRegistros.querySelector('input[type="date"]').value;
    const horas = secRegistros.querySelector('input[type="number"]').value;

    if (!disciplina || !data || !horas) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    registros.push({
      disciplina,
      data,
      horas: parseFloat(horas)
    });

    salvarNoStorage();
    renderizarRegistros();
    formRegistros.reset();
  });

  document
    .querySelectorAll('.nav-btn')
    .forEach((btn) =>
      btn.addEventListener('click', () => setTimeout(atualizarSelect, 100))
    );

  atualizarSelect();
  renderizarRegistros();
});
