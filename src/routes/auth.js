const express = require("express");
const jwt = require("jsonwebtoken");
const createPoolWithDatabase = require("../config/db");
const pool = createPoolWithDatabase('usuarios');

const router = express.Router();

router.post("/login", async (req, res) => {
    const [result] = await pool.execute(`SELECT email, senha FROM usuario;`);
    const { email, senha } = req.body;

    const usuario = result.find((u) => u.email === email);
    if (!usuario) {
        return res.status(400).json({ erro: "Usuário não encontrado!" });
    }

    const senhaValida = senha === usuario.senha;
    if (!senhaValida) {
        return res.status(400).json({ erro: "Senha inválida!" });
    }

    const segredo = process.env.JWT_SECRET;
    console.log("OK!!!");
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, segredo, { expiresIn: "1h" });

    res.json({ mensagem: "Login bem-sucedido!", token });
});

module.exports = router;