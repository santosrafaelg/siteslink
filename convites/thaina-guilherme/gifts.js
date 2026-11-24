"use strict";

// Para marcar um presente como indisponível: taken: true.
// Presentes sem url ficam disponíveis para escolha sem link de loja.
// URL do Google Apps Script (App da Web) que envia o e-mail de aviso aos noivos.
// Enquanto estiver vazia, o botão "Já escolhi" não aparece.
const giftNotifyUrl = "https://script.google.com/macros/s/AKfycbzlV6SmzRIzuMCi6V6n2qIdM80IsjAS4uKSHt3Xp7-82gMcGJ8HaKFuxf6SDtwEjdqx/exec";

// Opcional: link CSV da planilha publicada (Arquivo > Compartilhar > Publicar na Web > CSV).
// Colunas: presente | link | status | observacao. Status "indisponível" marca como escolhido.
// Se vazio ou se falhar o carregamento, a lista abaixo é usada.
const giftSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQAO-ByvOjvy4FB8S_ClzHCN_pFXFdh36OKA4V-lVj8HBuzUbFCgys_iTHbFRFOwLCWQumeOEKlbESA/pub?gid=1443531489&single=true&output=csv";

const gifts = [
  { name: "Organizador de sapatos", url: "https://br.shp.ee/5Jn8tG1K" },
  { name: "Pano de chão", url: "https://br.shp.ee/1QCVVWCH" },
  { name: "Descascador", url: "https://br.shp.ee/NvwLcZ6m" },
  { name: "Abridor de latas", url: "https://br.shp.ee/hd7J3WUZ" },
  { name: "Porta frios", url: "https://br.shp.ee/WRsUFvj3" },
  { name: "Porta temperos", url: "https://br.shp.ee/HEzr4uU5" },
  { name: "Escorredor de louças", url: "https://br.shp.ee/za6PkGL6" },
  { name: "Escorredor de macarrão", url: "https://br.shp.ee/MD6S1Fzx" },
  { name: "Organizador de tampas", url: "https://br.shp.ee/DPe4F5V7" },
  { name: "Protetor de colchão", url: "https://br.shp.ee/f5CEkPhj" },
  { name: "Pano de prato", url: "https://br.shp.ee/5j2SjWg7" },
  { name: "Suporte para papel toalha", url: "https://br.shp.ee/HSckvaen" },
  { name: "Kit cesto organizador", url: "https://br.shp.ee/uXvVuny9" },
  { name: "Lixeira automática", url: "https://br.shp.ee/Tadehaui", note: "Precisamos de 2 unidades" },
  { name: "Suporte para esponja", url: "https://br.shp.ee/rjMj2pW3" },
  { name: "Organizador de armário", url: "https://br.shp.ee/kVDqqAmA" },
  { name: "Cabides", url: "https://br.shp.ee/xfjFuSRp" },
  { name: "Refratário de vidro com tampa", url: "https://br.shp.ee/eek4vKre" },
  { name: "Jarra", url: "https://br.shp.ee/FCwPxMXT" },
  { name: "Jogo de assadeiras", url: "https://br.shp.ee/JVXfbg9k" },
  { name: "Leiteira", url: "https://br.shp.ee/NULjsv2" },
  { name: "Chaleira elétrica", url: "https://br.shp.ee/TTUupPvH" },
  { name: "Liquidificador preto", url: null },
  { name: "Pratos fundos", url: "https://br.shp.ee/crf3sRsd" },
  { name: "Galheteiros de vidro", url: "https://br.shp.ee/RTQhyB4u" },
  { name: "Amassador de alho", url: "https://br.shp.ee/7Sd4vLP6" },
  { name: "Sanduicheira preta", url: null },
  { name: "Ferro de passar", url: null },
  { name: "Peneira", url: "https://br.shp.ee/VoEwRkfo" },
  { name: "Ralador", url: "https://br.shp.ee/CYBtdVPk" },
  { name: "Boleira", url: "https://shopee.com.br/product/1758171394/58208767028?d_id=dd429" },
  { name: "Mantegueira", url: "https://br.shp.ee/FYJMdubf" },
  { name: "Kit medidor", url: "https://br.shp.ee/rFzJbcXw" },
  { name: "Funil", url: "https://br.shp.ee/NQ8FF3ot" },
  { name: "Espremedor de limão", url: "https://br.shp.ee/7hFJQDZf" },
  { name: "Queijeira", url: null },
  { name: "Copo medidor", url: null },
];
