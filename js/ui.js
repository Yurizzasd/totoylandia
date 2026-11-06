/* ============================================================
   ToToyLandia — UI compartilhada (cabeçalho, rodapé, carrinho, cards)
   ============================================================ */

const TTLUI = {
  /* ---------- Cabeçalho ---------- */

  montarHeader(pagina) {
    const header = document.getElementById('ttl-header');
    const qtd = TTLCarrinho.quantidade();
    header.innerHTML = `
      <p class="ttl-avisobar">Livrinhos incríveis para estimular a criatividade do seu pequeno!</p>
      <div class="ttl-header-inner">
        <a class="ttl-logo" href="index.html" aria-label="ToToyLandia — início">
          <img src="assets/logo.png" alt="ToToyLandia" width="48" height="48">
          <span class="ttl-logo-texto">ToToy<em>Landia</em></span>
        </a>
        <nav class="ttl-nav" id="ttl-nav-principal" aria-label="Navegação principal">
          <a href="index.html" class="${pagina === 'inicio' ? 'ativa' : ''}" ${pagina === 'inicio' ? 'aria-current="page"' : ''}>Início</a>
          <a href="catalogo.html" class="${pagina === 'catalogo' ? 'ativa' : ''}" ${pagina === 'catalogo' ? 'aria-current="page"' : ''}>Todos os livrinhos</a>
          <a href="catalogo.html?ordem=populares" class="${pagina === 'mais-vendidos' ? 'ativa' : ''}">Mais vendidos</a>
          <a href="index.html#colecoes" class="${pagina === 'colecoes' ? 'ativa' : ''}">Categorias</a>
          <a href="index.html#sobre" class="${pagina === 'sobre' ? 'ativa' : ''}">Sobre</a>
        </nav>
        <div class="ttl-header-acoes">
          <button class="ttl-icon-btn" id="ttl-btn-pesquisa" aria-label="Pesquisar" aria-expanded="false" aria-controls="ttl-search-barra" title="Pesquisar livrinhos">
            <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M21 21l-4.3-4.3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
          </button>
          <button class="ttl-icon-btn" id="ttl-btn-carrinho" aria-label="Abrir carrinho" title="Carrinho">
            <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true"><path d="M3 4h2.4l2.5 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21.5 8H6.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.5" cy="20.3" r="1.7" fill="currentColor"/><circle cx="17.5" cy="20.3" r="1.7" fill="currentColor"/></svg>
            <span class="ttl-badge ${(qtd > 0) ? 'visivel' : ''}" id="ttl-badge-carrinho">${qtd}</span>
          </button>
          <button class="ttl-menu-btn" id="ttl-btn-menu" aria-label="Abrir menu" aria-expanded="false" aria-controls="ttl-nav-principal">
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

    const btnPesquisa = header.querySelector('#ttl-btn-pesquisa');
    btnPesquisa.addEventListener('click', () => {
      const barra = header.querySelector('#ttl-search-barra');
      barra.hidden = !barra.hidden;
      btnPesquisa.setAttribute('aria-expanded', String(!barra.hidden));
      if (!barra.hidden) {
        barra.querySelector('#ttl-search-input').focus();
      } else {
        btnPesquisa.focus();
      }
    });

    const form = header.querySelector('#ttl-search-form');
    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      const termo = header.querySelector('#ttl-search-input').value.trim();
      if (termo) {
        window.location.href = `catalogo.html?busca=${encodeURIComponent(termo)}`;
      } else {
        TTLUI.toast('Digite um termo para pesquisar — por exemplo, "dinossauro".', 'aviso');
        form.querySelector('#ttl-search-input').focus();
      }
    });

    const botaoMenu = header.querySelector('#ttl-btn-menu');
    const nav = header.querySelector('#ttl-nav-principal');
    botaoMenu.addEventListener('click', () => {
      const aberto = nav.classList.toggle('aberta');
      botaoMenu.setAttribute('aria-expanded', String(aberto));
      botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
    nav.addEventListener('click', (evento) => {
      if (evento.target.closest('a')) { nav.classList.remove('aberta'); botaoMenu.setAttribute('aria-expanded', 'false'); }
    });
    /* Teclado: fecha o menu com Esc */
    header.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape' && nav.classList.contains('aberta')) {
        nav.classList.remove('aberta');
        botaoMenu.setAttribute('aria-expanded', 'false');
        botaoMenu.focus();
      }
    });
  },

  /* ---------- Rodapé ---------- */

  montarFooter() {
    const footer = document.getElementById('ttl-footer');
    footer.innerHTML = `
      <div class="ttl-footer-inner">
        <div class="ttl-footer-marca">
          <a class="ttl-logo" href="index.html" aria-label="ToToyLandia — início">
            <img src="assets/logo.png" alt="ToToyLandia" width="52" height="52" loading="lazy">
            <span class="ttl-logo-texto">ToToy<em>Landia</em></span>
          </a>
          <p class="ttl-footer-slogan">Colorir é aprender brincando: livrinhos em PDF para as famílias imprimirem em casa.</p>
          <p class="ttl-footer-sticker">Diversão, criatividade e aprendizado em um só lugar!</p>
        </div>
        <div class="ttl-footer-coluna">
          <h4>Navegação</h4>
          <a href="index.html">Início</a>
          <a href="catalogo.html">Todos os livrinhos</a>
          <a href="catalogo.html?ordem=populares">Mais vendidos</a>
          <a href="index.html#colecoes">Categorias</a>
          <a href="index.html#sobre">Sobre</a>
        </div>
        <div class="ttl-footer-coluna">
          <h4>Ajuda</h4>
          <a href="index.html#como-funciona">Como funciona?</a>
          <a href="index.html#faq">Perguntas frequentes</a>
          <a href="catalogo.html">Quero comprar</a>
        </div>
        <div class="ttl-footer-coluna">
          <h4>Compra segura</h4>
          <p>Os pagamentos são processados pela <strong>Kiwify</strong> com Pix, cartão ou boleto, e os PDFs chegam automaticamente no seu e-mail após a confirmação.</p>
          <p class="ttl-footer-pagamentos">
            <span class="ttl-chip-pagamento">Pagamentos</span>
            <span>Kiwify · Pix · Cartão · Boleto</span>
          </p>
        </div>
      </div>
      <div class="ttl-footer-base">
        <div class="ttl-footer-base-conteudo">
          <p>© <span id="ttl-ano"></span> ToToyLandia. Todos os direitos reservados.</p>
          <span class="ttl-footer-nota-entrega">
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8.5 10.5V7a3.5 3.5 0 0 1 7 0v3.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>
            Livrinhos digitais · Pagamento seguro · Entrega imediata
          </span>
        </div>
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
          <div class="ttl-carrinho-vazio-icone" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="30" height="30"><path d="M3 4h2.4l2.5 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21.5 8H6.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.5" cy="20.3" r="1.7" fill="currentColor"/><circle cx="17.5" cy="20.3" r="1.7" fill="currentColor"/></svg>
          </div>
          <p>Seu carrinho está vazio.</p>
          <a class="ttl-btn ttl-btn-primario" href="catalogo.html">Ver livrinhos</a>
        </div>`;
      rodape.hidden = true;
      return;
    }

    lista.innerHTML = itens.map(p => {
      const temLink = TTLProdutos.linkKiwifyValido(p.linkKiwify);
      return `
      <div class="ttl-carrinho-item" data-id="${TTLUI.escapo(p.id)}">
        <img src="${TTLUI.escapo(p.capa)}" alt="" width="56" height="68" loading="lazy" onerror="this.src='${TTL_CONFIG.capaFallback}'">
        <div class="ttl-carrinho-item-info">
          <p class="ttl-carrinho-item-nome"><a href="produto.html?id=${encodeURIComponent(p.id)}">${TTLUI.escapo(p.nome)}</a></p>
          <p class="ttl-carrinho-item-preco">
            ${TTLUI.escapo(TTLFormatarPreco(p.preco))}
            ${p.tinhaPromocao ? `<s>${TTLUI.escapo(TTLFormatarPreco(p.precoNormal))}</s>` : ''}
          </p>
          ${temLink ? '' : '<p class="ttl-aviso-em-breve">Checkout em preparação</p>'}
        </div>
        <button class="ttl-carrinho-remover" aria-label="Remover ${TTLUI.escapo(p.nome)} do carrinho" title="Remover">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
        </button>
      </div>`;
    }).join('');

    lista.querySelectorAll('.ttl-carrinho-remover').forEach(botao => {
      botao.addEventListener('click', () => {
        const item = botao.closest('.ttl-carrinho-item');
        const itemNome = item?.querySelector('.ttl-carrinho-item-nome')?.textContent.trim() ?? 'Item';
        TTLCarrinho.remover(item.dataset.id);
        TTLUI.atualizarCarrinho();
        TTLUI.atualizarBadge();
        TTLUI.toast(`"${itemNome}" foi removido do carrinho.`, 'info', 2800);
      });
    });

    totalEl.textContent = TTLFormatarPreco(TTLCarrinho.total());
    rodape.hidden = false;
  },

  finalizarCompra() {
    const itens = TTLCarrinho.itens();
    if (itens.length === 0) return;

    const comLink = itens.filter(p => TTLProdutos.linkKiwifyValido(p.linkKiwify));
    const semLink = itens.filter(p => !TTLProdutos.linkKiwifyValido(p.linkKiwify));

    if (semLink.length > 0) {
      TTLUI.toast(
        semLink.length === 1
          ? 'Um dos livrinhos do carrinho ainda está com o checkout em preparação. Você pode finalizar os itens disponíveis agora.'
          : `${semLink.length} livrinhos do carrinho ainda estão com o checkout em preparação. Você pode finalizar os itens disponíveis agora.`,
        'aviso', 6000
      );
    }
    if (comLink.length > 0) {
      comLink.forEach(p => window.open(p.linkKiwify, '_blank', 'noopener,noreferrer'));
    } else {
      TTLUI.fecharCarrinho();
    }
  },

  atualizarBadge(pulsar = false) {
    const badge = document.getElementById('ttl-badge-carrinho');
    if (!badge) return;
    const qtd = TTLCarrinho.quantidade();
    badge.textContent = qtd;
    badge.classList.toggle('visivel', qtd > 0);
    if (pulsar && qtd > 0) {
      badge.classList.remove('pulsar');
      void badge.offsetWidth;
      badge.classList.add('pulsar');
    }
  },

  /* ---------- Gaveta + estrutura base (injeta antes do fim do body) ---------- */

  montarGaveta() {
    if (document.getElementById('ttl-gaveta-carrinho')) return;
    const gaveta = document.createElement('aside');
    gaveta.className = 'ttl-gaveta-carrinho';
    gaveta.id = 'ttl-gaveta-carrinho';
    gaveta.setAttribute('aria-hidden', 'true');
    gaveta.setAttribute('aria-label', 'Carrinho de compras');
    gaveta.innerHTML = `
      <div class="ttl-carrinho-cabecalho">
        <h3>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M3 4h2.4l2.5 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21.5 8H6.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.5" cy="20.3" r="1.7" fill="currentColor"/><circle cx="17.5" cy="20.3" r="1.7" fill="currentColor"/></svg>
          Meu carrinho
        </h3>
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
        <p class="ttl-carrinho-entrega">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>PDF entregue por e-mail logo após o pagamento, via Kiwify. Vocês podem imprimir em casa quantas vezes quiserem.</span>
        </p>
        <div class="ttl-carrinho-botoes">
          <button class="ttl-btn ttl-btn-primario ttl-carrinho-finalizar">Finalizar compra</button>
          <button class="ttl-btn ttl-btn-secundario ttl-carrinho-continuar">Continuar comprando</button>
        </div>
      </div>
    `;
    gaveta.querySelector('.ttl-carrinho-fechar').addEventListener('click', () => TTLUI.fecharCarrinho());
    gaveta.querySelector('.ttl-carrinho-finalizar').addEventListener('click', () => TTLUI.finalizarCompra());
    gaveta.querySelector('.ttl-carrinho-continuar').addEventListener('click', () => TTLUI.fecharCarrinho());

    const fundo = document.createElement('div');
    fundo.className = 'ttl-gaveta-fundo';
    fundo.addEventListener('click', () => TTLUI.fecharCarrinho());

    document.body.append(fundo, gaveta);

    document.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape' && document.querySelector('.ttl-gaveta-carrinho.aberta')) TTLUI.fecharCarrinho();
    });

    /* trava o scroll do corpo quando a gaveta abre */
    const observadorGaveta = new MutationObserver(() => {
      const aberta = gaveta.classList.contains('aberta');
      document.body.style.overflow = aberta ? 'hidden' : '';
    });
    observadorGaveta.observe(gaveta, { attributes: true, attributeFilter: ['class'] });

    document.addEventListener('ttl-carrinho-mudou', () => TTLUI.atualizarBadge(true));
  },

  /* ---------- Card de produto ---------- */

  cardProduto(produto, { pequeno = false } = {}) {
    const temPromo = produto.precoPromocional != null && Number(produto.precoPromocional) < Number(produto.preco);
    const temLink = TTLProdutos.linkKiwifyValido(produto.linkKiwify);

    const selos = [
      produto.maisVendido ? '<span class="ttl-card-selo">Mais vendido</span>' : '',
      temPromo ? '<span class="ttl-card-selo ttl-card-selo-promo">Promoção</span>' : '',
      temLink ? '' : '<span class="ttl-card-selo ttl-card-selo-em-breve">Em breve</span>'
    ].join('');
    const categoria = `<span class="ttl-card-categoria">${TTLUI.escapo(TTLProdutos.categoriaNome(produto.categoria))}</span>`;

    const iconeDesenhos = '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M6 2h9l5 5v15H6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 2v5h5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 13h6M9 16.5h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    const iconeIdade = '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><circle cx="12" cy="7" r="3.4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

    return `
      <article class="ttl-card ${pequeno ? 'ttl-card-pequeno' : ''}" data-id="${TTLUI.escapo(produto.id)}">
        <a class="ttl-card-capa" href="produto.html?id=${encodeURIComponent(produto.id)}" aria-label="${TTLUI.escapo(produto.nome)}">
          <img src="${TTLUI.escapo(produto.capa || TTL_CONFIG.capaFallback)}" alt="Capa do livrinho ${TTLUI.escapo(produto.nome)}" loading="lazy" width="800" height="1132" decoding="async" onerror="this.src='${TTL_CONFIG.capaFallback}'">
          <span class="ttl-card-info">${selos}</span>
        </a>
        <div class="ttl-card-corpo">
          <span class="ttl-card-categoria">${TTLUI.escapo(TTLProdutos.categoriaNome(produto.categoria))}</span>
          <h3 class="ttl-card-nome"><a href="produto.html?id=${encodeURIComponent(produto.id)}">${TTLUI.escapo(produto.nome)}</a></h3>
          <p class="ttl-card-descricao">${TTLUI.escapo(produto.curta || produto.descricao)}</p>
          <div class="ttl-card-chips">
            ${Number(produto.desenhos) > 0 ? `<span class="ttl-chip-info">${iconeDesenhos} ${Number(produto.desenhos)} desenhos</span>` : ''}
            ${produto.faixaEtaria ? `<span class="ttl-chip-info">${iconeIdade} ${TTLUI.escapo(produto.faixaEtaria)}</span>` : ''}
            ${temPromo ? `<span class="ttl-chip-info">Economize ${TTLUI.escapo(TTLFormatarPreco(Number(produto.preco) - Number(produto.precoPromocional)))}</span>` : ''}
          </div>
          <div class="ttl-card-rodape">
            <div class="ttl-card-valores">
              ${temPromo ? `<s>${TTLUI.escapo(TTLFormatarPreco(produto.preco))}</s>` : ''}
              <strong>${TTLUI.escapo(TTLFormatarPreco(temPromo ? produto.precoPromocional : produto.preco))}</strong>
            </div>
          </div>
          <a class="ttl-btn ttl-btn-primario ttl-card-botao" href="produto.html?id=${encodeURIComponent(produto.id)}">
            Ver produto
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
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

  /** Confirmação padronizada para ações destrutivas. */
  confirmar(mensagem) {
    return window.confirm(mensagem);
  },

  /** Observa elementos .ttl-revelar e aplica a animação de entrada. */
  observarRevelacao() {
    const alvos = document.querySelectorAll('.ttl-revelar:not(.revelado)');
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

/* Base de cada página: header, footer, gaveta e badge. */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('ttl-header');
  if (header) {
    TTLUI.montarHeader(header.dataset.pagina ?? 'inicio');
    TTLUI.montarFooter();
    TTLUI.atualizarBadge();
  }
  TTLUI.montarGaveta();
});
