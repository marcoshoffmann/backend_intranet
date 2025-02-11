const express = require("express");
const createPoolWithDatabase = require("../../config/db");
const pool = createPoolWithDatabase('lista_guia');
const router = express.Router();
const handleError = require("../../utils/handleError");
const validarCamposObrigatorios = require("../../middleware/validarCampos");
const consultas = require("../../DB/queries");

router.get("/ti/entrega_documentos", async (req, res) => {
    try {
        const [result] = await pool.execute(consultas.consultaTiEntregaDocumentos);
        res.status(200).json({ result });
    } catch (error) {
        handleError(res, error);
    }
});

router.post("/ti/entrega_documentos", validarCamposObrigatorios(["id", "onvio"]), async (req, res) => {
    const { id, onvio } = req.body;
    try {
        const [result] = await pool.execute(consultas.insertTiEntregaDocumentos, [id, onvio]);
        res.status(201).json({ message: "Entrega documento cadastrado com sucesso!", result });
    } catch (error) {
        handleError(res, error);
    }
});

router.put("/ti/entrega_documentos", validarCamposObrigatorios(["id", "onvio"]), async (req, res) => {
    const {id, onvio} = req.body;
    const [result] = await pool.execute(consultas.putTiEntregaDocumentos, [onvio, id])
    return res.status(200).json({
        "mensagem": "Entrega documentos atualizada com sucesso!",
        "result": result
    });
});

router.delete("/ti/entrega_documentos", validarCamposObrigatorios(["id"]), async (req, res) => {
    const {id} = req.body;
    const [result] = await pool.execute(consultas.deleteTiEntregaDocumentos, [id]);
    if (result.affectedRows !== 0){
        return res.status(200).json({
            "mensagem": "Entrega documento deletada com sucesso!",
            "result": result
        })
    }
    return res.status(400).json({
        "mensagem": "Não foi possível deletar a entrega documento!"
    })
})

module.exports = router;
