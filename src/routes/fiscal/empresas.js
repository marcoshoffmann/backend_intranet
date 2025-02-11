const express = require("express");
const createPoolWithDatabase = require("../../config/db");
const pool = createPoolWithDatabase('lista_guia');
const router = express.Router();
const handleError = require("../../utils/handleError");
const validarCamposObrigatorios = require("../../middleware/validarCampos");
const verificarToken = require("../../middleware/authMiddleware");
const consultas = require("../../DB/queries")

router.get("/fiscal/empresas", async (req, res) => {
    try {
        const [result] = await pool.execute(consultas.consultaFiscalEmpresas);
        res.status(200).json({ result });
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;