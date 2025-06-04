--create database Casino
use Casino
CREATE TABLE Users(
    IDUtilizator INT IDENTITY(1,1) PRIMARY KEY,
    NumeUtilizator VARCHAR(50) UNIQUE NOT NULL,
    EmailUser VARCHAR(100) UNIQUE NOT NULL,
    ParolaUser VARCHAR(255) NOT NULL,
    Sold DECIMAL(10, 2) DEFAULT 0.00,
    DataInregistrare DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Jocuri (
    IDJoc INT IDENTITY(1,1) PRIMARY KEY,
    NumeJoc VARCHAR(100) NOT NULL,
    TipJoc VARCHAR(50), -- 'slot', 'blackjack' ...
    PariuMinim DECIMAL(10, 2),
    PariuMaxim DECIMAL(10, 2)
);

CREATE TABLE Pariuri (
    IDPariu INT IDENTITY(1,1) PRIMARY KEY,
    IDUtilizator INT,
    IDJoc INT,
    SumaPariata DECIMAL(10, 2) NOT NULL,
    SumaCastigata DECIMAL(10, 2) DEFAULT 0.00,
    DataPariu DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (IDUtilizator) REFERENCES Users(IDUtilizator),
    FOREIGN KEY (IDJoc) REFERENCES Jocuri(IDJoc)
);

CREATE TABLE Tranzactii (
    IDTranzactie INT IDENTITY(1,1) PRIMARY KEY,
    IDUtilizator INT,
    Suma DECIMAL(10, 2) NOT NULL,
    TipTranzactie VARCHAR(20), -- 'depunere' or 'retragere'
    DataTranzactie DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (IDUtilizator) REFERENCES Users(IDUtilizator)
);
select *from Users
delete from Users