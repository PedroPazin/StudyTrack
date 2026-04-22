document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#sec-metas form');
  const select = document.querySelector('#sec-metas select');
  const listItems = document.querySelector('#sec-metas .lista-itens');

  const erro = (el, msg) => {
    const label = document.createElement('label');
    label.className = 'erro-message';
    label.textContent = msg;
    Object.assign(label.style, { color: '#c55a5a', fontSize: '0.85rem', marginTop: '6px', display: 'block' });
    el.insertAdjacentElement('afterend', label);
  };

  const limparErro = (el) => {
    const e = el.parentElement?.querySelector('.erro-message') || el.nextElementSibling;
    if (e?.classList.contains('erro-message')) e.remove();
  };

  const atualizarSelect = () => {
    const disciplinas = [...document.querySelectorAll('[data-id="discipline"]')];
    const comMeta = [...listItems.querySelectorAll('[data-meta-nome]')].map(el => el.dataset.metaNome);
    const anterior = select.value;

    select.innerHTML = '<option value="">Selecione uma disciplina...</option>';

    if (!disciplinas.length) {
      select.insertAdjacentHTML('beforeend', '<option disabled>— Nenhuma disciplina cadastrada —</option>');
      return;
    }

    disciplinas.forEach(el => {
      const nome = el.getAttribute('discipline-name');
      if (!nome) return;
      const temMeta = comMeta.includes(nome);
      select.insertAdjacentHTML('beforeend',
        `<option value="${nome}" ${temMeta ? 'disabled' : ''}>${nome}${temMeta ? ' (já possui meta)' : ''}</option>`
      );
    });

    select.value = anterior;
  };

  document.querySelectorAll('.nav-btn').forEach(btn =>
    btn.addEventListener('click', () => setTimeout(atualizarSelect, 100))
  );
  new MutationObserver(atualizarSelect)
    .observe(document.querySelector('#sec-disciplinas .lista-itens'), { childList: true, subtree: true });

  select.addEventListener('change', () => limparErro(select));

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const inputHoras = form.querySelector('input[type="number"]');
    const nome = select.value;
    const horas = inputHoras.value;

    limparErro(select);
    limparErro(inputHoras);

    let hasError = false;
    if (!nome)  { erro(select, 'Selecione uma disciplina'); hasError = true; }
    if (!horas) { erro(inputHoras, 'Informe as horas meta'); hasError = true; }
    else if (isNaN(horas) || horas <= 0){ erro(inputHoras, 'Digite um número válido'); hasError = true; }
    if (hasError) return;

    listItems.querySelector('.small-text')?.remove();

    const card = document.createElement('div');
    card.className = 'item-lista';
    card.dataset.metaNome = nome;
    Object.assign(card.style, { backgroundColor: '#e65c5c', border: '2px solid #c92c3a', borderLeft: '6px solid #e65c5c' });
    card.innerHTML = `
      <div>
        <strong style="color:white">${nome}</strong>
        <p style="color:white;font-size:0.85rem;margin-top:4px">Meta: ${horas}h/semana</p>
      </div>
      <button type="button" class="remover-btn" style="background:#fff;color:#e65c5c">Remover</button>
    `;

    card.querySelector('.remover-btn').addEventListener('click', () => {
      card.remove();
      atualizarSelect();
      if (!listItems.querySelector('.item-lista'))
        listItems.innerHTML = '<p class="small-text">Nenhuma meta cadastrada.</p>';
    });

    listItems.appendChild(card);
    form.reset();
    atualizarSelect();
  });

  atualizarSelect();
});
