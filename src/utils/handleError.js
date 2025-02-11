const handleError = (res, error) => {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro no servidor.", details: error.message });
};

module.exports = handleError;