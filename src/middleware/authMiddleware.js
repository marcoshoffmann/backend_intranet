const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ erro: "Acesso negado! Token não fornecido." });
    }

    try {
        const segredo = process.env.JWT_SECRET;
        const decoded = jwt.verify(token.replace("Bearer ", ""), segredo);
        req.usuario = decoded;  // Adiciona usuário decodificado à requisição
        next();
    } catch (error) {
        res.status(401).json({ erro: "Token inválido!" });
    }
};

module.exports = verificarToken;