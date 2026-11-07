/* ============================================================
   ToToyLandia — Sistema de ícones (biblioteca PNG oficial)
   ------------------------------------------------------------
   Fonte única: assets/icons/ — 87 PNGs recortados com transparência
   real (pacote oficial da marca). NADA é redesenho: os PNGs são
   referenciados diretamente, preservando traço, cor e sombra rosa
   da identidade.

   Dois emitentes:

   1) PNG — conceito coberto pela biblioteca oficial:
      <img> com dimensões proporcionais ao PNG original
      (aspecto exato via DIMS), object-fit: contain no CSS.

   2) linha (SVG inline, corrente) — apenas para conceitos SEM PNG
      na biblioteca (menu, chevron abaixo, ampliar) ou contextos
      minúsculos onde o traço cartoon ficaria ilegível (chips 13px).

   Tamanhos: o parâmetro define o MAIOR lado; largura/altura saem
   proporcionais ao arquivo — sem distorção, sem corte.
   ============================================================ */

const TTLIcones = (() => {

  /* ---------- dimensões conhecidas (manifest oficial) ---------- */

  const DIMS = {
    'interface/pesquisar.png': [139, 136],
    'interface/carrinho-alternativo.png': [165, 135],
    'interface/fechar.png': [121, 120],
    'interface/avancar.png': [124, 114],
    'interface/voltar.png': [123, 114],
    'interface/download.png': [129, 121],
    'interface/inicio.png': [146, 136],
    'interface/categorias.png': [128, 126],
    'interface/informacoes.png': [135, 126],
    'interface/ajuda.png': [143, 126],
    'interface/destaque-estrela.png': [134, 136],
    'interface/favoritos.png': [137, 125],
    'interface/cartao-de-pagamento.png': [139, 112],
    'interface/suporte-headset.png': [152, 126],
    'interface/etiqueta-promocao.png': [124, 118],
    'interface/desconto-percentual.png': [125, 121],
    'interface/filtrar.png': [116, 119],
    'interface/ordenar.png': [126, 113],
    'interface/imprimir.png': [130, 122],
    'interface/presentes.png': [145, 138],
    'interface/voltar-ao-topo.png': [118, 89],
    'interface/seguranca.png': [127, 136],
    'beneficios/compra-segura.png': [135, 136],
    'beneficios/entrega-rapida.png': [115, 132],
    'beneficios/imprimir-alternativo.png': [141, 132],
    'beneficios/pagamento-seguro.png': [148, 129],
    'beneficios/suporte-alternativo.png': [148, 135],
    'beneficios/qualidade-garantida.png': [129, 135],
    'beneficios/descontos-alternativo.png': [141, 138],
    'beneficios/novidades-alternativo.png': [138, 138],
    'categorias/livrinhos-de-colorir.png': [247, 185],
    'categorias/festas-e-decoracao.png': [164, 190],
    'categorias/materiais-educativos.png': [195, 163],
    'categorias/lembrancinhas.png': [178, 180],
    'categorias/papelaria-personalizada.png': [197, 174],
    'categorias/colecoes-tematicas.png': [213, 198],
    'categorias/destaque.png': [154, 161],
    'temas/presentes-alternativo.png': [144, 137],
    'temas/aniversario.png': [159, 143],
    'temas/decoracao.png': [138, 135],
    'temas/diversao.png': [149, 132],
    'temas/dinossauros-alternativo.png': [140, 135],
    'temas/dinossauro-cabeca.png': [157, 128],
    'temas/infantil.png': [210, 130],
    'temas/aprender.png': [153, 133],
    'temas/explorar.png': [150, 144],
    'temas/livro-aberto.png': [155, 124],
    'temas/chapeu-de-festa.png': [114, 133],
    'temas/atividades-pintura.png': [149, 131],
    'temas/educacao-capelo.png': [147, 122],
    'temas/animais-pata.png': [140, 127],
    'temas/novidades-foguete.png': [137, 130],
    'temas/lancamentos-brilhos.png': [112, 109],
    'redes-e-contato/concluido.png': [126, 120],
    'redes-e-contato/email-alternativo.png': [134, 109],
    'redes-e-contato/contato-email.png': [132, 109],
    'redes-e-contato/whatsapp.png': [122, 120],
    'redes-e-contato/whatsapp-alternativo.png': [129, 118],
    'redes-e-contato/instagram.png': [128, 113],
    'redes-e-contato/youtube.png': [133, 110],
    'redes-e-contato/telegram.png': [124, 118],
    'redes-e-contato/minha-conta.png': [120, 120],
    'redes-e-contato/sair.png': [130, 117],
    'redes-e-contato/endereco.png': [104, 124],
    'redes-e-contato/calendario.png': [129, 122],
    'redes-e-contato/atencao.png': [125, 120],
    'redes-e-contato/aviso.png': [131, 117],
    'redes-e-contato/informacoes-alternativo.png': [132, 118],
    'redes-e-contato/ajuda-alternativo.png': [123, 117],
    'utilitarios/pdf.png': [110, 121],
    'utilitarios/copiar.png': [125, 121],
    'utilitarios/lista-de-desejos.png': [125, 125],
    'utilitarios/avaliacoes.png': [120, 122],
    'utilitarios/depoimentos.png': [142, 119]
  };

  /* ---------- emitentes ---------- */

  const LINHA_ATTR = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';

  /** Ícone de linha: cor controlada por CSS via currentColor. */
  function linha(conteudo, tamanho = 20) {
    return `<svg ${LINHA_ATTR} width="${tamanho}" height="${tamanho}">${conteudo}</svg>`;
  }

  /** Ícone oficial da biblioteca: <img> proporcional ao PNG original.
   *  `tamanho` = maior lado; largura/altura derivam da proporção real
   *  do arquivo (DIMS), garantindo inércia de layout sem distorção. */
  function png(arquivo, tamanho = 32) {
    const dims = DIMS[arquivo] || [1, 1];
    const maior = Math.max(dims[0], dims[1]);
    const largura = Math.round((tamanho * dims[0]) / maior);
    const altura = Math.round((tamanho * dims[1]) / maior);
    return `<img src="assets/icons/${arquivo}" width="${largura}" height="${altura}" class="ttl-ico-img" alt="" aria-hidden="true" decoding="async">`;
  }

  /* ---------- registro público ---------- */

  const REGISTRO = {

    /* ===== interface / navegação ===== */

    busca:              (sz) => png('interface/pesquisar.png', sz),
    lupaCartoon:        (sz) => png('interface/pesquisar.png', sz),
    carrinho:           (sz) => png('interface/carrinho-alternativo.png', sz),
    carrinhoCheio:      (sz) => png('interface/carrinho-alternativo.png', sz),
    menu:               (sz) => linha('<path d="M4 7h16M4 12h16M4 17h16"/>', sz),
    fechar:             (sz) => png('interface/fechar.png', sz),
    setaDireita:        (sz) => png('interface/avancar.png', sz),
    setaEsquerda:       (sz) => png('interface/voltar.png', sz),
    chevronAbaixo:      (sz) => linha('<path d="M6 9l6 6 6-6"/>', sz),
    ampliar:            (sz) => linha('<path d="M4 9V4h6M20 15v5h-6M4 4l6 6M20 20l-6-6"/>', sz),
    download:           (sz) => png('interface/download.png', sz),
    filtro:             (sz) => png('interface/filtrar.png', sz),
    cadeado:            (sz) => linha('<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V7a3.5 3.5 0 0 1 7 0v3.5"/>', sz),
    casa:               (sz) => png('interface/inicio.png', sz),
    grade:              (sz) => png('interface/categorias.png', sz),
    copiar:             (sz) => png('utilitarios/copiar.png', sz),

    /* ===== estados e sinais ===== */

    check:              (sz) => png('redes-e-contato/concluido.png', sz),
    checkLinha:         (sz) => linha('<path d="M20 6L9 17l-5-5"/>', sz),
    info:               (sz) => png('interface/informacoes.png', sz),
    ajuda:              (sz) => png('interface/ajuda.png', sz),
    aviso:              (sz) => png('redes-e-contato/aviso.png', sz),
    estrela:            (sz) => png('interface/destaque-estrela.png', sz),
    coracao:            (sz) => png('interface/favoritos.png', sz),
    brilhos:            (sz) => png('temas/lancamentos-brilhos.png', sz),
    destaque:           (sz) => png('categorias/destaque.png', sz),

    /* ===== confiança / benefícios ===== */

    escudo:             (sz) => png('beneficios/compra-segura.png', sz),
    raio:               (sz) => png('beneficios/entrega-rapida.png', sz),
    impressora:         (sz) => png('beneficios/imprimir-alternativo.png', sz),
    cartao:             (sz) => png('interface/cartao-de-pagamento.png', sz),
    headset:            (sz) => png('interface/suporte-headset.png', sz),
    suporte:            (sz) => png('beneficios/suporte-alternativo.png', sz),
    seloCheck:          (sz) => png('beneficios/qualidade-garantida.png', sz),
    desconto:           (sz) => png('beneficios/desconto-percentual.png', sz),
    descontos:          (sz) => png('beneficios/descontos-alternativo.png', sz),
    etiqueta:           (sz) => png('interface/etiqueta-promocao.png', sz),
    pagamentoSeguro:    (sz) => png('beneficios/pagamento-seguro.png', sz),
    novidades:          (sz) => png('beneficios/novidades-alternativo.png', sz),

    /* ===== tema / categorias ilustradas ===== */

    dino:               (sz) => png('temas/dinossauro-cabeca.png', sz),
    dinossauros:        (sz) => png('temas/dinossauros-alternativo.png', sz),
    arcoiris:           (sz) => png('temas/infantil.png', sz),
    formatura:          (sz) => png('temas/educacao-capelo.png', sz),
    bolo:               (sz) => png('temas/aniversario.png', sz),
    foguete:            (sz) => png('temas/novidades-foguete.png', sz),
    explorar:           (sz) => png('temas/explorar.png', sz),
    paw:                (sz) => png('temas/animais-pata.png', sz),
    crown:              (sz) => png('temas/diversao.png', sz),
    livroAberto:        (sz) => png('temas/aprender.png', sz),
    livroTrazido:       (sz) => png('temas/livro-aberto.png', sz),
    livroEstrela:       (sz) => png('categorias/livrinhos-de-colorir.png', sz),
    festa:              (sz) => png('temas/chapeu-de-festa.png', sz),
    confete:            (sz) => png('temas/decoracao.png', sz),
    baloes:             (sz) => png('temas/decoracao.png', sz),
    presente:           (sz) => png('categorias/lembrancinhas.png', sz),
    presentes:          (sz) => png('interface/presentes.png', sz),
    paleta:             (sz) => png('categorias/papelaria-personalizada.png', sz),
    festasEDecoracao:   (sz) => png('categorias/festas-e-decoracao.png', sz),
    materiaisEducativos:(sz) => png('categorias/materiais-educativos.png', sz),
    colecoesTematicas:  (sz) => png('categorias/colecoes-tematicas.png', sz),
    pintura:            (sz) => png('temas/atividades-pintura.png', sz),

    /* ===== contato ===== */

    email:              (sz) => png('redes-e-contato/email-alternativo.png', sz),
    pdfDoc:             (sz) => png('utilitarios/pdf.png', sz),
    whatsapp:           (sz) => png('redes-e-contato/whatsapp.png', sz),
    instagram:          (sz) => png('redes-e-contato/instagram.png', sz),
    youtube:            (sz) => png('redes-e-contato/youtube.png', sz),
    telegram:           (sz) => png('redes-e-contato/telegram.png', sz),
    minhaConta:         (sz) => png('redes-e-contato/minha-conta.png', sz),
    endereco:           (sz) => png('redes-e-contato/endereco.png', sz),

    /* ===== sem PNG na biblioteca — linha (chips minúsculos e controles) ===== */

    desenhos: (sz) => linha(
      '<path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5"/><path d="M9 13h6M9 16.5h4"/>', sz),

    idade: (sz) => linha(
      '<circle cx="12" cy="7" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>', sz),

    chama: (sz) => linha('<path d="M12 21c3.9 0 6.5-2.4 6.5-6 0-2.5-1.3-4.6-3.2-6.2-.2 1-.8 1.9-1.7 2.4C13.9 8.9 14 5.4 11 3c.2 2.7-.9 4.5-2.4 6C7 10.6 5.5 12.4 5.5 15c0 3.6 2.6 6 6.5 6z"/>', sz),

    car: (sz) => linha(
      '<path d="M3 16v-2.1c0-.8.3-1.5.9-2l1-2.8a1.8 1.8 0 0 1 1.7-1.2h7.6c.7 0 1.3.4 1.6 1l1.6 3 2.2.6a2 2 0 0 1 1.4 1.9V16a1.2 1.2 0 0 1-1.2 1.2H4.2A1.2 1.2 0 0 1 3 16z"/>' +
      '<circle cx="7.4" cy="17.6" r="2"/><circle cx="16.8" cy="17.6" r="2"/>', sz)
  };

  /* ---------- API pública ---------- */

  /** Devolve o markup do ícone `nome` com o tamanho pedido (maior lado). */
  function icone(nome, tamanho) {
    const def = REGISTRO[nome];
    if (!def) return '';
    return def(tamanho);
  }

  /** Substitui no lugar: injeta o ícone dentro do elemento e devolve-o. */
  function montar(el) {
    const nome = el.getAttribute('data-ico');
    const tamanho = el.getAttribute('data-ico-tamanho');
    if (!nome || !REGISTRO[nome]) return el;
    el.innerHTML = icone(nome, tamanho ? Number(tamanho) : undefined);
    el.removeAttribute('data-ico');
    return el;
  }

  /** Hidrata todos os placeholders [data-ico] presentes no documento. */
  function hidratar(raiz = document) {
    raiz.querySelectorAll('[data-ico]').forEach(montar);
  }

  return { icone, montar, hidratar, linha, png, nomes: Object.keys(REGISTRO) };
})();

/* Hidratação imediata: o script roda no fim do body, o DOM já está pronto. */
TTLIcones.hidratar();

/* Páginas que renderizam HTML por JavaScript (carrinho, cards) rehidratam
   chamando TTLIcones.hidratar() após montar o innerHTML. */
document.addEventListener('DOMContentLoaded', () => {
  document.dispatchEvent(new Event('ttl-icones-pronto'));
});
