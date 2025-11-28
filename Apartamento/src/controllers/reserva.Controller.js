const db = require("../data/connection");

const listarReservas = async (req, res) => {
    const lista = await db.query("SELECT * FROM Reserva");
    res.json(lista[0]).end();
};

const buscarReserva = async (req, res) => {
    const id = req.params.id;
    const r = await db.query("SELECT * FROM Reserva WHERE id_reserva = ?", [id]);
    res.json(r[0][0]).end();
};

const cadastrarReserva = async (req, res) => {
    const { data_reserva, id_apartamento, id_area } = req.body;

    const nova = await db.query(
        "INSERT INTO Reserva VALUES (DEFAULT, ?, ?, ?)",
        [data_reserva, id_apartamento, id_area]
    );

    const reserva = {
        id_reserva: nova[0].insertId,
        data_reserva,
        id_apartamento,
        id_area
    };

    res.json(reserva).status(201).end();
};

const excluirReserva = async (req, res) => {
    const id = req.params.id;

    try {
        const del = await db.query("DELETE FROM Reserva WHERE id_reserva = ?", [id]);
        const info = { msg: "" };

        if (del[0].affectedRows === 1) info.msg = "Reserva excluída";
        else info.msg = "Reserva não encontrada";

        res.status(200).json(info).end();
    } catch {
        res.status(500).json({ msg: "Erro ao excluir reserva" }).end();
    }
};

const atualizarReserva = async (req, res) => {
    const { id_reserva, data_reserva, id_apartamento, id_area } = req.body;

    try {
        const upd = await db.query(
            "UPDATE Reserva SET data_reserva = ?, id_apartamento = ?, id_area = ? WHERE id_reserva = ?",
            [data_reserva, id_apartamento, id_area, id_reserva]
        );

        const info = { msg: "" };

        if (upd[0].affectedRows === 0) info.msg = "Nenhuma reserva encontrada";
        else info.msg = "Reserva atualizada com sucesso";

        res.status(200).json(info).end();
    } catch {
        res.status(500).end();
    }
};

module.exports = {
    listarReservas,
    buscarReserva,
    cadastrarReserva,
    excluirReserva,
    atualizarReserva
};
