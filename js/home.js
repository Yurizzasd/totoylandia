/* ============================================================
   ToToyLandia — vitrine da home (categorias + mais vendidos)
   ============================================================ */

(async () => {
  const produtos = await TTLProdutos.publicados();

  /* ---------- Coleções temáticas (categorias) ---------- */
  const gradeColecoes = document.getElementById('ttl-colecoes-grade');
  const contagemPorCategoria = {};
  produtos.forEach(p => { contagemPorCategoria[p.categoria] = (contagemPorCategoria[p.categoria] || 0) + 1; });

  /* Emoji + cor de apoio por categoria — a cor vem da paleta da marca */
  const enfeites = {
    'animais-fofinhos':    { emoji: '🐻', cor: 'var(--ttl-amarelo)' },
    'dinossauros':         { emoji: '🦖', cor: 'var(--ttl-verde)' },
    'princesas-fantasia':  { emoji: '👑', cor: 'var(--ttl-rosa)' },
    'carros-veiculos':     { emoji: '🏎️', cor: 'var(--ttl-azul)' },
    'mundo-magico':        { emoji: '🦄', cor: 'var(--ttl-roxo)' },
    'espaco-planetas':     { emoji: '🚀', cor: 'var(--ttl-azul-escuro)' },
    'aprendizado':         { emoji: '🔤', cor: 'var(--ttl-verde-agua)' },
    'datas-comemorativas': { emoji: '🎂', cor: 'var(--ttl-laranja)' }
  };

  if (gradeColecoes) {
    gradeColecoes.innerHTML = TTL_CATEGORIAS.map(cat => {
      const enfeite = enfeites[cat.id] ?? { emoji: '🎨', cor: 'var(--ttl-rosa)' };
      const qtd = contagemPorCategoria[cat.id] || 0;
      return `
        <a class="ttl-colecao ttl-revelar" href="catalogo.html?categoria=${cat.id}" style="--colecao-cor: ${enfeite.cor}">
          <span class="ttl-colecao-icone" aria-hidden="true">${enfeite.emoji}</span>
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
