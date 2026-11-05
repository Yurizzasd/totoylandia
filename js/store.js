/* ============================================================
   ToToyLandia — camada de dados (produtos + carrinho)

   O catálogo é SOMENTE LEITURA: vem de data/catalog.json e nunca
   é sobrescrito pelo navegador. Casos, preços e links só mudam
   editando o arquivo no projeto (versão controlada).
   ============================================================ */

const TTL_CATEGORIAS = [
  { id: 'animais-fofinhos',    nome: 'Animais fofinhos' },
  { id: 'dinossauros',         nome: 'Dinossauros' },
  { id: 'princesas-fantasia',  nome: 'Princesas e fantasia' },
  { id: 'carros-veiculos',     nome: 'Carros e veículos' },
  { id: 'mundo-magico',        nome: 'Mundo mágico' },
  { id: 'espaco-planetas',     nome: 'Espaço e planetas' },
  { id: 'aprendizado',         nome: 'Aprendizado' },
  { id: 'datas-comemorativas', nome: 'Datas comemorativas' }
];

/* ---------- Produtos ---------- */

const TTLProdutos = {
  cache: null,

  /**
   * Carrega o catálogo exclusivamente de data/catalog.json.
   * A leitura é validada (estrutura esperada) e itens inválidos são descartados.
   * Não há caminho de escrita: o navegador nunca altera preços, links ou cadastros.
   */
  async carregar() {
    if (TTLProdutos.cache) return TTLProdutos.cache;

    let semente = [];
    try {
      const resposta = await fetch('data/catalog.json', { cache: 'no-store' });
      if (resposta.ok) semente = await resposta.json();
    } catch (e) {
      // ambiente sem servidor (file://): sem catálogo, a loja informa indisponível
      semente = [];
    }

    TTLProdutos.cache = (Array.isArray(semente) ? semente : [])
      .filter(TTLProdutos.valido)
      .map(TTLProdutos.normalizar);
    return TTLProdutos.cache;
  },

  /** Regras mínimas de integridade para um produto entrar na loja. */
  valido(p) {
    return p != null
      && typeof p === 'object'
      && typeof p.id === 'string' && p.id.length > 0
      && typeof p.nome === 'string' && p.nome.length > 0
      && typeof p.publicado === 'boolean'
      && (p.linkKiwify === undefined || typeof p.linkKiwify === 'string');
  },

  /** Cagedos defensivos: nunca há HTML injetado nem preço inválido. */
  normalizar(p) {
    const preco = Number(p.preco);
    const promoCru = Number(p.precoPromocional);
    return {
      ...p,
      preco: Number.isFinite(preco) && preco >= 0 ? preco : 0,
      precoPromocional: Number.isFinite(promoCru) && promoCru > 0 ? promoCru : null,
      desenhos: Math.max(0, Number(p.desenhos) || 0),
      previas: Array.isArray(p.previas) ? p.previas.filter(x => typeof x === 'string') : [],
      // O checkout continua sendo validado na hora do render (ver TTLProdutos.linkKiwifyValido)
    };
  },

  /**
   * Verifica se um link é checkout Kiwify oficial (https + domínio próprio).
   * Usado no render: qualquer link diferente é tratado como ausente.
   */
  linkKiwifyValido(url) {
    if (typeof url !== 'string') return false;
    try {
      const dados = new URL(url);
      if (dados.protocol !== 'https:') return false;
      const dominio = dados.hostname.toLocaleLowerCase('pt-BR');
      return dominio === 'kiwify.com.br'
        || dominio === 'pay.kiwify.com.br'
        || dominio === 'www.kiwify.com.br'
        || dominio.endsWith('.kiwify.com.br');
    } catch (e) {
      return false;
    }
  },

  async buscarPorId(id) {
    const produtos = await TTLProdutos.carregar();
    return produtos.find(p => p.id === id) ?? null;
  },

  async publicados() {
    const produtos = await TTLProdutos.carregar();
    return produtos.filter(p => p.publicado);
  },

  async maisVendidos() {
    const produtos = await TTLProdutos.publicados();
    return produtos.filter(p => p.maisVendido);
  },

  categoriaNome(id) {
    const cat = TTL_CATEGORIAS.find(c => c.id === id);
    return cat ? cat.nome : 'Livrinho';
  }
};

/* ---------- Carrinho ---------- */

const TTLCarrinho = {
  itens() {
    try {
      return JSON.parse(localStorage.getItem(TTL_CONFIG.storageCarrinho)) ?? [];
    } catch (e) {
      return [];
    }
  },

  salvar(itens) {
    localStorage.setItem(TTL_CONFIG.storageCarrinho, JSON.stringify(itens));
    document.dispatchEvent(new CustomEvent('ttl-carrinho-mudou'));
  },

  adicionar(produto) {
    const itens = TTLCarrinho.itens();
    if (itens.some(p => p.id === produto.id)) return false;
    itens.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.precoPromocional ?? produto.preco,
      tinhaPromocao: produto.precoPromocional != null && produto.precoPromocional < produto.preco,
      precoNormal: produto.preco,
      capa: produto.capa,
      linkKiwify: produto.linkKiwify ?? ''
    });
    TTLCarrinho.salvar(itens);
    return true;
  },

  remover(id) {
    TTLCarrinho.salvar(TTLCarrinho.itens().filter(p => p.id !== id));
  },

  limpar() {
    TTLCarrinho.salvar([]);
  },

  total() {
    return TTLCarrinho.itens().reduce((soma, p) => soma + (Number(p.preco) || 0), 0);
  },

  quantidade() {
    return TTLCarrinho.itens().length;
  }
};
