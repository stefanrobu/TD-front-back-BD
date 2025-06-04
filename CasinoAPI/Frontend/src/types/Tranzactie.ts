export interface Tranzactie {
  IDTranzactie: number;
  IDUtilizator: number;
  Suma: number;
  TipTranzactie: string; // ex: "Depunere", "Retragere"
  DataTranzactie: string; // ISO string
}
