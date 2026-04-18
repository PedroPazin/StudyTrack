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