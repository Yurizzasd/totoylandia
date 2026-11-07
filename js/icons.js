/* ============================================================
   ToToyLandia — Sistema de ícones SVG (identidade própria)
   ------------------------------------------------------------
   Duas famílias, uma escala de tela:

   1) LINHA — interações de interface (busca, fechar, setas, chevron).
      Grade 24, stroke 2, cor corrente (CSS manda a cor).

   2) CHEIA (cartoon) — ícones ilustrativos da marca (tiles de
      categoria, benefícios, estados vazios, confiança).
      Grade 48 (autoria em 24 dentro de <g transform="scale(2)">),
      contorno vinho uniforme (stroke 2 dentro da escala = 4/48),
      fills só com as cores da identidade.

   A proporção traço/tamanho é idêntica nas duas famílias
   (2/24 = 4/48), o que garante nitidez e peso visual igual
   em qualquer resolução.
   ============================================================ */

const TTLIcones = (() => {

  /* ---------- gabaritos ---------- */

  const LINHA_ATTR = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';

  /** Ícone de linha: cor controlada por CSS via currentColor. */
  function linha(conteudo, tamanho = 20) {
    return `<svg ${LINHA_ATTR} width="${tamanho}" height="${tamanho}">${conteudo}</svg>`;
  }

  /** Ícone cheio: conteúdo desenhado em grade 24, ampliado 2x (48).
   *  Contorno vinho uniforme; fills com as variáveis da identidade. */
  function cheio(conteudo, tamanho = 28) {
    return `<svg viewBox="0 0 48 48" width="${tamanho}" height="${tamanho}" fill="none" stroke="var(--ttl-ink, #351A36)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><g transform="scale(2)">${conteudo}</g></svg>`;
  }

  const t = {
    rosa:      'var(--ttl-rosa, #E83D96)',
    rosaClaro: 'var(--ttl-rosa-suave, #F5B6D4)',
    azul:      'var(--ttl-azul, #2FA7E0)',
    azulClaro: 'var(--ttl-azul-claro, #9DDDF5)',
    azulEscuro:'var(--ttl-azul-escuro, #10629E)',
    amarelo:   'var(--ttl-amarelo, #FFD66B)',
    creme:     'var(--ttl-creme, #FFF9F1)',
    branco:    'var(--ttl-branco, #FFFFFF)',
    verde:     'var(--ttl-verde, #4CC98A)',
    laranja:   'var(--ttl-laranja, #FF9A52)'
  };

  /* ---------- registos ---------- */

  const REGISTRO = {

    /* ===== FAMÍLIA LINHA — interface ===== */

    busca: (sz) => linha('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>', sz),

    carrinho: (sz) => linha(
      '<path d="M3 4h2.4l2.5 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21.5 8H6.2"/>' +
      '<circle cx="10.5" cy="20.3" r="1.7"/><circle cx="17.5" cy="20.3" r="1.7"/>', sz),

    menu: (sz) => linha('<path d="M4 7h16M4 12h16M4 17h16"/>', sz),

    fechar: (sz) => linha('<path d="M6 6l12 12M18 6L6 18"/>', sz),

    chevronAbaixo: (sz) => linha('<path d="M6 9l6 6 6-6"/>', sz),

    setaDireita: (sz) => linha('<path d="M5 12h13M13 6l6 6-6 6"/>', sz),

    setaEsquerda: (sz) => linha('<path d="M19 12H6M11 6l-6 6 6 6"/>', sz),

    ampliar: (sz) => linha('<path d="M4 9V4h6M20 15v5h-6M4 4l6 6M20 20l-6-6"/>', sz),

    check: (sz) => linha('<path d="M20 6L9 17l-5-5"/>', sz),

    download: (sz) => linha(
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>', sz),

    filtro: (sz) => linha('<path d="M3 5h18l-7.2 8.3V19l-3.6-1.9v-3.8z"/>', sz),

    cadeado: (sz) => linha('<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V7a3.5 3.5 0 0 1 7 0v3.5"/>', sz),

    casa: (sz) => linha('<path d="M12 3.4 3.8 9.9V20a.8.8 0 0 0 .8.8h5.2v-6.4h4.4v6.4H19.4a.8.8 0 0 0 .8-.8V9.9z"/>', sz),

    grade: (sz) => linha(
      '<rect x="3" y="3" width="7.4" height="7.4" rx="1.8"/>' +
      '<rect x="13.6" y="3" width="7.4" height="7.4" rx="1.8"/>' +
      '<rect x="3" y="13.6" width="7.4" height="7.4" rx="1.8"/>' +
      '<rect x="13.6" y="13.6" width="7.4" height="7.4" rx="1.8"/>', sz),

    chama: (sz) => linha('<path d="M12 21c3.9 0 6.5-2.4 6.5-6 0-2.5-1.3-4.6-3.2-6.2-.2 1-.8 1.9-1.7 2.4C13.9 8.9 14 5.4 11 3c.2 2.7-.9 4.5-2.4 6C7 10.6 5.5 12.4 5.5 15c0 3.6 2.6 6 6.5 6z"/>', sz),

    info: (sz) => linha('<circle cx="12" cy="12" r="8.4"/><path d="M12 11.2v5"/><path d="M12 7.9h.01"/>', sz),

    ajuda: (sz) => linha(
      '<circle cx="12" cy="12" r="8.4"/><path d="M9.6 9.2a2.5 2.5 0 0 1 4.9.8c0 1.7-2.5 2.3-2.5 3.6"/><path d="M12 17h.01"/>', sz),

    desenhos: (sz) => linha(
      '<path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5"/><path d="M9 13h6M9 16.5h4"/>', sz),

    idade: (sz) => linha(
      '<circle cx="12" cy="7" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>', sz),

    /* ===== FAMÍLIA CHEIA — marca (paleta da identidade) ===== */

    estrela: (sz) => cheio(
      `<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" fill="${t.amarelo}"/>`, sz),

    coracao: (sz) => cheio(
      `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="${t.rosa}"/>`, sz),

    escudo: (sz) => cheio(
      `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" fill="${t.azul}"/>` +
      `<path d="M9.3 11.9l2.2 2.2 4-4.2" stroke="${t.branco}" stroke-width="1.6"/>`, sz),

    raio: (sz) => cheio(
      `<path d="M13.4 1.6 3.8 13.2h6.7l-.9 9.2 9-11.6h-6.7l1.5-9.2z" fill="${t.amarelo}"/>`, sz),

    impressora: (sz) => cheio(
      `<rect x="6.5" y="2.5" width="11" height="5.5" rx="1" fill="${t.creme}"/>` +
      `<rect x="6.4" y="13.4" width="11.2" height="8.1" rx="1.3" fill="${t.branco}"/>` +
      `<rect x="3" y="7" width="18" height="9" rx="2" fill="${t.azul}"/>` +
      `<circle cx="17.6" cy="10" r="0.95" fill="${t.amarelo}" stroke-width="1"/>` +
      `<path d="M9 17h6M9 19.2h4" stroke-width="1.4"/>`, sz),

    cartao: (sz) => cheio(
      `<rect x="2.5" y="5" width="19" height="14" rx="2.4" fill="${t.azul}"/>` +
      `<rect x="2.5" y="8.4" width="19" height="3.4" fill="${t.azulEscuro}" stroke="none"/>` +
      `<rect x="5" y="15" width="4.4" height="1.9" rx="0.9" fill="${t.creme}" stroke="none"/>`, sz),

    headset: (sz) => cheio(
      `<path d="M4.6 14.6v-2.4a7.4 7.4 0 0 1 14.8 0v2.4" stroke="${t.azulEscuro}"/>` +
      `<rect x="2.8" y="13.4" width="4.4" height="6.8" rx="2.1" fill="${t.rosa}"/>` +
      `<rect x="16.8" y="13.4" width="4.4" height="6.8" rx="2.1" fill="${t.rosa}"/>` +
      `<path d="M19 20.4c0 1.3-1 2.3-2.3 2.3h-2.4" stroke-width="1.5"/>` +
      `<circle cx="13.8" cy="22.8" r="1" stroke-width="1.2"/>`, sz),

    carrinhoCheio: (sz) => cheio(
      `<path d="M2.6 3.8h2.8l2.7 12a1.6 1.6 0 0 0 1.5 1.2h8.7a1.6 1.6 0 0 0 1.5-1.2L22 7.4H6" fill="${t.azul}"/>` +
      `<path d="M8.4 12.4 22 7.4" stroke-width="1.4"/>` +
      `<circle cx="10" cy="21.4" r="1.9" fill="${t.amarelo}"/>` +
      `<circle cx="17.8" cy="21.4" r="1.9" fill="${t.amarelo}"/>`, sz),

    lupaCartoon: (sz) => cheio(
      `<circle cx="10.2" cy="10.2" r="6.6" fill="${t.azulClaro}"/>` +
      `<circle cx="8.2" cy="8.4" r="1.5" fill="${t.branco}" stroke="none"/>` +
      `<path d="M15 15 20.8 20.8" stroke="${t.rosa}" stroke-width="2.6"/>`, sz),

    email: (sz) => cheio(
      `<rect x="2.8" y="4.8" width="18.4" height="14.4" rx="2.3" fill="${t.creme}"/>` +
      `<path d="M4 7.6 12 13.4 20 7.6"/>` +
      `<path d="M12 15.9c-1.5-1.1-2.5-2.2-2.5-3.4a2 2 0 0 1 2.5-1.8 2 2 0 0 1 2.5 1.8c0 1.2-1 2.3-2.5 3.4z" fill="${t.rosa}" stroke-width="1"/>`, sz),

    pdf: (sz) => cheio(
      `<path d="M5.2 2.8h7.4l6 6v11.4a1.6 1.6 0 0 1-1.6 1.6H5.2a1.6 1.6 0 0 1-1.6-1.6V4.4a1.6 1.6 0 0 1 1.6-1.6z" fill="${t.branco}"/>` +
      `<path d="M12.6 2.8v4.2a1.8 1.8 0 0 0 1.8 1.8h4.2" fill="${t.creme}"/>` +
      `<path d="M13.4 12.9h4M15.6 16.1h1.8" stroke-width="1.4"/>` +
      `<rect x="2" y="11.4" width="11.6" height="6" rx="1.2" fill="${t.rosa}"/>` +
      `<path d="M4.6 13.7h6.2M4.6 16.3h4" stroke="${t.branco}" stroke-width="1.4"/>`, sz),

    dino: (sz) => cheio(
      `<path d="M4.4 20.2c-1.2 0-2.2-1-2.2-2.2 0-.9.5-1.7 1.3-2l1.8-1c.3-3.6 3.3-6.4 7-6.4 1.3 0 2.5.3 3.5 1a4.9 4.9 0 0 1 4.9-1.9c2.2.4 3.9 2.3 3.9 4.5 0 .5-.1 1-.3 1.5l-1.1 3.1a4.6 4.6 0 0 1-4.3 3H4.4z" fill="${t.verde}"/>` +
      `<path d="M8 20.4V22.3M12.6 20.4V22.3" stroke-width="1.5"/>` +
      `<path d="M9.9 9.7l1-2.3 1.5 1.7 1.6-2.1 1.2 1.9" stroke-width="1.2" fill="${t.amarelo}" stroke-linejoin="round"/>` +
      `<circle cx="18.9" cy="11.8" r="0.85" fill="var(--ttl-ink, #351A36)" stroke="none"/>` +
      `<path d="M18.1 13.6c.5.5 1.2.5 1.6.1" stroke-width="1.1"/>` +
      `<circle cx="15.6" cy="15.6" r="1.1" fill="${t.amarelo}" stroke-width="0.9"/>` +
      `<circle cx="11.6" cy="17" r="0.9" fill="${t.amarelo}" stroke-width="0.9"/>`, sz),

    arcoiris: (sz) => cheio(
      `<path d="M2.6 19.4a9.4 9.4 0 0 1 18.8 0" stroke="${t.rosa}"/>` +
      `<path d="M6 19.4a6 6 0 0 1 12 0" stroke="${t.amarelo}"/>` +
      `<path d="M9.4 19.4a2.6 2.6 0 0 1 5.2 0" stroke="${t.azul}"/>` +
      `<path d="M1.4 20.6a1.9 1.9 0 0 1 .6-3.7 2.6 2.6 0 0 1 5-.9 1.8 1.8 0 0 1 1.2 3.3z" stroke-width="1.3"/>` +
      `<path d="M15.8 20.6a1.9 1.9 0 0 1 .6-3.7 2.6 2.6 0 0 1 5-.9 1.8 1.8 0 0 1 1.2 3.3z" stroke-width="1.3"/>`, sz),

    formatura: (sz) => cheio(
      `<path d="M2.4 8.6 12 4l9.6 4.6L12 13.2z" fill="${t.azulEscuro}"/>` +
      `<path d="M6.6 10.8v3.5c0 1.4 2.4 2.6 5.4 2.6s5.4-1.2 5.4-2.6v-3.5" fill="${t.azul}"/>` +
      `<path d="M21.6 8.8v5.4" stroke-width="1.5"/>` +
      `<circle cx="21.6" cy="15.6" r="1.2" fill="${t.amarelo}"/>` +
      `<circle cx="12" cy="8.2" r="1" fill="${t.amarelo}" stroke-width="0.9"/>`, sz),

    bolo: (sz) => cheio(
      `<rect x="4.6" y="12.6" width="14.8" height="8" rx="1.5" fill="${t.creme}"/>` +
      `<path d="M4.6 13a1.85 1.85 0 0 0 3.7 0 1.85 1.85 0 0 0 3.7 0 1.85 1.85 0 0 0 3.7 0 1.85 1.85 0 0 0 3.7 0" fill="${t.rosa}" stroke-width="1.2"/>` +
      `<path d="M3 20.9h18" stroke-width="1.6"/>` +
      `<path d="M8.6 12.4V9.8M12.6 12.4V9.8M16.6 12.4V9.8" stroke="${t.rosa}" stroke-width="1.5"/>` +
      `<path d="M8.6 8.6c-.6-.8-.6-1.6 0-2.5.6.9.6 1.7 0 2.5z" fill="${t.laranja}" stroke-width="0.8"/>` +
      `<path d="M12.6 8.6c-.6-.8-.6-1.6 0-2.5.6.9.6 1.7 0 2.5z" fill="${t.laranja}" stroke-width="0.8"/>` +
      `<path d="M16.6 8.6c-.6-.8-.6-1.6 0-2.5.6.9.6 1.7 0 2.5z" fill="${t.laranja}" stroke-width="0.8"/>`, sz),

    foguete: (sz) => cheio(
      `<path d="M11.4 2c2.9 1.9 4.4 5 4.4 8.3l-1 7.1h-7.2l-1-7.1C6.6 7 8.5 3.9 11.4 2z" fill="${t.creme}"/>` +
      `<path d="M11.4 2c1.8 1.2 3 2.9 3.7 4.7h-7.4c.7-1.8 1.9-3.5 3.7-4.7z" fill="${t.rosa}"/>` +
      `<circle cx="11.4" cy="10.6" r="2" fill="${t.azulClaro}"/>` +
      `<path d="M7.6 12.9l-2.4 4.3 3.2-.8M15.2 12.9l2.4 4.3-3.2-.8" fill="${t.rosa}" stroke-width="1.2"/>` +
      `<path d="M10.6 18.6l-1.2 3.2M12.2 18.6l1.2 3.2" stroke="${t.laranja}" stroke-width="1.5"/>`, sz),

    paw: (sz) => cheio(
      `<ellipse cx="6.9" cy="8.9" rx="1.75" ry="2.2" fill="${t.rosa}"/>` +
      `<ellipse cx="10.4" cy="5.9" rx="1.9" ry="2.3" fill="${t.rosa}"/>` +
      `<ellipse cx="14.5" cy="6.7" rx="1.85" ry="2.25" fill="${t.rosa}"/>` +
      `<ellipse cx="17.9" cy="9.9" rx="1.7" ry="2.1" fill="${t.rosa}"/>` +
      `<path d="M12.2 11.2c1.9 0 3.7.9 4.7 2.4a3.5 3.5 0 0 1-3.3 5.5h-2.8a3.5 3.5 0 0 1-3.3-5.5c1-1.5 2.8-2.4 4.7-2.4z" fill="${t.rosa}"/>`, sz),

    crown: (sz) => cheio(
      `<path d="M8.6 5.2 11.7 9.2a.4.4 0 0 0 .6 0L15.4 5.2 18.6 9 21.2 4.6a.5.5 0 0 1 .8.5l-2.8 10a1 1 0 0 1-1 .7H2.8a1 1 0 0 1-1-.7L1 5.1a.5.5 0 0 1 .8-.5L4.4 9z" fill="${t.amarelo}" stroke-width="1.3"/>` +
      `<path d="M5 20.4h14" stroke-width="1.5"/>`, sz),

    car: (sz) => cheio(
      `<path d="M3 16v-2.1c0-.8.3-1.5.9-2l1-2.8a1.8 1.8 0 0 1 1.7-1.2h7.6c.7 0 1.3.4 1.6 1l1.6 3 2.2.6a2 2 0 0 1 1.4 1.9V16a1.2 1.2 0 0 1-1.2 1.2H4.2A1.2 1.2 0 0 1 3 16z" fill="${t.azulClaro}"/>` +
      `<path d="M8.8 8h4.7l2 3.3H6.7z" fill="${t.creme}"/>` +
      `<circle cx="7.4" cy="17.6" r="2" fill="var(--ttl-ink, #351A36)"/>` +
      `<circle cx="7.4" cy="17.6" r="0.7" fill="${t.branco}" stroke="none"/>` +
      `<circle cx="16.8" cy="17.6" r="2" fill="var(--ttl-ink, #351A36)"/>` +
      `<circle cx="16.8" cy="17.6" r="0.7" fill="${t.branco}" stroke="none"/>`, sz),

    livroAberto: (sz) => cheio(
      `<path d="M2.2 4h6a4 4 0 0 1 3.8 2.8A4 4 0 0 1 15.8 4h6v13h-7a2.6 2.6 0 0 0-2.8 2.6A2.6 2.6 0 0 0 9.2 17h-7z" fill="${t.azul}" stroke-width="1.3"/>` +
      `<path d="M4.6 6.8h4M4.6 9.6h4M4.6 12.4h4" stroke-width="1.2" stroke="${t.azulEscuro}"/>` +
      `<path d="M19.4 6.8h-4M19.4 9.6h-4M19.4 12.4h-4" stroke-width="1.2" stroke="${t.azulEscuro}"/>` +
      `<path d="M12 6.8v13" stroke-width="1.3"/>`, sz),

    livroEstrela: (sz) => cheio(
      `<path d="M2.2 7h5.6a3.6 3.6 0 0 1 3.6 3.6V20a2.8 2.8 0 0 0-2.5-1.5H2.2z" fill="${t.rosa}" stroke-width="1.3"/>` +
      `<path d="M21.8 7h-5.6a3.6 3.6 0 0 0-3.6 3.6V20a2.8 2.8 0 0 1 2.5-1.5h6.7z" fill="${t.rosa}" stroke-width="1.3"/>` +
      `<path d="M4.4 9.4h4M4.4 12h4" stroke-width="1.1"/>` +
      `<path d="M19.6 9.4h-4M19.6 12h-4" stroke-width="1.1"/>` +
      `<path d="M12 11.6v8.4" stroke-width="1.2"/>` +
      `<path d="M12 1.4l1.1 2.3 2.5.3-1.9 1.7.5 2.5L12 6.9l-2.2 1.3.5-2.5L8.4 4l2.5-.3z" fill="${t.amarelo}" stroke-width="0.9"/>` +
      `<circle cx="4.5" cy="4.2" r="0.5" fill="${t.rosa}" stroke-width="0.7"/>` +
      `<circle cx="19.8" cy="3.6" r="0.5" fill="${t.rosa}" stroke-width="0.7"/>`, sz),

    festa: (sz) => cheio(
      `<path d="M9 20.6 11.4 5 15 19.2z" fill="${t.rosa}" stroke-width="1.2"/>` +
      `<path d="M9.5 17.2l4.3 1.2M10.2 13.4l3.5 1" stroke="${t.creme}" stroke-width="1.3"/>` +
      `<ellipse cx="11.9" cy="21" rx="4.4" ry="1.5" fill="${t.amarelo}"/>` +
      `<circle cx="11.6" cy="3.4" r="1.7" fill="${t.amarelo}"/>` +
      `<path d="M17.4 6.2l1.6-1.6M18.6 10l2 .2M7 4.6 6 3.2" stroke="${t.laranja}" stroke-width="1.3"/>`, sz),

    confete: (sz) => cheio(
      `<path d="M3.2 21 8.8 10.8l5.4 5.4z" fill="${t.rosa}" stroke-width="1.2"/>` +
      `<path d="M7.3 14.4 12.2 19" stroke="${t.creme}" stroke-width="1.2"/>` +
      `<circle cx="16.4" cy="5.6" r="1.05" fill="${t.amarelo}"/>` +
      `<circle cx="20.6" cy="8.9" r="0.9" fill="${t.azul}"/>` +
      `<circle cx="13.8" cy="3.2" r="0.8" fill="${t.rosaClaro}"/>` +
      `<path d="M15.4 10.4c1.1 1 2.5 1.1 3.7.4" stroke="${t.laranja}" stroke-width="1.3"/>` +
      `<path d="M18.2 13.4c.9.7 2 .7 2.9.1" stroke="${t.azul}" stroke-width="1.2"/>` +
      `<circle cx="21.6" cy="4.6" r="0.6" fill="${t.verde}" stroke-width="0.8"/>`, sz),

    baloes: (sz) => cheio(
      `<path d="M8.4 3a3.9 3.9 0 0 1 3.9 3.9c0 2.3-2 4.1-3.9 4.1S4.5 9.2 4.5 6.9A3.9 3.9 0 0 1 8.4 3z" fill="${t.rosa}"/>` +
      `<path d="M8.1 11.2l.7-.4.8.4-.4 1.2h-.7z" fill="${t.rosa}" stroke-width="0.9"/>` +
      `<path d="M8.7 12.4c-.4 2 .9 3.8.3 5.8-.2.8-.7 1.6-.6 2.6" stroke-width="1" />` +
      `<path d="M16.9 5.8a3.4 3.4 0 0 1 3.4 3.4c0 2-1.7 3.6-3.4 3.6S13.5 11.2 13.5 9.2a3.4 3.4 0 0 1 3.4-3.4z" fill="${t.amarelo}"/>` +
      `<path d="M16.9 12.9v1.4h-1.1l.5-1.4z" fill="${t.amarelo}" stroke-width="0.9"/>` +
      `<path d="M16.9 14.4c-.3 1.7.7 3.2.3 4.9-.2.7-.6 1.4-.5 2.3" stroke-width="1"/>`, sz),

    presente: (sz) => cheio(
      `<rect x="4.8" y="10.4" width="14.4" height="10" rx="1.5" fill="${t.rosa}"/>` +
      `<rect x="3.6" y="6.8" width="16.8" height="3.8" rx="1.2" fill="${t.rosaClaro}"/>` +
      `<rect x="10.7" y="6.8" width="2.6" height="13.6" fill="${t.amarelo}" stroke-width="0.9"/>` +
      `<path d="M12 6.8c-1.2-2.3-4.3-3.3-5.4-1.6-1 1.5 1.2 2.4 3 2.1" fill="${t.amarelo}"/>` +
      `<path d="M12 6.8c1.2-2.3 4.3-3.3 5.4-1.6 1 1.5-1.2 2.4-3 2.1" fill="${t.amarelo}"/>`, sz),

    seloCheck: (sz) => cheio(
      `<path d="M8.2 18.4 6.4 22l2.3-.9 1.1 2.1 1.6-3.3" fill="${t.rosaClaro}" stroke-width="1.1"/>` +
      `<path d="M15.8 18.4 17.6 22l-2.3-.9-1.1 2.1-1.6-3.3" fill="${t.rosaClaro}" stroke-width="1.1"/>` +
      `<path d="M12 2.6 14 4l2.3-.5 1 2.1 2.2.6-.1 2.2 1.7 1.4-1 2 1 2-1.7 1.4.1 2.2-2.2.6-1 2.1L14 20l-2 1.4L10 20l-2.3.5-1-2.1-2.2-.6.1-2.2L2.9 14.2l1-2-1-2 1.7-1.4L4.5 6.6l2.2-.6 1-2.1L10 4z" fill="${t.rosa}" stroke-width="1.1"/>` +
      `<path d="M8.8 12l2.2 2.2 4.2-4.4" stroke="${t.branco}" stroke-width="1.7"/>`, sz),

    desconto: (sz) => cheio(
      `<path d="M12 2.6 14 4l2.3-.5 1 2.1 2.2.6-.1 2.2 1.7 1.4-1 2 1 2-1.7 1.4.1 2.2-2.2.6-1 2.1L14 20l-2 1.4L10 20l-2.3.5-1-2.1-2.2-.6.1-2.2L2.9 14.2l1-2-1-2 1.7-1.4L4.5 6.6l2.2-.6 1-2.1L10 4z" fill="${t.rosa}" stroke-width="1.1"/>` +
      `<circle cx="9.2" cy="9.4" r="1.6" stroke="${t.branco}" stroke-width="1.5"/>` +
      `<circle cx="14.8" cy="14.6" r="1.6" stroke="${t.branco}" stroke-width="1.5"/>` +
      `<path d="M15.2 8.2 8.8 15.8" stroke="${t.branco}" stroke-width="1.8"/>`, sz),

    etiqueta: (sz) => cheio(
      `<path d="M5.6 10.2 12 3.8c.4-.4 1-.6 1.5-.6l4.8.1a2 2 0 0 1 2 2l.1 4.8c0 .6-.2 1.1-.6 1.5l-6.4 6.4a2 2 0 0 1-2.8 0l-5-5a2 2 0 0 1 0-2.8z" fill="${t.amarelo}" stroke-width="1.2"/>` +
      `<circle cx="16.4" cy="7.2" r="1.35" fill="${t.creme}"/>`, sz),

    brilhos: (sz) => cheio(
      `<path d="M11.8 2.6l1.9 6 6 1.9-6 1.9-1.9 6-1.9-6-6-1.9 6-1.9z" fill="${t.amarelo}" stroke-width="1.2"/>` +
      `<path d="M19.2 16l1 3.1 3.1 1-3.1 1-1 3.1-1-3.1-3.1-1 3.1-1z" fill="${t.amarelo}" stroke-width="1"/>` +
      `<circle cx="5" cy="19.4" r="0.8" fill="${t.rosaClaro}" stroke-width="0.8"/>`, sz),

    paleta: (sz) => cheio(
      `<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1a1.6 1.6 0 0 1 1.7-1.7h2c3 0 5.5-2.5 5.5-5.5C22 6 17.5 2 12 2z" fill="${t.creme}" stroke-width="1.2"/>` +
      `<circle cx="13.4" cy="6.6" r="1.2" fill="${t.rosa}" stroke="none"/>` +
      `<circle cx="17.4" cy="10.6" r="1.2" fill="${t.amarelo}" stroke="none"/>` +
      `<circle cx="8.4" cy="7.6" r="1.2" fill="${t.azul}" stroke="none"/>` +
      `<circle cx="6.4" cy="12.6" r="1.2" fill="${t.verde}" stroke="none"/>`, sz)
  };

  /* ---------- API pública ---------- */

  /** Devolve o markup do ícone `nome` com o tamanho pedido. */
  function icone(nome, tamanho) {
    const def = REGISTRO[nome];
    if (!def) return '';
    return def(tamanho);
  }

  /** Substitui no lugar: injeta o SVG dentro do elemento e devolve-o. */
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

  return { icone, montar, hidratar, linha, cheio, nomes: Object.keys(REGISTRO) };
})();

/* Hidratação imediata: o script roda no fim do body, o DOM já está pronto. */
TTLIcones.hidratar();

/* Páginas que renderizam HTML por JavaScript (carrinho, cards) rehidratam
   chamando TTLIcones.hidratar() após montar o innerHTML. */
document.addEventListener('DOMContentLoaded', () => {
  document.dispatchEvent(new Event('ttl-icones-pronto'));
});
