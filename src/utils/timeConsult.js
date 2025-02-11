const tempo = (() => {
    const now = new Date();
    let actual_month = now.getMonth() + 1;
    let actual_year = now.getFullYear();

    if (actual_month === 1) {
        actual_month = 12;
        actual_year -= 1;
    } else {
        actual_month -= 1;
    }

    // Formatar o mês para ter sempre dois dígitos (ex: "09" para setembro)
    actual_month = String(actual_month).padStart(2, "0");

    return { actual_month, actual_year };
})();

module.exports = tempo;