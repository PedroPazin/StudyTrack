<<<<<<< HEAD
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
=======
document.addEventListener("DOMContentLoaded", () => {
    const secRegistros = document.getElementById('sec-registros'); // ou 'sec-registro' dependendo do seu HTML final
    const formRegistros = secRegistros.querySelector('form');
    const select = secRegistros.querySelector('select');
    const lista = secRegistros.querySelector('.lista-itens');

    // 1. Atualiza as disciplinas no select
    const atualizarSelect = () => {
        const valorSalvo = select.value;
        select.innerHTML = '<option value="">Selecione uma disciplina...</option>';

        document.querySelectorAll('[data-id="discipline"]').forEach(disc => {
            const nome = disc.getAttribute('data-nome');
            if (nome && nome.trim()) {
                select.insertAdjacentHTML('beforeend', `<option value="${nome}">${nome}</option>`);
            }
        });
        
        select.value = valorSalvo || ""; // Mantém a seleção se existir
    };

    // 2. Gatilho: Atualiza ao clicar no menu lateral
    document.querySelectorAll('.nav-btn').forEach(btn => 
        btn.addEventListener('click', () => setTimeout(atualizarSelect, 100))
    );

    // 3. Salvar Registro
    formRegistros.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        // Pega os valores direto dos inputs
        const disciplina = select.value;
        const data = secRegistros.querySelector('input[type="date"]').value;
        const horas = secRegistros.querySelector('input[type="number"]').value;

        if (!disciplina) return alert("Por favor, selecione uma disciplina válida.");

        // Remove a mensagem de vazio (usando sintaxe moderna "?." )
        lista.querySelector('.small-text')?.remove();

        const dataFormatada = data.split('-').reverse().join('/');

        // Cria e insere o novo card de uma vez só
        lista.insertAdjacentHTML('beforeend', `
            <div class="item-lista">
                <div>
                    <strong><i class="fas fa-book"></i> ${disciplina}</strong><br>
                    <span style="font-size: 0.85em; color: #c55a5a;">
                        <i class="fas fa-calendar-alt"></i> ${dataFormatada}
                    </span>
                </div>
                <div>
                    <span style="font-weight: bold; color: #e65c5c; font-size: 1.1em;">
                        <i class="fas fa-clock"></i> ${horas}h
                    </span>
                </div>
            </div>
        `);
        
        formRegistros.reset();
    });
});
>>>>>>> 3a7e18910d6dc5f403f899ebdcd69224b5ba5d4a
