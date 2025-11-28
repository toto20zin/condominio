const db = require("../data/connection");

const listarAreas = async (req, res) => {
    const lista = await db.query("SELECT * FROM Area_Comum");
    res.json(lista[0]).end();
};

const buscarArea = async (req, res) => {
    const id = req.params.id;
    const a = await db.query("SELECT * FROM Area_Comum WHERE id_area = ?", [id]);
    res.json(a[0][0]).end();
};

const cadastrarArea = async (req, res) => {
    const { nome_area } = req.body;

    const nova = await db.query(
        "INSERT INTO Area_Comum VALUES (DEFAULT, ?)",
        [nome_area]
    );

    const area = {
        id_area: nova[0].insertId,
        nome_area
    };

    res.json(area).status(201).end();
};

const excluirArea = async (req, res) => {
    const id = req.params.id;

    try {
        const del = await db.query("DELETE FROM Area_Comum WHERE id_area = ?", [id]);
        const info = { msg: "" };

        if (del[0].affectedRows === 1) info.msg = "Área excluída";
        else info.msg = "Área não encontrada";

        res.status(200).json(info).end();
    } catch {
        res.status(500).json({ msg: "Erro ao excluir área" }).end();
    }
};

const atualizarArea = async (req, res) => {
    const { id_area, nome_area } = req.body;

    try {
        const upd = await db.query(
            "UPDATE Area_Comum SET nome_area = ? WHERE id_area = ?",
            [nome_area, id_area]
        );

        const info = { msg: "" };

        if (upd[0].affectedRows === 0) info.msg = "Nenhuma área encontrada";
        else info.msg = "Área atualizada com sucesso";

        res.status(200).json(info).end();
    } catch {
        res.status(500).end();
    }
};

module.exports = {
    listarAreas,
    buscarArea,
    cadastrarArea,
    excluirArea,
    atualizarArea
};
