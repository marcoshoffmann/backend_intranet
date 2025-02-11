const express = require("express");
const createPoolWithDatabase = require("../../config/db");
const pool = createPoolWithDatabase('lista_guia');
const router = express.Router();
const handleError = require("../../utils/handleError");
const validarCamposObrigatorios = require("../../middleware/validarCampos");
const consultas = require("../../DB/queries");

router.get("/fiscal/cadastro_parcelamentos", async (req, res) => {
    try {
        const [result] = await pool.execute(consultas.consultaFiscalCadastroParcelamentos);
        res.status(200).json({ result });
    } catch (error) {
        handleError(res, error);
    }
});

router.post("/fiscal/cadastro_parcelamentos", validarCamposObrigatorios(["id", "tipo", "acesso", "numero_parcelamento"]), async (req, res) => {
    const { id, tipo, acesso, numero_parcelamento, senha } = req.body;
    
    try {
        const [result] = await pool.execute(consultas.insertFiscalCadastroParcelamentos, [id, tipo, acesso, numero_parcelamento, senha]);
        res.status(201).json({ message: "Parcelamento cadastrado com sucesso!", result });
    } catch (error) {
        handleError(res, error);
    }
});

router.put("/fiscal/cadastro_parcelamentos", validarCamposObrigatorios(["id"]), async (req, res) => {
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
    const query = `UPDATE cadastro_parcelamentos SET ${camposParaAtualizar.join(", ")} WHERE id = ?;`;

    console.log("SQL Executado:", query);
    console.log("Valores:", valoresParaAtualizar);

    try {
        const [result] = await pool.execute(query, valoresParaAtualizar);
        return res.status(200).json({
            "mensagem": "Cadastro parcelamento atualizado com sucesso!",
            "result": result
        });
    } catch (error) {
        handleError(res, error);
    }
});

router.delete("/fiscal/cadastro_parcelamentos", validarCamposObrigatorios(["id", "numero_parcelamento"]), async (req, res) => {
    const {id, numero_parcelamento} = req.body;
    const query = `DELETE FROM cadastro_parcelamentos WHERE id = ? AND numero_parcelamento = ?;`;
    const [result] = await pool.execute(query, [id, numero_parcelamento]);
    if (result.affectedRows !== 0){
        return res.status(200).json({
            "mensagem": "Cadastro parcelamento deletado com sucesso!",
            "result": result
        })
    }
    return res.status(400).json({
        "mensagem": "Não foi possível deletar o cadastro parcelamento!"
    })
})

module.exports = router;
