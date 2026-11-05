/* ============================================================
   ToToyLandia — página individual do produto
   ============================================================ */

(async () => {
  const id = new URLSearchParams(window.location.search).get('id');
  const produto = await TTLProdutos.buscarPorId(id);

  const raiz = document.getElementById('ttl-produto');

  if (!produto || !produto.publicado) {
    document.title = 'Produto não encontrado — ToToyLandia';
    document.querySelector('main').innerHTML = `
      <section class="ttl-estado-vazio">
        <img src="assets/logo.png" alt="" width="90" loading="lazy">
        <h2>Livrinho não encontrado</h2>
        <p>Este link pode estar quebrado ou o livrinho foi despublicado.</p>
        <a class="ttl-btn ttl-btn-primario" href="catalogo.html">Voltar ao catálogo</a>
      </section>`;
    return;
  }

  document.title = `${produto.nome} — ToToyLandia`;
  const metaDescricao = document.querySelector('meta[name="description"]');
  if (metaDescricao) metaDescricao.setAttribute('content', produto.curta || produto.descricao);

  const temPromo = produto.precoPromocional != null && Number(produto.precoPromocional) < Number(produto.preco);
  const precoOferta = temPromo ? produto.precoPromocional : produto.preco;
  const precoFinal = Number.isFinite(Number(precoOferta)) ? Number(precoOferta) : Number(produto.preco);
  const temLink = TTLProdutos.linkKiwifyValido(produto.linkKiwify);
  const descontado = temPromo ? Math.round((1 - precoFinal / produto.preco) * 100) : 0;

  /* ---------- Galeria ---------- */
  const imagensGaleria = [produto.capa, ...(produto.previas ?? [])].filter(Boolean);
  const miniaturas = imagensGaleria.map((src, posicao) => `
    <button class="ttl-miniatura ${posicao === 0 ? 'ativa' : ''}" data-src="${TTLUI.escapo(src)}"
            aria-label="Ver imagem ${posicao + 1} de ${TTLUI.escapo(produto.nome)}">
      <img src="${TTLUI.escapo(src)}" alt="" loading="lazy"
           onerror="this.src='${TTL_CONFIG.capaFallback}'">
    </button>`).join('');

  /* ---------- Benefícios ---------- */
  const beneficios = [
    { icone: '⚡', texto: 'Entrega imediata: o PDF chega no seu e-mail minutos após a confirmação do pagamento (via Kiwify).' },
    { icone: '🖨️', texto: 'Imprima quantas vezes quiser — perfeito para imprimir novamente quando a folha sai colorida "do jeito errado".' },
    { icone: '✏️', texto: 'Desenhos com linhas grossas e simples, pensados para mãos pequenas: de 8 a 25 páginas por livrinho.' },
    { icone: '📱', texto: 'Guardado para sempre: imprima em nova folha ou deixe o PDF baixado para qualquer dia de calor.' }
  ];

  raiz.innerHTML = `
    <nav class="ttl-breadcrumb" aria-label="Você está aqui">
      <a href="index.html">Início</a> <span>›</span>
      <a href="catalogo.html">Todos os livrinhos</a> <span>›</span>
      <a href="catalogo.html?categoria=${encodeURIComponent(produto.categoria)}">${TTLUI.escapo(TTLProdutos.categoriaNome(produto.categoria))}</a>
    </nav>

    <section class="ttl-produto-layout">
      <div class="ttl-produto-galeria">
        <div class="ttl-produto-capa">
          <img id="ttl-galeria-principal" src="${TTLUI.escapo(imagensGaleria[0] ?? TTL_CONFIG.capaFallback)}"
               alt="Capa do livrinho ${TTLUI.escapo(produto.nome)}"
               onerror="this.src='${TTL_CONFIG.capaFallback}'">
          ${temPromo ? `<span class="ttl-selo-promo">-${descontado}%</span>` : ''}
          ${produto.maisVendido ? '<span class="ttl-selo-topvenda">Top venda</span>' : ''}
        </div>
        ${imagensGaleria.length > 1 ? `<div class="ttl-galeria-miniaturas">${miniaturas}</div>` : ''}
      </div>

      <div class="ttl-produto-info">
        ${temLink
          ? ''
          : `<div class="ttl-aviso-em-breve ttl-aviso-admin-grande">
              <strong>Vendas em breve:</strong> este livrinho está chegando à loja e ainda está com o checkout em preparação. Explore os outros livrinhos disponíveis!
            </div>`}
        <span class="ttl-card-categoria">${TTLUI.escapo(TTLProdutos.categoriaNome(produto.categoria))}</span>
        <h1 class="ttl-produto-nome">${TTLUI.escapo(produto.nome)}</h1>
        <p class="ttl-produto-curta">${TTLUI.escapo(produto.curta || '')}</p>

        <div class="ttl-produto-detalhes">
          <div class="ttl-produto-detalhe">
            <strong>${Number(produto.desenhos) || '—'}</strong>
            <span>desenhos para pintar</span>
          </div>
          <div class="ttl-produto-detalhe">
            <strong>${TTLUI.escapo(produto.faixaEtaria || '3 a 8 anos')}</strong>
            <span>idade recomendada</span>
          </div>
          <div class="ttl-produto-detalhe">
            <strong>PDF</strong>
            <span>formato digital</span>
          </div>
        </div>

        <div class="ttl-produto-preco">
          ${temPromo ? `<s>${TTLUI.escapo(TTLFormatarPreco(produto.preco))}</s>` : ''}
          <span class="ttl-produto-preco-atual">${TTLUI.escapo(TTLFormatarPreco(precoFinal))}</span>
          ${temPromo
            ? `<span class="ttl-badge">● Você economiza ${TTLUI.escapo(TTLFormatarPreco(Number(produto.preco) - precoFinal))}</span>`
            : ''}
        </div>

        ${temLink
          ? `<a class="ttl-btn ttl-btn-primario ttl-produto-comprar" id="ttl-btn-comprar"
               href="${TTLUI.escapo(produto.linkKiwify)}" target="_blank" rel="noopener noreferrer">Comprar agora</a>`
          : `<button class="ttl-btn ttl-btn-primario ttl-produto-comprar" id="ttl-btn-comprar" disabled>Checkout em preparação</button>`}
        <button class="ttl-btn ttl-btn-secundario ttl-produto-adicionar" id="ttl-btn-adicionar-carrinho">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M3 4h2.4l2.5 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21.5 8H6.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.5" cy="20.3" r="1.7" fill="currentColor"/><circle cx="17.5" cy="20.3" r="1.7" fill="currentColor"/></svg>
          Adicionar ao carrinho
        </button>

        <div class="ttl-produto-confianca">
          <p><strong>Como funciona a compra:</strong> ao clicar em "Comprar agora", você será levado ao site seguro da
          <strong>Kiwify</strong>, realiza o pagamento do jeito que preferir (Pix, cartão ou boleto) e o PDF do livrinho
          é entregue automaticamente no seu e-mail. Toda a compra é processada pela credenciadora Kiwify.</p>
        </div>
      </div>
    </section>

    <section class="ttl-produto-descricao">
      <h2>Sobre este livrinho</h2>
      ${String(produto.descricao || '').split(/\n\n+/).map(parte =>
        `<p>${TTLUI.escapo(parte)}</p>`).join('')}
      ${produto.informacoesImpressao ? `
      <h3>Informações de impressão</h3>
      <p>${TTLUI.escapo(produto.informacoesImpressao)}</p>` : ''}
    </section>

    <section class="ttl-produto-beneficios">
      <h2>Vantagens de levar um livrinho para casa</h2>
      <div class="ttl-beneficios-grade">
        ${beneficios.map(b => `
          <div class="ttl-beneficio">
            <span class="ttl-beneficio-icone" aria-hidden="true">${b.icone}</span>
            <p>${TTLUI.escapo(b.texto)}</p>
          </div>`).join('')}
      </div>
    </section>
  `;

  /* ---------- Prévias ---------- */
  if ((produto.previas ?? []).length > 0) {
    const secaoPrevias = document.getElementById('ttl-previas');
    secaoPrevias.hidden = false;
    secaoPrevias.querySelector('.ttl-previas-grade').innerHTML =
      produto.previas.map(src => `
        <figure class="ttl-previa">
          <img src="${TTLUI.escapo(src)}" alt="Página interna para colorir — ${TTLUI.escapo(produto.nome)}"
               loading="lazy" onerror="this.src='${TTL_CONFIG.capaFallback}'">
        </figure>`).join('');
  }

  /* ---------- Galeria interativa ---------- */
  raiz.querySelector('.ttl-galeria-miniaturas')?.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.ttl-miniatura');
    if (!botao) return;
    raiz.querySelectorAll('.ttl-miniatura').forEach(m => m.classList.remove('ativa'));
    botao.classList.add('ativa');
    document.getElementById('ttl-galeria-principal').src = botao.dataset.src;
  });

  /* ---------- Compra ---------- */
  document.getElementById('ttl-btn-adicionar-carrinho').addEventListener('click', () => {
    const adicionou = TTLCarrinho.adicionar(produto);
    if (adicionou) {
      TTLUI.atualizarBadge();
      TTLUI.toast(`"${produto.nome}" foi adicionado ao carrinho.`, 'sucesso');
      TTLUI.abrirCarrinho();
    } else {
      TTLUI.toast('Este livrinho já está no carrinho. Abra o carrinho para finalizar.', 'aviso');
      TTLUI.abrirCarrinho();
    }
  });

  /* ---------- Relacionados ---------- */
  const relacionados = (await TTLProdutos.publicados())
    .filter(p => p.id !== produto.id && p.categoria === produto.categoria)
    .slice(0, 4);
  const secaoRelacionados = document.getElementById('ttl-relacionados');
  if (relacionados.length > 0) {
    secaoRelacionados.hidden = false;
    secaoRelacionados.querySelector('.ttl-grade-vitrine').innerHTML =
      relacionados.map(p => TTLUI.cardProduto(p, { pequeno: true })).join('');
  }
})();
