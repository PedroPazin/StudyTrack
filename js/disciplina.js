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
});
