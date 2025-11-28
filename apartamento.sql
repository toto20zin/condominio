
CREATE DATABASE condominio;
USE condominio;

CREATE TABLE Apartamento (
  id_apartamento INT PRIMARY KEY AUTO_INCREMENT,
  bloco VARCHAR(10),
  numero INT
);

CREATE TABLE Morador (
  id_morador INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  telefone VARCHAR(15),
  id_apartamento INT,
  FOREIGN KEY (id_apartamento) REFERENCES Apartamento(id_apartamento)
);

CREATE TABLE Area_Comum (
  id_area INT PRIMARY KEY AUTO_INCREMENT,
  nome_area VARCHAR(50)
);

CREATE TABLE Reserva (
  id_reserva INT PRIMARY KEY AUTO_INCREMENT,
  data_reserva DATE,
  id_apartamento INT,
  id_area INT,
  FOREIGN KEY (id_apartamento) REFERENCES Apartamento(id_apartamento),
  FOREIGN KEY (id_area) REFERENCES Area_Comum(id_area)
);
/////////////////////////////////////////////////////

INSERT INTO Apartamento (bloco, numero)
VALUES ("A", 101), ("A", 102), ("B", 201);

INSERT INTO Morador (nome, telefone, id_apartamento)
VALUES 
("Thomas Fantini", "99999-1111", 1),
("Gilberto Batoni", "98888-2222", 1),
("Elaine Aparecida", "97777-3333", 2),
("susie favoretto", "96666-4444", 3);

INSERT INTO Area_Comum (nome_area)
VALUES ("Salão de Festas"), ("Piscina"), ("Churrasqueira");

INSERT INTO Reserva (data_reserva, id_apartamento, id_area)
VALUES 
("2025-11-15", 1, 1),
("2025-12-20", 2, 1),
("2025-11-22", 3, 3);

////////////////////////////////////////////////


SELECT * FROM Morador 
WHERE id_apartamento = 1;


SELECT * FROM Apartamento 
WHERE bloco = "A";


SELECT * FROM Reserva 
WHERE data_reserva BETWEEN "2025-11-01" AND "2025-11-30";


SELECT * FROM Reserva 
WHERE id_apartamento = 2;

SELECT * FROM Reserva 
WHERE id_area = 1;

SELECT * FROM Area_Comum 
WHERE nome_area IS NOT NULL AND nome_area <> "";

SELECT * FROM Morador 
WHERE telefone IS NOT NULL AND telefone <> "";

SELECT * FROM Apartamento 
WHERE numero > 200;

SELECT * FROM Reserva 
WHERE data_reserva > "2025-01-01";

SELECT A.bloco, A.numero, M.nome
FROM Apartamento A
JOIN Morador M ON A.id_apartamento = M.id_apartamento;