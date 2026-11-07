/* ============================================================
   ToToyLandia — vitrine da home (categorias + mais vendidos)
   ============================================================ */

(async () => {
  const produtos = await TTLProdutos.publicados();

  /* ---------- Coleções temáticas (categorias) ---------- */
  const gradeColecoes = document.getElementById('ttl-colecoes-grade');
  const contagemPorCategoria = {};
  produtos.forEach(p => { contagemPorCategoria[p.categoria] = (contagemPorCategoria[p.categoria] || 0) + 1; });

  /* Ícone cheio (família cartoon do ttlIcones) + cor de apoio por categoria *
     — a cor só tintura o tile; o desenho vem do registro da marca. */
  const enfeites = {
    'animais-fofinhos':    { icone: 'paw',       cor: 'var(--ttl-amarelo)' },
    'dinossauros':         { icone: 'dino',      cor: 'var(--ttl-verde)' },
    'princesas-fantasia':  { icone: 'crown',     cor: 'var(--ttl-rosa)' },
    'carros-veiculos':     { icone: 'car',       cor: 'var(--ttl-azul)' },
    'mundo-magico':        { icone: 'arcoiris',  cor: 'var(--ttl-roxo)' },
    'espaco-planetas':     { icone: 'foguete',   cor: 'var(--ttl-azul-escuro)' },
    'aprendizado':         { icone: 'formatura', cor: 'var(--ttl-verde-agua)' },
    'datas-comemorativas': { icone: 'bolo',      cor: 'var(--ttl-laranja)' }
  };

  if (gradeColecoes) {
    gradeColecoes.innerHTML = TTL_CATEGORIAS.map(cat => {
      const enfeite = enfeites[cat.id] ?? { icone: 'brilhos', cor: 'var(--ttl-rosa)' };
      const qtd = contagemPorCategoria[cat.id] || 0;
      return `
        <a class="ttl-colecao ttl-revelar" href="catalogo.html?categoria=${cat.id}" style="--colecao-cor: ${enfeite.cor}">
          <span class="ttl-colecao-icone" aria-hidden="true">${TTLIcones.icone(enfeite.icone, 30)}</span>
          <span class="ttl-colecao-nome">${TTLUI.escapo(cat.nome)}</span>
          <span class="ttl-colecao-qtd">${qtd === 0 ? 'em breve' : `${qtd} livrinho${qtd > 1 ? 's' : ''}`}</span>
        </a>`;
    }).join('');
  }

  /* ---------- Mais vendidos (classificação real do cadastro) ---------- */
  const maisVendidos = produtos.filter(p => p.maisVendido);
  const gradeMaisVendidos = document.getElementById('ttl-mais-vendidos-grade');
  const secaoMaisVendidos = document.getElementById('mais-vendidos');
  if (maisVendidos.length > 0) {
    gradeMaisVendidos.innerHTML = maisVendidos.map(p => TTLUI.cardProduto(p)).join('');
  } else if (secaoMaisVendidos) {
    secaoMaisVendidos.hidden = true;
  }

  /* Reobserva os blocos revelados depois da renderização async */
  TTLUI.observarRevelacao();
})();
