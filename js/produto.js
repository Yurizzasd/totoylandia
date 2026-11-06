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

  /* ---------- Galeria (capa + prévias reais) ---------- */
  const imagensGaleria = [produto.capa, ...(produto.previas ?? [])].filter(Boolean);
  const miniaturas = imagensGaleria.map((src, posicao) => `
    <button class="ttl-miniatura ${posicao === 0 ? 'ativa' : ''}" data-src="${TTLUI.escapo(src)}"
            type="button"
            aria-label="Ver imagem ${posicao + 1} de ${TTLUI.escapo(produto.nome)}">
      <img src="${TTLUI.escapo(src)}" alt="" loading="lazy" width="86" height="114" decoding="async"
           onerror="this.src='${TTL_CONFIG.capaFallback}'">
    </button>`).join('');

  /* ---------- O que você vai receber (dados reais do cadastro) ---------- */
  const iconeCheck = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const itensReceber = [];
  itensReceber.push({
    titulo: `1 arquivo PDF com ${Number(produto.desenhos) || 'várias'} páginas de desenhos`,
    texto: 'Pronto para baixar, imprimir e colorir — sem frete, sem espera.'
  });
  if (produto.faixaEtaria) {
    itensReceber.push({
      titulo: `Recomendado para ${produto.faixaEtaria}`,
      texto: 'Traços pensados para a coordenação motora dessa fase.'
    });
  }
  if (produto.informacoesImpressao) {
    itensReceber.push({
      titulo: 'Guia de impressão incluído nas informações',
      texto: produto.informacoesImpressao
    });
  }
  itensReceber.push({
    titulo: 'Impressão ilimitada para uso da família',
    texto: 'Imprima novamente sempre que precisar, conforme as condições de uso.'
  });

  /* ---------- Benefícios ---------- */
  const beneficios = [
    {
      titulo: 'Entrega imediata',
      texto: 'O PDF chega no seu e-mail minutos após a confirmação do pagamento (via Kiwify).',
      icone: '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>'
    },
    {
      titulo: 'Imprima quantas vezes quiser',
      texto: 'Perfeito para imprimir de novo quando a folha sai colorida "do jeito errado".',
      icone: '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M7 8V3.5h10V8M5 8h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1.2a1 1 0 0 0-.9.8 3.2 3.2 0 0 1-6.3 0 1 1 0 0 0-.9-.8H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>'
    },
    {
      titulo: 'Feito para mãos pequenas',
      texto: 'Desenhos com linhas grossas e amigáveis, dentro da faixa etária indicada.',
      icone: '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 19l-5.2-5.7a4.2 4.2 0 0 1 6-5.9l-.8.8-.8-.8a4.2 4.2 0 0 1 6 5.9L12 19z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 19v-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
    },
    {
      titulo: 'Guardado para sempre',
      texto: 'O PDF fica salvo no seu e-mail: imprima em folha nova em qualquer dia.',
      icone: '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M7 4h10a1 1 0 0 1 1 1v13H6V5a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 20h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M9 8h6M9 11h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
    }
  ];

  raiz.innerHTML = `
    <nav class="ttl-breadcrumb" aria-label="Você está aqui">
      <a href="index.html">Início</a> <span class="sep" aria-hidden="true">›</span>
      <a href="catalogo.html">Todos os livrinhos</a> <span class="sep" aria-hidden="true">›</span>
      <a href="catalogo.html?categoria=${encodeURIComponent(produto.categoria)}">${TTLUI.escapo(TTLProdutos.categoriaNome(produto.categoria))}</a>
      <span class="sep" aria-hidden="true">›</span>
      <span aria-current="page">${TTLUI.escapo(produto.nome)}</span>
    </nav>

    <section class="ttl-produto-layout">
      <div class="ttl-produto-galeria">
        <div class="ttl-produto-capa" id="ttl-galeria-cabecalho" title="Clique para ampliar">
          <img id="ttl-galeria-principal" src="${TTLUI.escapo(imagensGaleria[0] ?? TTL_CONFIG.capaFallback)}"
               alt="Capa do livrinho ${TTLUI.escapo(produto.nome)}"
               width="800" height="1132" fetchpriority="high" decoding="async"
               onerror="this.src='${TTL_CONFIG.capaFallback}'">
          ${temPromo ? `<span class="ttl-selo-promo">-${descontado}%</span>` : ''}
          ${produto.maisVendido ? '<span class="ttl-selo-topvenda">Mais vendido</span>' : ''}
          <span class="ttl-produto-capa-ajuda" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="12" height="12"><path d="M4 9V4h6M20 15v5h-6M4 4l6 6M20 20l-6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
            Ampliar
          </span>
        </div>
        ${imagensGaleria.length > 1 ? `<div class="ttl-galeria-miniaturas">${miniaturas}</div>` : ''}
      </div>

      <div class="ttl-produto-info">
        ${temLink
          ? ''
          : `<div class="ttl-aviso-em-breve ttl-aviso-em-breve-grande">
              <strong>Vendas em breve:</strong> este livrinho está chegando à loja e ainda está com o checkout em preparação. Explore os outros livrinhos disponíveis!
            </div>`}
        <div class="ttl-produto-categoria-linha">
          <span class="ttl-card-categoria">${TTLUI.escapo(TTLProdutos.categoriaNome(produto.categoria))}</span>
          ${produto.maisVendido ? '<span class="ttl-card-selo">Mais vendido</span>' : ''}
        </div>
        <h1 class="ttl-produto-nome">${TTLUI.escapo(produto.nome)}</h1>
        ${produto.curta ? `<p class="ttl-produto-curta">${TTLUI.escapo(produto.curta)}</p>` : ''}

        <div class="ttl-produto-detalhes">
          <div class="ttl-produto-detalhe">
            <strong>${Number(produto.desenhos) > 0 ? Number(produto.desenhos) : '—'}</strong>
            <span>desenhos para pintar</span>
          </div>
          <div class="ttl-produto-detalhe">
            <strong>${TTLUI.escapo(produto.faixaEtaria || '—')}</strong>
            <span>idade recomendada</span>
          </div>
          <div class="ttl-produto-detalhe">
            <strong>PDF</strong>
            <span>formato digital</span>
          </div>
        </div>

        <div class="ttl-produto-preco-caixa">
          <div class="ttl-produto-preco">
            ${temPromo ? `<s>${TTLUI.escapo(TTLFormatarPreco(produto.preco))}</s>` : ''}
            <span class="ttl-produto-preco-atual">${TTLUI.escapo(TTLFormatarPreco(precoFinal))}</span>
          </div>
          ${temPromo
            ? `<span class="ttl-produto-economia" style="margin-top: 0.4rem;">Você economiza ${TTLUI.escapo(TTLFormatarPreco(Number(produto.preco) - precoFinal))} (${descontado}% off)</span>`
            : ''}
          <p class="ttl-produto-preco-nota">Pagamento único em reais · PDF entregue por e-mail · sem assinatura</p>
        </div>

        <div class="ttl-produto-botoes">
          ${temLink
            ? `<a class="ttl-btn ttl-btn-primario ttl-produto-comprar" id="ttl-btn-comprar"
                 href="${TTLUI.escapo(produto.linkKiwify)}" target="_blank" rel="noopener noreferrer">
                 Comprar agora
                 <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
               </a>`
            : `<button class="ttl-btn ttl-btn-primario ttl-produto-comprar" id="ttl-btn-comprar" disabled>Checkout em preparação</button>`}
          <button class="ttl-btn ttl-btn-secundario ttl-produto-adicionar" id="ttl-btn-adicionar-carrinho" type="button">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M3 4h2.4l2.5 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21.5 8H6.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.5" cy="20.3" r="1.7" fill="currentColor"/><circle cx="17.5" cy="20.3" r="1.7" fill="currentColor"/></svg>
            Adicionar ao carrinho
          </button>
        </div>

        <div class="ttl-produto-confianca">
          <p><strong>Como funciona a compra:</strong> ao clicar em "Comprar agora", você será levado ao site seguro da
          <strong>Kiwify</strong>, escolhe como pagar (Pix, cartão ou boleto) e o PDF do livrinho
          é entregue automaticamente no seu e-mail. Toda a compra é processada pela plataforma oficial.</p>
        </div>
      </div>
    </section>

    <section class="ttl-produto-secao" aria-labelledby="titulo-receber">
      <h2 id="titulo-receber">O que você vai receber</h2>
      <div class="ttl-receber-caixa">
        <ul class="ttl-receber-lista">
          ${itensReceber.map(item => `
            <li>
              ${iconeCheck}
              <div>
                <strong>${TTLUI.escapo(item.titulo)}</strong>
                <p>${TTLUI.escapo(item.texto)}</p>
              </div>
            </li>`).join('')}
        </ul>
      </div>
    </section>

    <section class="ttl-produto-secao" aria-labelledby="titulo-sobre-produto">
      <div class="ttl-produto-descricao-caixa">
        <h2 id="titulo-sobre-produto">Sobre este livrinho</h2>
        ${String(produto.descricao || '').split(/\n\n+/).filter(Boolean).map(parte =>
          `<p>${TTLUI.escapo(parte)}</p>`).join('')}
        ${produto.informacoesImpressao ? `
        <h3 style="font-size: 1.1rem; margin-top: 1.2rem; color: var(--ttl-azul-escuro);">Informações de impressão</h3>
        <p>${TTLUI.escapo(produto.informacoesImpressao)}</p>` : ''}
      </div>
    </section>

    <section class="ttl-produto-secao" aria-labelledby="titulo-vantagens">
      <h2 id="titulo-vantagens">Vantagens de levar um livrinho para casa</h2>
      <div class="ttl-beneficios-grade">
        ${beneficios.map(b => `
          <div class="ttl-beneficio">
            <span class="ttl-beneficio-icone" aria-hidden="true">${b.icone}</span>
            <div>
              <strong>${TTLUI.escapo(b.titulo)}</strong>
              <p>${TTLUI.escapo(b.texto)}</p>
            </div>
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
        <button class="ttl-previa" type="button" data-src="${TTLUI.escapo(src)}"
                aria-label="Ampliar página interna de demonstração">
          <img src="${TTLUI.escapo(src)}" alt="Página interna do livrinho ${TTLUI.escapo(produto.nome)} para colorir"
               loading="lazy" width="800" height="1132" decoding="async" onerror="this.src='${TTL_CONFIG.capaFallback}'">
        </button>`).join('');
  }

  /* ---------- Galeria interativa + lightbox ---------- */
  const lightbox = document.getElementById('ttl-lightbox');
  function abrirLightbox(src, legenda) {
    if (!lightbox) return;
    lightbox.querySelector('.ttl-lightbox-conteudo img').src = src;
    lightbox.querySelector('.ttl-lightbox-legenda').textContent =
      `${legenda} — ${produto.nome}`;
    if (typeof lightbox.showModal === 'function') {
      lightbox.showModal();
    }
  }
  lightbox.querySelector('.ttl-lightbox-fechar').addEventListener('click', () => lightbox.close());

  raiz.querySelector('.ttl-galeria-miniaturas')?.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.ttl-miniatura');
    if (!botao) return;
    raiz.querySelectorAll('.ttl-miniatura').forEach(m => m.classList.remove('ativa'));
    botao.classList.add('ativa');
    document.getElementById('ttl-galeria-principal').src = botao.dataset.src;
  });

  document.getElementById('ttl-galeria-cabecalho').addEventListener('click', () => {
    abrirLightbox(document.getElementById('ttl-galeria-principal').src, 'Imagem ampliada');
  });
  document.getElementById('ttl-previas')?.querySelectorAll('.ttl-previa').forEach(botao => {
    botao.addEventListener('click', () => abrirLightbox(botao.dataset.src, 'Página de demonstração'));
  });

  /* ---------- Compra ---------- */
  document.getElementById('ttl-btn-adicionar-carrinho').addEventListener('click', () => {
    const adicionou = TTLCarrinho.adicionar(produto);
    TTLUI.atualizarBadge(true);
    if (adicionou) {
      TTLUI.toast(`"${produto.nome}" foi adicionado ao carrinho.`, 'sucesso');
      TTLUI.abrirCarrinho();
    } else {
      TTLUI.toast('Este livrinho já está no carrinho. Abra o carrinho para finalizar a compra.', 'aviso');
      TTLUI.abrirCarrinho();
    }
  });

  /* ---------- Relacionados (mesma categoria, quando existem) ---------- */
  const relacionados = (await TTLProdutos.publicados())
    .filter(p => p.id !== produto.id && p.categoria === produto.categoria)
    .slice(0, 4);
  const secaoRelacionados = document.getElementById('ttl-relacionados');
  if (relacionados.length > 0) {
    secaoRelacionados.hidden = false;
    secaoRelacionados.querySelector('.ttl-grade-vitrine').innerHTML =
      relacionados.map(p => TTLUI.cardProduto(p, { pequeno: true })).join('');
    TTLUI.observarRevelacao();
  }
})();
