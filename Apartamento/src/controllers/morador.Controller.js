const db = require("../data/connection");

const listarMoradores = async (req, res) => {
    const lista = await db.query("SELECT * FROM Morador");
    res.json(lista[0]).end();
};

const buscarMorador = async (req, res) => {
    const id = req.params.id;
    const m = await db.query("SELECT * FROM Morador WHERE id_morador = ?", [id]);
    res.json(m[0][0]).end();
};

const cadastrarMorador = async (req, res) => {
    const { nome, telefone, id_apartamento } = req.body;

    const novo = await db.query(
        "INSERT INTO Morador VALUES (DEFAULT, ?, ?, ?)",
        [nome, telefone, id_apartamento]
    );

    const morador = {
        id_morador: novo[0].insertId,
        nome,
        telefone,
        id_apartamento
    };

    res.json(morador).status(201).end();
};

const excluirMorador = async (req, res) => {
    const id = req.params.id;

    try {
        const del = await db.query("DELETE FROM Morador WHERE id_morador = ?", [id]);
        const info = { msg: "" };

        if (del[0].affectedRows === 1) info.msg = "Morador excluído";
        else info.msg = "Morador não encontrado";

        res.status(200).json(info).end();
    } catch {
        res.status(500).json({ msg: "Erro ao excluir morador" }).end();
    }
};

const atualizarMorador = async (req, res) => {
    const { id_morador, nome, telefone, id_apartamento } = req.body;

    try {
        const upd = await db.query(
            "UPDATE Morador SET nome = ?, telefone = ?, id_apartamento = ? WHERE id_morador = ?",
            [nome, telefone, id_apartamento, id_morador]
        );

        const info = { msg: "" };

        if (upd[0].affectedRows === 0) info.msg = "Nenhum morador encontrado";
        else info.msg = "Morador atualizado com sucesso";

        res.status(200).json(info).end();
    } catch {
        res.status(500).end();
    }
};

module.exports = {
    listarMoradores,
    buscarMorador,
    cadastrarMorador,
    excluirMorador,
    atualizarMorador
};
