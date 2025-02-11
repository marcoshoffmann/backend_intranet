const express = require("express");
const createPoolWithDatabase = require("../../config/db");
const pool = createPoolWithDatabase('lista_guia');
const router = express.Router();
const handleError = require("../../utils/handleError");
const validarCamposObrigatorios = require("../../middleware/validarCampos");
const consultas = require("../../DB/queries")

router.get("/contabilidade/empresas", async (req, res) => {
    try {
        const [result] = await pool.execute(consultas.consultaContabilidadeEmpresas);
        res.status(200).json({ result });
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;