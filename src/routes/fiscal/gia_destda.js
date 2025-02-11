const express = require("express");
const tempo = require("../../utils/timeConsult")
const createPoolWithDatabase = require("../../config/db");
const pool = createPoolWithDatabase('lista_guia');
const router = express.Router();
const handleError = require("../../utils/handleError");
const validarCamposObrigatorios = require("../../middleware/validarCampos");
const consultas = require("../../DB/queries");

router.get("/fiscal/gia_destda", async (req, res) => {
    try {
        const [result] = await pool.execute(consultas.consultaFiscalGiaDestda);
        res.status(200).json({ result });
    } catch (error) {
        handleError(res, error);
    }
});

router.get("/fiscal/gia_destda/:mes/:ano", async (req, res) => {
    try {
        const [result] = await pool.execute(consultas.consultaFiscalGiaDestdaParams, [req.params.mes, req.params.ano]);
        res.status(200).json({ result });
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;