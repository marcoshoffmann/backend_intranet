const express = require("express");
const createPoolWithDatabase = require("../../config/db");
const pool = createPoolWithDatabase('usuarios');
const router = express.Router();
const handleError = require("../../utils/handleError");
const validarCamposObrigatorios = require("../../middleware/validarCampos");
const consultas = require("../../DB/queries");

router.get("/usuarios", async (req, res) => {
    try {
        const [result] = await pool.execute(consultas.consultaUsuarios);
        res.status(200).json({ result });
    } catch (error) {
        handleError(res, error);
    }
});

router.post("/usuarios", validarCamposObrigatorios(["nome", "sobrenome", "data_nascimento", "setor", "ramal", "email", "senha"]), async (req, res) => {
    const { nome, sobrenome, data_nascimento, setor, grupo, ramal, email, senha } = req.body;
    
    try {
        const [result] = await pool.execute(consultas.postUsuarios, [nome, sobrenome, data_nascimento, setor, grupo, ramal, email, senha]);
        res.status(201).json({ message: "Usuário cadastrado com sucesso!", result });
    } catch (error) {
        handleError(res, error);
    }
});

router.put("/usuarios", validarCamposObrigatorios(["id"]), async (req, res) => {
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
    const query = `UPDATE usuario SET ${camposParaAtualizar.join(", ")} WHERE id = ?;`;

    console.log("SQL Executado:", query);
    console.log("Valores:", valoresParaAtualizar);

    try {
        const [result] = await pool.execute(query, valoresParaAtualizar);
        return res.status(200).json({
            "mensagem": "usuário atualizado com sucesso!",
            "result": result
        });
    } catch (error) {
        handleError(res, error);
    }
});

router.delete("/usuarios", validarCamposObrigatorios(["id"]), async (req, res) => {
    const {id} = req.body;
    const [result] = await pool.execute(consultas.deleteUsuarios, [id]);
    if (result.affectedRows !== 0){
        return res.status(200).json({
            "mensagem": "Usuário deletado com sucesso!",
            "result": result
        })
    }
    return res.status(400).json({
        "mensagem": "Não foi possível deletar o usuário"
    })
})

module.exports = router;