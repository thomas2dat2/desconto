// ============================================================
//  CONVERSOR  -  Conversao e Validacao de Tipos
//  Backend 2DAT2  -  3o Trimestre
//  O frontend ja esta pronto em public/. Complete o TODO.
// ============================================================

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Recebe { preco, quantidade, desconto } vindos do formulario (chegam como TEXTO).
app.post("/calcular", (req, res) => {
  const { preco: precoTexto, quantidade: quantidadeTexto, desconto: descontoTexto } = req.body || {};

  const preco = Number(precoTexto);
  const quantidade = parseInt(quantidadeTexto, 10);
  const percentualDesconto = Number(descontoTexto);

  if (
    [precoTexto, quantidadeTexto, descontoTexto].some(
      (valor) => valor === undefined || String(valor).trim() === ""
    ) ||
    !Number.isFinite(preco) ||
    !Number.isFinite(quantidade) ||
    !Number.isFinite(percentualDesconto)
  ) {
    return res.status(400).json({ erro: "Digite numeros validos" });
  }

  const subtotal = preco * quantidade;
  const valorDesconto = subtotal * (percentualDesconto / 100);
  const total = subtotal - valorDesconto;

  res.status(200).json({
    preco,
    quantidade,
    subtotal,
    desconto: valorDesconto,
    total,
  });
});

app.listen(PORT, () => {
  console.log(`Conversor no ar: http://localhost:${PORT}`);
});
