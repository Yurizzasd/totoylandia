/* ============================================================
   ToToyLandia — UI compartilhada (cabeçalho, rodapé, carrinho, cards)
   ============================================================ */

const TTLUI = {
  /* ---------- Cabeçalho ---------- */

  montarHeader(pagina) {
    const header = document.getElementById('ttl-header');
    const qtd = TTLCarrinho.quantidade();
    header.innerHTML = `
      <div class="ttl-header-inner">
        <a class="ttl-logo" href="index.html" aria-label="ToToyLandia — início">
          <img src="assets/logo.png" alt="ToToyLandia" width="56" height="56">
          <span class="ttl-logo-texto">ToToy<em>Landia</em></span>
        </a>
        <nav class="ttl-nav" aria-label="Navegação principal">
          <a href="index.html" class="${pagina === 'inicio' ? 'ativa' : ''}">Início</a>
          <a href="catalogo.html" class="${pagina === 'catalogo' ? 'ativa' : ''}">Todos os livrinhos</a>
          <a href="catalogo.html#mais-vendidos" class="${pagina === 'mais-vendidos' ? 'ativa' : ''}">Mais vendidos</a>
          <a href="index.html#colecoes" class="${pagina === 'colecoes' ? 'ativa' : ''}">Categorias</a>
          <a href="index.html#sobre" class="${pagina === 'sobre' ? 'ativa' : ''}">Sobre</a>
        </nav>
        <div class="ttl-header-acoes">
          <button class="ttl-icon-btn" id="ttl-btn-pesquisa" aria-label="Pesquisar" title="Pesquisar livrinhos">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M21 21l-4.3-4.3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
          </button>
          <button class="ttl-icon-btn" id="ttl-btn-carrinho" aria-label="Abrir carrinho" title="Carrinho">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M3 4h2.4l2.5 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21.5 8H6.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.5" cy="20.3" r="1.7" fill="currentColor"/><circle cx="17.5" cy="20.3" r="1.7" fill="currentColor"/></svg>
            <span class="ttl-badge ${(qtd > 0) ? 'visivel' : ''}" id="ttl-badge-carrinho">${qtd}</span>
          </button>
          <button class="ttl-menu-btn" id="ttl-btn-menu" aria-label="Abrir menu" aria-expanded="false">
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
      <div class="ttl-search-barra" id="ttl-search-barra" hidden>
        <form id="ttl-search-form" role="search">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M21 21l-4.3-4.3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
          <input type="search" id="ttl-search-input" placeholder="O que o seu pequeno quer colorir hoje?" aria-label="Pesquisar livrinhos" autocomplete="off">
          <button type="submit" class="ttl-btn-mini">Buscar</button>
        </form>
      </div>
    `;

    header.querySelector('#ttl-btn-carrinho').addEventListener('click', () => TTLUI.abrirCarrinho());
    header.querySelector('#ttl-btn-pesquisa').addEventListener('click', () => {
      const barra = header.querySelector('#ttl-search-barra');
      barra.hidden = !barra.hidden;
      if (!barra.hidden) barra.querySelector('#ttl-search-input').focus();
    });
    const form = header.querySelector('#ttl-search-form');
    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      const termo = header.querySelector('#ttl-search-input').value.trim();
      if (termo) window.location.href = `catalogo.html?busca=${encodeURIComponent(termo)}`;
    });

    const botaoMenu = header.querySelector('#ttl-btn-menu');
    const nav = header.querySelector('.ttl-nav');
    botaoMenu.addEventListener('click', () => {
      const aberto = nav.classList.toggle('aberta');
      botaoMenu.setAttribute('aria-expanded', String(aberto));
    });
    nav.addEventListener('click', (evento) => {
      if (evento.target.tagName === 'A') { nav.classList.remove('aberta'); botaoMenu.setAttribute('aria-expanded', 'false'); }
    });
  },

  /* ---------- Rodapé ---------- */

  montarFooter() {
    const footer = document.getElementById('ttl-footer');
    footer.innerHTML = `
      <div class="ttl-footer-inner">
        <div class="ttl-footer-marca">
          <img src="assets/logo.png" alt="Logotipo da ToToyLandia" width="72" height="72" loading="lazy">
          <p class="ttl-footer-slogan">Livros de colorir em PDF para transformar cada momento em uma aventura cheia de cores.</p>
        </div>
        <div class="ttl-footer-coluna">
          <h4>Loja</h4>
          <a href="index.html">Início</a>
          <a href="catalogo.html">Todos os livrinhos</a>
          <a href="catalogo.html?ordem=populares">Mais vendidos</a>
          <a href="index.html#colecoes">Categorias</a>
        </div>
        <div class="ttl-footer-coluna">
          <h4>Ajuda</h4>
          <a href="index.html#faq">Como funciona</a>
          <a href="index.html#sobre">Sobre a ToToyLandia</a>
        </div>
        <div class="ttl-footer-coluna">
          <h4>Segurança</h4>
          <p>Compras processadas com segurança pela <strong>Kiwify</strong>. Os PDFs são entregues automaticamente por e-mail após a confirmação do pagamento.</p>
          <p class="ttl-footer-pagamento">
            <span class="ttl-chip-slack">Pagamentos</span> Kiwify · Pix · Cartão · Boleto
          </p>
        </div>
      </div>
      <div class="ttl-footer-base">
        <p>© <span id="ttl-ano"></span> ToToyLandia. Todos os direitos reservados.</p>
      </div>
    `;
    footer.querySelector('#ttl-ano').textContent = new Date().getFullYear();
  },

  /* ---------- Gaveta do carrinho ---------- */

  abrirCarrinho() {
    TTLUI.atualizarCarrinho();
    const gaveta = document.getElementById('ttl-gaveta-carrinho');
    gaveta.classList.add('aberta');
    gaveta.setAttribute('aria-hidden', 'false');
    gaveta.querySelector('.ttl-carrinho-fechar').focus();
  },

  fecharCarrinho() {
    const gaveta = document.getElementById('ttl-gaveta-carrinho');
    gaveta.classList.remove('aberta');
    gaveta.setAttribute('aria-hidden', 'true');
  },

  atualizarCarrinho() {
    const gaveta = document.getElementById('ttl-gaveta-carrinho');
    const itens = TTLCarrinho.itens();
    const lista = gaveta.querySelector('.ttl-carrinho-lista');
    const totalEl = gaveta.querySelector('.ttl-carrinho-total');
    const rodape = gaveta.querySelector('.ttl-carrinho-rodape');

    if (itens.length === 0) {
      lista.innerHTML = `
        <div class="ttl-carrinho-vazio">
          <div class="ttl-carrinho-vazio-estrela">★</div>
          <p>Seu carrinho está vazio.</p>
          <a class="ttl-btn ttl-btn-primario" href="catalogo.html">Ver livrinhos</a>
        </div>`;
      rodape.hidden = true;
      return;
    }

    lista.innerHTML = itens.map(p => {
      const temLink = Boolean(p.linkKiwify);
      return `
      <div class="ttl-carrinho-item" data-id="${TTLUI.escapo(p.id)}">
        <img src="${TTLUI.escapo(p.capa || TTL_CONFIG.capaFallback)}" alt="" width="56" loading="lazy" onerror="this.src='${TTL_CONFIG.capaFallback}'">
        <div class="ttl-carrinho-item-info">
          <p class="ttl-carrinho-item-nome">${TTLUI.escapo(p.nome)}</p>
          <p class="ttl-carrinho-item-preco">
            ${TTLUI.escapo(TTLFormatarPreco(p.preco))}
            ${p.tinhaPromocao ? `<s>${TTLUI.escapo(TTLFormatarPreco(p.precoNormal))}</s>` : ''}
          </p>
          ${temLink ? '' : '<p class="ttl-aviso-em-breve">Vendas em breve</p>'}
        </div>
        <button class="ttl-carrinho-remover" aria-label="Remover ${TTLUI.escapo(p.nome)} do carrinho" title="Remover">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
        </button>
      </div>`;
    }).join('');

    lista.querySelectorAll('.ttl-carrinho-remover').forEach(botao => {
      botao.addEventListener('click', () => {
        TTLCarrinho.remover(botao.closest('.ttl-carrinho-item').dataset.id);
        TTLUI.atualizarCarrinho();
        TTLUI.atualizarBadge();
      });
    });

    totalEl.textContent = TTLFormatarPreco(TTLCarrinho.total());
    rodape.hidden = false;
  },

  finalizarCompra() {
    const itens = TTLCarrinho.itens();
    const comLink = itens.filter(p => (p.linkKiwify ?? '').trim().length > 0);
    const semLink = itens.filter(p => !(p.linkKiwify ?? '').trim());

    if (itens.length === 0) return;
    if (semLink.length > 0) {
      TTLUI.toast(`Atenção: ${semLink.length} livrinho(s) no carrinho sem link de checkout Kiwify cadastrado no painel. Finalize os itens disponíveis e cadastre os links que faltam.`, 'aviso', 6000);
    }
    if (comLink.length > 0) {
      comLink.forEach(p => window.open(p.linkKiwify, '_blank', 'noopener,noreferrer'));
    }
  },

  atualizarBadge() {
    const badge = document.getElementById('ttl-badge-carrinho');
    if (!badge) return;
    const qtd = TTLCarrinho.quantidade();
    badge.textContent = qtd;
    badge.classList.toggle('visivel', qtd > 0);
  },

  /* ---------- Gaveta + estrutura base (injeta antes do fim do body) ---------- */

  montarGaveta() {
    const gaveta = document.createElement('aside');
    gaveta.className = 'ttl-gaveta-carrinho';
    gaveta.id = 'ttl-gaveta-carrinho';
    gaveta.setAttribute('aria-hidden', 'true');
    gaveta.setAttribute('aria-label', 'Carrinho de compras');
    gaveta.innerHTML = `
      <div class="ttl-carrinho-cabecalho">
        <h3><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M3 4h2.4l2.5 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21.5 8H6.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Meu carrinho</h3>
        <button class="ttl-carrinho-fechar" aria-label="Fechar carrinho">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
        </button>
      </div>
      <div class="ttl-carrinho-lista"></div>
      <div class="ttl-carrinho-rodape" hidden>
        <div class="ttl-carrinho-total-linha">
          <span>Total</span>
          <strong class="ttl-carrinho-total"></strong>
        </div>
        <p class="ttl-carrinho-entrega">PDF entregue por e-mail minutos após o pagamento (via Kiwify).</p>
        <button class="ttl-btn ttl-btn-primario ttl-carrinho-finalizar">Comprar agora</button>
      </div>
    `;
    gaveta.querySelector('.ttl-carrinho-fechar').addEventListener('click', () => TTLUI.fecharCarrinho());
    gaveta.querySelector('.ttl-carrinho-finalizar').addEventListener('click', () => TTLUI.finalizarCompra());

    const fundo = document.createElement('div');
    fundo.className = 'ttl-gaveta-fundo';
    fundo.addEventListener('click', () => TTLUI.fecharCarrinho());

    document.body.append(fundo, gaveta);

    document.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape') TTLUI.fecharCarrinho();
    });

    document.addEventListener('ttl-carrinho-mudou', () => TTLUI.atualizarBadge());
  },

  /* ---------- Card de produto ---------- */

  cardProduto(produto, { pequeno = false } = {}) {
    const temPromo = produto.precoPromocional != null && Number(produto.precoPromocional) < Number(produto.preco);
    const temLink = Boolean((produto.linkKiwify ?? '').trim());
    const info = `
      <div class="ttl-card-info">
        <span class="ttl-card-categoria">${TTLUI.escapo(TTLProdutos.categoriaNome(produto.categoria))}</span>
        ${produto.maisVendido ? '<span class="ttl-card-selo">Top venda</span>' : ''}
        ${temPromo ? '<span class="ttl-card-selo promo">Promoção</span>' : ''}
                ${temLink ? '' : '<span class="ttl-card-selo admin">Em breve</span>'}      </div>`;

    return `
      <article class="ttl-card ${pequeno ? 'ttl-card-pequeno' : ''}" data-id="${TTLUI.escapo(produto.id)}">
        <a class="ttl-card-capa" href="produto.html?id=${encodeURIComponent(produto.id)}" aria-label="${TTLUI.escapo(produto.nome)}">
          <img src="${TTLUI.escapo(produto.capa || TTL_CONFIG.capaFallback)}" alt="Capa do livrinho ${TTLUI.escapo(produto.nome)}" loading="lazy" width="600" height="800" onerror="this.src='${TTL_CONFIG.capaFallback}'">
          ${!pequeno ? info : ''}
        </a>
        <div class="ttl-card-corpo">
          <h3 class="ttl-card-nome"><a href="produto.html?id=${encodeURIComponent(produto.id)}">${TTLUI.escapo(produto.nome)}</a></h3>
          <p class="ttl-card-descricao">${TTLUI.escapo(produto.curta || produto.descricao)}</p>
          <div class="ttl-card-rodape">
            <div class="ttl-card-preco">
              <span class="ttl-card-pdf" title="Produto digital em PDF">
                <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M6 2h9l5 5v15H6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 2v5h5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 13h6M9 16.5h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                PDF
              </span>
              <span class="ttl-card-desenhos">${Number(produto.desenhos) || 0} desenhos</span>
            </div>
            <div class="ttl-card-valores">
              ${temPromo ? `<s>${TTLUI.escapo(TTLFormatarPreco(produto.preco))}</s>` : ''}
              <strong>${TTLUI.escapo(TTLFormatarPreco(temPromo ? produto.precoPromocional : produto.preco))}</strong>
            </div>
          </div>
          <a class="ttl-btn ttl-btn-secundario ttl-card-botao" href="produto.html?id=${encodeURIComponent(produto.id)}">Ver livrinho</a>
        </div>
      </article>
    `;
  },

  /* ---------- Toast ---------- */

  toast(mensagem, tipo = 'info', duracao = 4200) {
    let caixa = document.getElementById('ttl-toasts');
    if (!caixa) {
      caixa = document.createElement('div');
      caixa.id = 'ttl-toasts';
      caixa.className = 'ttl-toasts';
      caixa.setAttribute('role', 'status');
      caixa.setAttribute('aria-live', 'polite');
      document.body.appendChild(caixa);
    }
    const aviso = document.createElement('div');
    aviso.className = `ttl-toast ttl-toast-${tipo}`;
    aviso.textContent = mensagem;
    caixa.appendChild(aviso);
    requestAnimationFrame(() => aviso.classList.add('visivel'));
    setTimeout(() => {
      aviso.classList.remove('visivel');
      setTimeout(() => aviso.remove(), 400);
    }, duracao);
  },

  /** Confirmação padronizada para ações destrutivas no painel. */
  confirmar(mensagem) {
    return window.confirm(mensagem);
  },

  /** Observa elementos .ttl-revelar e aplica a animação de entrada. */
  observarRevelacao() {
    const alvos = document.querySelectorAll('.ttl-revelar');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      alvos.forEach(el => el.classList.add('revelado'));
      return;
    }
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('revelado');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });
    alvos.forEach(el => observador.observe(el));
  },

  escapo: ttlEscapar,
  formata: TTLFormatarPreco
};

/* Base de cada página: header montado + gaveta do carrinho. */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('ttl-header');
  if (header) {
    TTLUI.montarHeader(header.dataset.pagina ?? 'inicio');
    TTLUI.montarFooter();
    TTLUI.atualizarBadge();
  }
  TTLUI.montarGaveta();
});
