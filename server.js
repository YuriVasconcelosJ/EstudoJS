// Importações
const express = require("express");
// app
const app = express();

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

let usuarios = [
  { id: 1, nome: "Alice" },
  { id: 2, nome: "Bob" },
];

// Rota GET - Listar todos os usuários
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// Rota GET - Buscar usuário por ID

app.get("/usuario/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.fing((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  res.json(usuario);
});

// Rota POST - Criar um novo usuário
app.post("/usuarios", (req, res) => {
  const { nome } = req.body;
  const novoUsuario = { id: usuarios.length + 1, nome };

  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// Rota PUT - Atualizar usuários
app.put("usuarios", (req, res) => {
  const id = parseInt(req.params.id);
  const { nome } = req.body;
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  usuario.nome = nome;
  res.json(usuario);
});

// Rota DELETE - Remover um usuário
app.delete("usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  usuarios.splice(index, 1);
  res.status(204).send(); // Sem conteúdo
});

// Rota Inicial
app.get("/", (req, res) => {
  res.send("API está rodando");
});

// Configuração do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta:${PORT}`);
});
