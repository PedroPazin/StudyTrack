function mostrarSecao(secao, botao) {
  document.querySelectorAll('.section-panel').forEach(function (panel) {
    panel.classList.remove('active');
  });

  document.querySelectorAll('.nav-btn').forEach(function (btn) {
    btn.classList.remove('active');
  });

  document.getElementById('sec-' + secao).classList.add('active');
  botao.classList.add('active');
}
