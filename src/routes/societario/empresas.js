const express = require("express");
const createPoolWithDatabase = require("../../config/db");
const pool = createPoolWithDatabase('lista_guia');
const router = express.Router();
const handleError = require("../../utils/handleError");
const validarCamposObrigatorios = require("../../middleware/validarCampos");
const consultas = require("../../DB/queries");

router.get("/societario/empresas", async (req, res) => {
    try {
        const [result] = await pool.execute(consultas.consultaSocietarioEmpresas);
        res.status(200).json({ result });
    } catch (error) {
        handleError(res, error);
    }
});

router.post("/societario/empresas", validarCamposObrigatorios(["id", "nome_da_empresa", "cpf_cnpj", "ie", "im", "tf", "uf"]), async (req, res) => {
    const { id, nome_da_empresa, cpf_cnpj, ie, im, tf, uf } = req.body;
    try {
        const [result] = await pool.execute(consultas.insertSocietarioImpresas, [id, nome_da_empresa, cpf_cnpj, ie, im, tf, uf]);
        res.status(201).json({ message: "Empresa adicionada com sucesso!", result });
    } catch (error) {
        handleError(res, error);
    }
});

router.put("/societario/empresas", validarCamposObrigatorios(["id"]), async (req, res) => {
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
    const query = `UPDATE empresas SET ${camposParaAtualizar.join(", ")} WHERE id = ?;`;

    console.log("SQL Executado:", query);
    console.log("Valores:", valoresParaAtualizar);

    try {
        const [result] = await pool.execute(query, valoresParaAtualizar);
        return res.status(200).json({
            "mensagem": "Empresa atualizada com sucesso!",
            "result": result
        });
    } catch (error) {
        handleError(res, error);
    }
});

router.delete("/societario/empresas", validarCamposObrigatorios(["id"]), async (req, res) => {
    const {id} = req.body;
    const [result] = await pool.execute(consultas.deleteSocietarioEmpresas, [id]);
    if (result.affectedRows !== 0){
        return res.status(200).json({
            "mensagem": "Empresa deletada com sucesso!",
            "result": result
        })
    }
    return res.status(400).json({
        "mensagem": "Não foi possível deletar a empresa"
    })
})

module.exports = router;