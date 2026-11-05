/* ============================================================
   ToToyLandia — catálogo com filtros, pesquisa e ordenação
   ============================================================ */

(async () => {
  const produtos = await TTLProdutos.publicados();

  const elementos = {
    grade: document.getElementById('ttl-catalogo-grade'),
    busca: document.getElementById('ttl-busca'),
    ordenacao: document.getElementById('ttl-ordenacao'),
    chips: document.getElementById('ttl-chips-categorias'),
    contador: document.getElementById('ttl-contador-resultados'),
    semResultados: document.getElementById('ttl-sem-resultados'),
    botaoCarregarMais: document.getElementById('ttl-carregar-mais'),
  };

  const parametros = new URLSearchParams(window.location.search);

  /* ---------- Palavra-chave + parâmetros iniciais da URL ---------- */
  let termoBusca = parametros.get('busca')?.trim() ?? '';
  let categoriaAtiva = parametros.get('categoria')?.trim() ?? '';
  let ordem = parametros.get('ordem')?.trim() ?? 'relevancia';

  elementos.busca.value = termoBusca;
  if (categoriaAtiva) {
    const cap = document.querySelector(`.ttl-chip[data-categoria="${categoriaAtiva}"]`);
    if (cap) cap.classList.add('ativa');
  }
  elementos.ordenacao.value = ordem;

  /* ---------- Chips de categoria ---------- */
  const chipsHTML = TTL_CATEGORIAS.map(cat =>
    `<button class="ttl-chip" data-categoria="${cat.id}">${TTLUI.escapo(cat.nome)}</button>`
  ).join('');
  elementos.chips.innerHTML =
    `<button class="ttl-chip ativa" data-categoria="">Todos os livrinhos</button>${chipsHTML}`;

  elementos.chips.addEventListener('click', (evento) => {
    const chip = evento.target.closest('.ttl-chip');
    if (!chip) return;
    evento.target.closest('.ttl-chips').querySelectorAll('.ttl-chip').forEach(c => c.classList.remove('ativa'));
    chip.classList.add('ativa');
    categoriaAtiva = chip.dataset.categoria;
    indice = 0;
    renderizar(false);
  });

  /* ---------- Pesquisa ---------- */
  let temporizadorBusca = null;
  elementos.busca.addEventListener('input', () => {
    clearTimeout(temporizadorBusca);
    temporizadorBusca = setTimeout(() => {
      termoBusca = elementos.busca.value.trim();
      indice = 0;
      renderizar(false);
    }, 240);
  });

  /* ---------- Ordenação ---------- */
  elementos.ordenacao.addEventListener('change', () => {
    ordem = elementos.ordenacao.value;
    indice = 0;
    renderizar(false);
  });

  /* ---------- Popularidade ---------- */
  function temDadosReais(produto) {
    return Boolean(produto.maisVendido);
  }

  function ordenar(lista) {
    const copia = [...lista];
    if (ordem === 'preco-asc') copia.sort((a, b) => preco(a) - preco(b));
    else if (ordem === 'preco-desc') copia.sort((a, b) => preco(b) - preco(a));
    else if (ordem === 'populares') copia.sort((a, b) => Number(temDadosReais(b)) - Number(temDadosReais(a)));
    return copia;
  }

  function preco(produto) {
    return produto.precoPromocional != null ? Number(produto.precoPromocional) : Number(produto.preco);
  }

  function filtrar() {
    const termo = termoBusca.toLocaleLowerCase('pt-BR');
    return produtos.filter(p => {
      const casaCategoria = !categoriaAtiva || p.categoria === categoriaAtiva;
      const casaBusca = !termo
        || p.nome.toLocaleLowerCase('pt-BR').includes(termo)
        || (p.curta || '').toLocaleLowerCase('pt-BR').includes(termo)
        || (p.descricao || '').toLocaleLowerCase('pt-BR').includes(termo);
      return casaCategoria && casaBusca;
    });
  }

  /* ---------- Renderização + carregamento progressivo ---------- */
  const tamanho = TTL_CONFIG.tamanhoPagina;
  let indice = 0;

  function renderizar(acumular) {
    const filtrados = ordenar(filtrar());

    const visiveis = acumular ? filtrados.slice(0, indice + tamanho) : filtrados.slice(0, tamanho);
    indice = visiveis.length;

    elementos.grade.innerHTML = visiveis.map(p => TTLUI.cardProduto(p)).join('');
    TTLUI.observarRevelacao();

    const qtd = filtrados.length;
    elementos.contador.textContent = qtd === 0
      ? ''
      : `${qtd} livrinho${qtd > 1 ? 's' : ''} encontrado${qtd > 1 ? 's' : ''}`;
    elementos.semResultados.hidden = qtd !== 0;
    elementos.botaoCarregarMais.hidden = indice >= qtd;
  }

  elementos.botaoCarregarMais.addEventListener('click', () => renderizar(true));

  renderizar(false);
})();
