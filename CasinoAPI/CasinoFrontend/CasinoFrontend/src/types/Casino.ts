export type User = {
  IDUtilizator: number;
  NumeUtilizator: string;
  EmailUser: string;
  ParolaUser: string;
  Sold?: number;
  DataInregistrare?: string; // ISO format
};

export type Joc = {
  IDJoc: number;
  NumeJoc: string;
  TipJoc?: string;
  PariuMinim?: number;
  PariuMaxim?: number;
};

export type Pariu = {
  IDPariu: number;
  IDUtilizator?: number;
  IDJoc?: number;
  SumaPariata: number;
  SumaCastigata?: number;
  DataPariu?: string; // ISO format
};

export type Tranzactie = {
  IDTranzactie: number;
  IDUtilizator?: number;
  Suma: number;
  TipTranzactie: string;
  DataTranzactie?: string; // ISO format
};

export {};
