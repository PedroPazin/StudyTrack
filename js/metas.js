document.addEventListener('DOMContentLoaded', () => {
  const secMetas = document.getElementById('sec-metas');
  const form = secMetas.querySelector('form');
  const select = secMetas.querySelector('select');
  const inputHoras = secMetas.querySelector('input[type="number"]');
  const lista = secMetas.querySelector('.lista-itens');

  let metas = JSON.parse(localStorage.getItem('studytrack_metas')) || [];
  const salvar = () =>
    localStorage.setItem('studytrack_metas', JSON.stringify(metas));

  const atualizarSelect = () => {
    const idsComMeta = metas.map((m) => m.disciplinaIndex);
    select.innerHTML = '<option value="">Selecione uma disciplina...</option>';

    const disciplinas = [
      ...document.querySelectorAll('[data-id="discipline"]')
    ];

    if (!disciplinas.length) {
      select.insertAdjacentHTML(
        'beforeend',
        '<option disabled>— Nenhuma disciplina cadastrada —</option>'
      );
      return;
    }

    disciplinas.forEach((el, i) => {
      const nome =
        el.getAttribute('data-discipline-nome') || `Disciplina ${i + 1}`;
      const temMeta = idsComMeta.includes(i);
      select.insertAdjacentHTML(
        'beforeend',
        `
        <option value="${i}" ${temMeta ? 'disabled' : ''}>
          ${nome}${temMeta ? ' (já possui meta)' : ''}
        </option>
      `
      );
    });
  };

  document
    .querySelectorAll('.nav-btn')
    .forEach((btn) =>
      btn.addEventListener('click', () => setTimeout(atualizarSelect, 100))
    );

  const renderizarMetas = () => {
    lista.innerHTML = '';

    if (!metas.length) {
      lista.innerHTML = '<p class="small-text">Nenhuma meta cadastrada.</p>';
      return;
    }

    metas.forEach(({ id, disciplina, horas }) => {
      lista.insertAdjacentHTML(
        'beforeend',
        `
        <div class="item-lista">
          <span><strong>${disciplina}</strong> — Meta: ${horas}h/semana</span>
          <button class="remover-btn" data-id="${id}">
            <i class="fas fa-trash"></i> Remover
          </button>
        </div>
      `
      );
    });
  };

  lista.addEventListener('click', (e) => {
    const btn = e.target.closest('.remover-btn');
    if (!btn) return;
    metas = metas.filter((m) => m.id !== Number(btn.dataset.id));
    salvar();
    renderizarMetas();
    atualizarSelect();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const disciplinaIndex = Number(select.value);
    const horas = parseFloat(inputHoras.value);
    const disciplinas = [
      ...document.querySelectorAll('[data-id="discipline"]')
    ];

    if (select.value === '') return alert('Selecione uma disciplina.');
    if (!horas || horas <= 0)
      return alert('Digite uma quantidade de horas válida.');

    const nome =
      disciplinas[disciplinaIndex]?.getAttribute('data-discipline-nome') ||
      `Disciplina ${disciplinaIndex + 1}`;

    metas.push({ id: Date.now(), disciplinaIndex, disciplina: nome, horas });
    salvar();
    renderizarMetas();
    atualizarSelect();
    form.reset();
  });

  atualizarSelect();
  renderizarMetas();
});
