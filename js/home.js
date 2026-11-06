/* ============================================================
   ToToyLandia — vitrine da home (categorias + mais vendidos)
   ============================================================ */

(async () => {
  const produtos = await TTLProdutos.publicados();

  /* ---------- Coleções temáticas (categorias) ---------- */
  const gradeColecoes = document.getElementById('ttl-colecoes-grade');
  const contagemPorCategoria = {};
  produtos.forEach(p => { contagemPorCategoria[p.categoria] = (contagemPorCategoria[p.categoria] || 0) + 1; });

  /* Ícone Lucide + cor de apoio por categoria — a cor vem da paleta da marca.
     Paths copiados de lucide-static (paw-print, egg, crown, car, sparkles,
     rocket, book-open, cake, palette) para manter o traço idêntico ao resto
     da interface, que usa a mesma biblioteca. */
  const LC = {
    aberto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
    fechar: '</svg>'
  };
  function lucide(paths) {
    return LC.aberto + paths + LC.fechar;
  }
  const enfeites = {
    'animais-fofinhos':    { icone: lucide('<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>'), cor: 'var(--ttl-amarelo)' },
    'dinossauros':         { icone: lucide('<path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z"/>'), cor: 'var(--ttl-verde)' },
    'princesas-fantasia':  { icone: lucide('<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>'), cor: 'var(--ttl-rosa)' },
    'carros-veiculos':     { icone: lucide('<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>'), cor: 'var(--ttl-azul)' },
    'mundo-magico':        { icone: lucide('<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>'), cor: 'var(--ttl-roxo)' },
    'espaco-planetas':     { icone: lucide('<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>'), cor: 'var(--ttl-azul-escuro)' },
    'aprendizado':         { icone: lucide('<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>'), cor: 'var(--ttl-verde-agua)' },
    'datas-comemorativas': { icone: lucide('<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5-2 4-2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/>'), cor: 'var(--ttl-laranja)' }
  };

  if (gradeColecoes) {
    gradeColecoes.innerHTML = TTL_CATEGORIAS.map(cat => {
      const enfeite = enfeites[cat.id] ?? { icone: lucide('<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>'), cor: 'var(--ttl-rosa)' };
      const qtd = contagemPorCategoria[cat.id] || 0;
      return `
        <a class="ttl-colecao ttl-revelar" href="catalogo.html?categoria=${cat.id}" style="--colecao-cor: ${enfeite.cor}">
          <span class="ttl-colecao-icone" aria-hidden="true">${enfeite.icone}</span>
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
