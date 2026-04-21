function mostrarSecao(secao, botao) {
<<<<<<< HEAD
  document.querySelectorAll('.section-panel').forEach(function (panel) {
    panel.classList.remove('active');
  });

  document.querySelectorAll('.nav-btn').forEach(function (btn) {
    btn.classList.remove('active');
  });

  document.getElementById('sec-' + secao).classList.add('active');
  botao.classList.add('active');
=======
    document.querySelectorAll(".section-panel").forEach(function (panel) {
        panel.classList.remove("active");
    });

    document.querySelectorAll(".nav-btn").forEach(function (btn) {
        btn.classList.remove("active");
    });

    document.getElementById("sec-" + secao).classList.add("active");
    botao.classList.add("active");
>>>>>>> 3a7e18910d6dc5f403f899ebdcd69224b5ba5d4a
}
