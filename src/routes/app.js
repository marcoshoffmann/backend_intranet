const express = require("express");
const cors = require("cors");
const authRoutes = require(".\\auth");
const aniversariantesRoutes = require(".\\aniversariantes");
const societarioEmpresasRoutes = require(".\\societario\\empresas");
const tiUsuariosRoutes = require(".\\TI\\usuarios");
const tiEntregaDocumentosRoutes = require(".\\TI\\entrega_documentos");
const fiscalCadastroParcelamentosRoutes = require(".\\fiscal\\cadastro_parcelamentos");
const fiscalEmpresasRoutes = require(".\\fiscal\\empresas");
const fiscalRoboNotasRoutes = require(".\\fiscal\\robo_notas");
const fiscalGiaDestdaRoutes = require(".\\fiscal\\gia_destda");
const fiscalRoboParcelamentosRoutes = require(".\\fiscal\\robo_parcelamentos");
const fiscalSenhasRoutes = require(".\\fiscal\\senhas");
const contabilidadeEmpresasRoutes = require(".\\contabilidade\\empresas");
const departamentoPessoalEmpresasRoutes = require(".\\departamento_pessoal\\empresas");

const app = express();
app.use(cors());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - IP: ${req.ip}`);
    next();
});
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", societarioEmpresasRoutes);
app.use("/api", aniversariantesRoutes);
app.use("/api", tiUsuariosRoutes);
app.use("/api", fiscalCadastroParcelamentosRoutes);
app.use("/api", tiEntregaDocumentosRoutes);
app.use("/api", fiscalEmpresasRoutes);
app.use("/api", fiscalRoboNotasRoutes);
app.use("/api", fiscalGiaDestdaRoutes);
app.use("/api", fiscalRoboParcelamentosRoutes);
app.use("/api", fiscalSenhasRoutes);
app.use("/api", contabilidadeEmpresasRoutes);
app.use("/api", departamentoPessoalEmpresasRoutes);

app.listen(3000, '0.0.0.0', () => console.log("Servidor rodando na porta 3000"));