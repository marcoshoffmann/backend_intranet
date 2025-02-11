const validarCamposObrigatorios = (campos) => {
    return (req, res, next) => {
        for (const campo of campos) {
            if (!req.body[campo]) {
                return res.status(400).json({ error: `O campo ${campo} é obrigatório!` });
            }
        }
        next();
    };
};

module.exports = validarCamposObrigatorios;