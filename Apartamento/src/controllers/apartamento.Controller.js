const db = require("../data/connection");

const listarApartamentos = async (req, res) => {
    const lista = await db.query("SELECT * FROM Apartamento");
    res.json(lista[0]).end();
};

const buscarApartamento = async (req, res) => {
    const id = req.params.id;
    const apto = await db.query("SELECT * FROM Apartamento WHERE id_apartamento = ?", [id]);
    res.json(apto[0][0]).end();
};

const cadastrarApartamento = async (req, res) => {
    const { bloco, numero } = req.body;

    const novo = await db.query(
        "INSERT INTO Apartamento VALUES (DEFAULT, ?, ?)",
        [bloco, numero]
    );

    const apartamento = {
        id_apartamento: novo[0].insertId,
        bloco,
        numero
    };

    res.json(apartamento).status(201).end();
};

const excluirApartamento = async (req, res) => {
    const id = req.params.id;

    try {
        const del = await db.query("DELETE FROM Apartamento WHERE id_apartamento = ?", [id]);
        const info = { msg: "" };

        if (del[0].affectedRows === 1) info.msg = "Apartamento excluído";
        else info.msg = "Apartamento não encontrado";

        res.status(200).json(info).end();
    } catch {
        res.status(500).json({ msg: "Erro ao excluir apartamento" }).end();
    }
};

const atualizarApartamento = async (req, res) => {
    const { id_apartamento, bloco, numero } = req.body;

    try {
        const upd = await db.query(
            "UPDATE Apartamento SET bloco = ?, numero = ? WHERE id_apartamento = ?",
            [bloco, numero, id_apartamento]
        );

        const info = { msg: "" };

        if (upd[0].affectedRows === 0) info.msg = "Nenhum apartamento encontrado";
        else info.msg = "Apartamento atualizado com sucesso";

        res.status(200).json(info).end();
    } catch {
        res.status(500).end();
    }
};

module.exports = {
    listarApartamentos,
    buscarApartamento,
    cadastrarApartamento,
    excluirApartamento,
    atualizarApartamento
};
