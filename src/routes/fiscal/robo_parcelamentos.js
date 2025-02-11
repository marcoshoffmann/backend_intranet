const express = require("express");
const tempo = require("../../utils/timeConsult")
const createPoolWithDatabase = require("../../config/db");
const pool = createPoolWithDatabase('lista_guia');
const router = express.Router();
const handleError = require("../../utils/handleError");
const validarCamposObrigatorios = require("../../middleware/validarCampos");
const now = new Date();
const consultas = require("../../DB/queries");

router.get("/fiscal/robo_parcelamentos", async (req, res) => {
    try {
        const [result] = await pool.execute(consultas.consultaFiscalParcelamentos);
        res.status(200).json({ result });
    } catch (error) {
        handleError(res, error);
    }
});

router.get("/fiscal/robo_parcelamentos/:mes/:ano", async (req, res) => {
    try {
        const [result] = await pool.execute(consultas.consultaFiscalParcelamentosParams, req.params.mes, req.params.ano);
        res.status(200).json({ result });
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;
