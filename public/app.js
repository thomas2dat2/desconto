// Frontend pronto — NÃO precisa alterar.
// Ele envia os campos (como texto) para o backend POST /calcular.
const btn = document.getElementById("btn");
const res = document.getElementById("resultado");

btn.addEventListener("click", async () => {
  const preco = document.getElementById("preco").value;
  const quantidade = document.getElementById("quantidade").value;
  const desconto = document.getElementById("desconto").value;

  const resp = await fetch("/calcular", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ preco, quantidade, desconto }),
  });
  const dados = await resp.json();

  if (!resp.ok) {
    res.className = "resultado erro";
    res.textContent = "⚠ " + dados.erro;
    return;
  }
  res.className = "resultado ok";
  res.textContent = `Subtotal: R$ ${dados.subtotal.toFixed(2)} |` +
                    `Desconto: R$ ${dados.desconto.toFixed(2)} |` +
                    `Total: R$ ${dados.total.toFixed(2)}`;
});
