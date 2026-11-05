/* ============================================================
   ToToyLandia — página principal
   ============================================================ */

(async () => {
  const produtos = await TTLProdutos.publicados();

  /* ---------- Coleções temáticas (categorias) ---------- */
  const gradeColecoes = document.getElementById('ttl-colecoes-grade');
  const contagemPorCategoria = {};
  produtos.forEach(p => { contagemPorCategoria[p.categoria] = (contagemPorCategoria[p.categoria] || 0) + 1; });

  const ornamentes = {
    'animais-fofinhos':    { emoji: '🐾', cor: 'var(--ttl-amarelo)' },
    'dinossauros':         { emoji: '🦕', cor: 'var(--ttl-verde)' },
    'princesas-fantasia':  { emoji: '🏰', cor: 'var(--ttl-rosa)' },
    'carros-veiculos':     { emoji: '🚗', cor: 'var(--ttl-azul)' },
    'mundo-magico':        { emoji: '✨', cor: 'var(--ttl-roxo)' },
    'espaco-planetas':     { emoji: '🚀', cor: 'var(--ttl-azul-escuro)' },
    'aprendizado':         { emoji: '🔢', cor: 'var(--ttl-verde-agua)' },
    'datas-comemorativas': { emoji: '🎉', cor: 'var(--ttl-laranja)' }
  };

  gradeColecoes.innerHTML = TTL_CATEGORIAS.map(cat => {
    const orna = ornamentes[cat.id];
    const qtd = contagemPorCategoria[cat.id] || 0;
    return `
      <a class="ttl-colecao ttl-revelar" href="catalogo.html?categoria=${cat.id}" style="--colecao-cor: ${orna.cor}">
        <span class="ttl-colecao-emoji" aria-hidden="true">${orna.emoji}</span>
        <span class="ttl-colecao-nome">${TTLUI.escapo(cat.nome)}</span>
        <span class="ttl-colecao-qtd">${qtd === 0 ? 'em breve' : `${qtd} livrinho${qtd > 1 ? 's' : ''}`}</span>
      </a>`;
  }).join('');

  /* ---------- Mais vendidos ---------- */
  const maisVendidos = produtos.filter(p => p.maisVendido);
  const secaoMaisVendidos = document.getElementById('mais-vendidos');
  if (maisVendidos.length > 0) {
    document.getElementById('ttl-mais-vendidos-grade').innerHTML =
      maisVendidos.map(p => TTLUI.cardProduto(p)).join('');
  } else {
    secaoMaisVendidos.hidden = true;
  }

  /* ---------- Kits (produtos marcados como kit) ---------- */
  const kits = produtos.filter(p => p.kit);
  const secaoKits = document.getElementById('ttl-kits');
  if (kits.length > 0) {
    document.getElementById('ttl-kits-grade').innerHTML =
      kits.map(p => TTLUI.cardProduto(p)).join('');
  } else {
    secaoKits.hidden = true;
  }

  /* ---------- Novidades (mais recentes publicados) ---------- */
  const novidades = [...produtos].slice(0, 3);
  const secaoNovidades = document.getElementById('ttl-novidades');
  if (novidades.length > 0) {
    document.getElementById('ttl-novidades-grade').innerHTML =
      novidades.map(p => TTLUI.cardProduto(p, { pequeno: true })).join('');
  } else {
    secaoNovidades.hidden = true;
  }
})();
