document.addEventListener('DOMContentLoaded', () => {
  let meuChart;
  let periodoAtual = 'semana';
  const dashboardGrid = document.querySelector('.relatorios-grid');
  const btnAlternar = document.getElementById('btn-alternar-vista');
  const vistaBarras = document.getElementById('vista-barras');
  const vistaGrafico = document.getElementById('vista-grafico');

  const filtrarPorPeriodo = (registros, periodo) => {
    const hoje = new Date();
    hoje.setHours(23, 59, 59, 999);

    return registros.filter((reg) => {
      const dataReg = new Date(reg.data + 'T12:00:00');
      if (periodo === 'semana') {
        const inicioSemana = new Date(hoje);
        inicioSemana.setDate(hoje.getDate() - hoje.getDay());
        inicioSemana.setHours(0, 0, 0, 0);
        return dataReg >= inicioSemana;
      } else if (periodo === 'mes') {
        return (
          dataReg.getMonth() === hoje.getMonth() &&
          dataReg.getFullYear() === hoje.getFullYear()
        );
      }
      return true; 
    });
  };

  const atualizarDashboard = () => {
    const disciplinas =
      JSON.parse(localStorage.getItem('studytrack_disciplinas')) || [];
    const metas = JSON.parse(localStorage.getItem('studytrack_metas')) || [];
    const registrosFull =
      JSON.parse(localStorage.getItem('studytrack_registros')) || [];

    const registrosFiltrados = filtrarPorPeriodo(registrosFull, periodoAtual);

    dashboardGrid.innerHTML = '';
    const labels = [];
    const dados = [];
    const cores = [];

    disciplinas.forEach((disc, index) => {
      const metaRelacionada = metas.find((m) => m.disciplina === disc.nome);
      let horasMeta = metaRelacionada ? metaRelacionada.horas : 0;

      if (periodoAtual === 'mes') horasMeta *= 4;

      const horasEstudadas = registrosFiltrados
        .filter((reg) => reg.disciplina === disc.nome)
        .reduce((total, reg) => total + parseFloat(reg.horas), 0);

      const porcentagem =
        horasMeta > 0 ? Math.min((horasEstudadas / horasMeta) * 100, 100) : 0;

      labels.push(disc.nome);
      dados.push(horasEstudadas.toFixed(1));
      cores.push(index % 2 === 0 ? '#b91c1c' : '#e65c5c');

      dashboardGrid.insertAdjacentHTML(
        'beforeend',
        `
                <div class="relatorio-item" style="margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between;">
                        <strong>${disc.nome}</strong>
                        <span>${horasEstudadas.toFixed(1)}h / ${horasMeta > 0 ? horasMeta + 'h' : '--'}</span>
                    </div>
                    <div class="progress-bar"><div class="progress-fill" style="width: ${porcentagem}%"></div></div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-top: 5px; color: #c55a5a;">
                        <span>${porcentagem.toFixed(0)}% (${periodoAtual})</span>
                        <span>Faltam: ${Math.max(horasMeta - horasEstudadas, 0).toFixed(1)}h</span>
                    </div>
                </div>
            `
      );
    });
    renderizarGrafico(labels, dados, cores);
  };

  const renderizarGrafico = (labels, dados, cores) => {
    const ctx = document.getElementById('meuGraficoSemanas').getContext('2d');
    if (meuChart) meuChart.destroy();
    meuChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: `Horas (${periodoAtual})`,
            data: dados,
            backgroundColor: cores,
            borderRadius: 5
          }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  };

  document.querySelectorAll('.filtro-btn[data-periodo]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('.filtro-btn[data-periodo]')
        .forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      periodoAtual = btn.dataset.periodo;
      atualizarDashboard();
    });
  });

  btnAlternar.addEventListener('click', () => {
    const isGrafico = vistaGrafico.style.display === 'none';
    vistaBarras.style.display = isGrafico ? 'none' : 'block';
    vistaGrafico.style.display = isGrafico ? 'block' : 'none';
    btnAlternar.innerHTML = isGrafico
      ? '<i class="fas fa-list"></i> Ver em Barras'
      : '<i class="fas fa-chart-bar"></i> Ver em Gráfico';
    if (isGrafico) atualizarDashboard();
  });

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.innerText.includes('Dashboard'))
        setTimeout(atualizarDashboard, 50);
    });
  });

  atualizarDashboard();
});
