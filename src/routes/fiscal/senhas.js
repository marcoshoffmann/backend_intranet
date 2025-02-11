const express = require("express");
const createPoolWithDatabase = require("../../config/db");
const pool = createPoolWithDatabase('lista_guia');
const router = express.Router();
const handleError = require("../../utils/handleError");
const validarCamposObrigatorios = require("../../middleware/validarCampos");
const consultas = require("../../DB/queries");

router.get("/fiscal/senhas", async (req, res) => {
    console.log(req.body);
    console.log(consultas.consultaFiscalSenhas);
    try {
        const [result] = await pool.execute(consultas.consultaFiscalSenhas);
        res.status(200).json({ result });
    } catch (error) {
        handleError(res, error);
    }
});

router.post("/fiscal/senhas", validarCamposObrigatorios(["id"]), async (req, res) => {
    const { id, senha_municipio, senha_portal_nacional } = req.body;
    try {
        const [result] = await pool.execute(consultas.in, [id, senha_municipio, senha_portal_nacional]);
        res.status(201).json({ message: "Senha cadastrada com sucesso!", result });
    } catch (error) {
        handleError(res, error);
    }
});

router.put("/fiscal/senhas", validarCamposObrigatorios(["id"]), async (req, res) => {
    const { id, ...campos } = req.body;
    const camposParaAtualizar = [];
    const valoresParaAtualizar = [];

    // Construção dos pares de campos e valores para atualizar
    Object.entries(campos).forEach(([key, value]) => {
        camposParaAtualizar.push(`${key} = ?`);
        valoresParaAtualizar.push(value);
    });

    // Adiciona o id como último valor para a cláusula WHERE
    valoresParaAtualizar.push(id);

    // Monta a query com placeholders para valores
    const query = `UPDATE senhas_notas_fiscais SET ${camposParaAtualizar.join(", ")} WHERE id = ?;`;

    console.log("SQL Executado:", query);
    console.log("Valores:", valoresParaAtualizar);

    try {
        const [result] = await pool.execute(query, valoresParaAtualizar);
        return res.status(200).json({
            "mensagem": "Senha atualizada com sucesso!",
            "result": result
        });
    } catch (error) {
        handleError(res, error);
    }
});

router.delete("/fiscal/senhas", validarCamposObrigatorios(["id"]), async (req, res) => {
    const {id} = req.body;
    const [result] = await pool.execute(consultas.deleteFiscalSenhas, [id]);
    if (result.affectedRows !== 0){
        return res.status(200).json({
            "mensagem": "Senha deletada com sucesso!",
            "result": result
        })
    }
    return res.status(400).json({
        "mensagem": "Não foi possível deletar a senha"
    })
})

module.exports = router;
