# ToToyLandia — Loja de livros de colorir em PDF

Loja virtual de produtos digitais (HTML + CSS + JS puro) para venda de
livrinhos de colorir em PDF, com **checkout e entrega automáticos pela Kiwify**.

O site é **100% público**: vitrine, catálogo e checkout. Não há páginas ou
formulários administrativos acessíveis por visitantes.

## Como rodar

Abra `index.html` direto no navegador **ou** (recomendado) sirva a pasta:

```
python -m http.server 8080
```

Páginas públicas:

| Página | Arquivo | Para quê |
|---|---|---|
| Início | `index.html` | Vitrine com hero, mais vendidos, coleções, novidades, FAQ |
| Catálogo | `catalogo.html` | Filtros, pesquisa, ordenação e carregamento progressivo |
| Produto | `produto.html?id=<id>` | Página individual com galeria, prévias e compra |

## Como adicionar um livrinho (apenas via código)

O catálogo é controlado pelo projeto. Produtos só entram editando o arquivo
`data/catalog.json` — nada de formulários públicos.

```json
{
  "id": "meu-livrinho",
  "nome": "Nome do Livro de Colorir – 25 Desenhos em PDF",
  "descricao": "Descrição completa da página do produto.",
  "curta": "Frase curta do card.",
  "categoria": "animais-fofinhos",
  "capa": "assets/capa-meu-livrinho.png",
  "previas": ["assets/pagina1.png", "assets/pagina2.png"],
  "preco": 9.9,
  "precoPromocional": null,
  "desenhos": 25,
  "faixaEtaria": "3 a 7 anos",
  "informacoesImpressao": "PDF em A4 retrato; papel 80g/m² ou mais.",
  "maisVendido": true,
  "kit": false,
  "linkKiwify": "https://pay.kiwify.com.br/SEU-LINK",
  "publicado": true
}
```

Campos preservados por produto: **nome, descrição, capa, preço, categoria,
quantidade de páginas/desenhos e link individual da Kiwify**.

Regras de integridade (aplicadas em `js/store.js`):

- O navegador nunca altera o catálogo — só lê. Edição é feita no arquivo.
- O link de checkout só é renderizado como botão ativo se apontar para um
  domínio oficial da Kiwify (`kiwify.com.br`) em HTTPS.
- Produto sem link válido aparece com o botão "em preparação" e nunca
  simula compra.

Textos, imagens e preços só mudam por commit no projeto (OpenCode).

## Kiwify

- Cada produto tem seu link real de checkout em `data/catalog.json`.
- "Comprar agora" abre o checkout oficial em nova aba.
- A entrega do PDF é automática pela Kiwify após a confirmação do pagamento.
- checkout já cadastrado: **https://pay.kiwify.com.br/o3CTS8i** (Mundo Encantado).

## Segurança

- **Sem painel administrativo público.** A versão anterior de admin
  (`admin.html` + localStorage) foi removida; as URLs retornam 404.
- O catálogo é somente leitura no navegador — nenhum visitante consegue
  cadastrar, editar, excluir ou alterar preços/links.
- Nenhuma credencial ou segredo no JavaScript enviado ao navegador.
- O carrinho é local e só guarda itens antes de ir ao checkout da Kiwify.

## Arquitetura para o painel do FUTURO (não implementado agora)

Quando o painel for reconstruído, ele deve ter backend próprio com:

1. **Login obrigatório** — sessão httpOnly + SameSite, cookies seguros.
2. **Cadastro de administrador controlado** — criado por seed/servidor;
   **nunca** existe formulário público de administrador.
3. **Autenticação validada no servidor** — todas as rotas de alteração
   exigem sessão válida (não basta frontend).
4. **Proteção de rotas/APIs** — alterar produto, preço, imagem ou link só
   chega com token autenticado + permissão.
5. **Proteção contra força bruta** — limite de tentativas de login,
   bloqueio temporário e backoff.
6. **Logs de alterações** — cada edição registra quem, quando e o quê.
7. **Controle de permissões** — papéis (ex.: leitor, editor, dono).

Até lá, catálogo é gerenciado apenas por código/commit.

## Estrutura

```
ToToyLandia/
|-- index.html
|-- catalogo.html
|-- produto.html
|-- data/
|   `-- catalog.json      # Catálogo único (somente leitura no site)
|-- assets/               # Logo, capas e pré-visualizações
|-- css/style.css
`-- js/
    |-- config.js         # Moeda e chaves do carrinho (sem segredos)
    |-- store.js          # Leitura validada do catálogo + carrinho
    |-- ui.js             # Header, footer, cards, carrinho
    |-- home.js           # Vitrine da home
    |-- catalogo.js       # Filtros, busca, ordenação, paginação
    `-- produto.js        # Página do produto + validação de checkout
```

## Publicar (ex.: GitHub Pages)

1. Confirme que `data/catalog.json` está atualizado e imagens estão em `assets/`.
2. Suba tudo para o repositório e habilite Pages (pasta raiz).
3. Verifique o link Kiwify de cada produto antes de divulgar.
