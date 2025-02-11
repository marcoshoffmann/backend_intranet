const express = require("express");
const createPoolWithDatabase = require("../config/db");
const pool = createPoolWithDatabase('usuarios');
const router = express.Router();
const handleError = require("../utils/handleError");
const validarCamposObrigatorios = require("../middleware/validarCampos");
const consultas = require("../DB/queries")

router.get("/aniversariantes", async (req, res) => {
    try {
        const [result] = await pool.execute(consultas.consultaAniversariantes);
        res.status(200).json({ result });
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;
