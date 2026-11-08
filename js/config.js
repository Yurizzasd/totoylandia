/* ============================================================
   ToToyLandia — configuração central do site
   Nenhum segredo ou credencial vive aqui: este arquivo vai
   inteiro para o navegador do visitante.
   ============================================================ */

const TTL_CONFIG = {
  // Moeda
  moeda: 'BRL',
  locale: 'pt-BR',

  // Quantos livrinhos carregar por vez no catálogo (carregamento progressivo)
  tamanhoPagina: 9,

  // Capa provisória até o cadastro da capa real no catalog.json
  capaFallback: 'assets/icons/utilitarios/capa-em-breve.png',

  // Chave usada SOMENTE pelo carrinho do cliente (itens escolhidos antes
  // de ir para o checkout da Kiwify). O catálogo NÃO usa localStorage —
  // produtos, preços e links são sempre lidos de data/catalog.json.
  storageCarrinho: 'totoylandia_carrinho'
};

/* Formata números como R$ 19,90 */
function TTLFormatarPreco(valor) {
  return valor.toLocaleString(TTL_CONFIG.locale, {
    style: 'currency',
    currency: TTL_CONFIG.moeda
  });
}

/* Escapa texto vindo do catálogo antes de renderizar (defesa XSS) */
function ttlEscapar(texto) {
  const div = document.createElement('div');
  div.textContent = String(texto ?? '');
  return div.innerHTML;
}
