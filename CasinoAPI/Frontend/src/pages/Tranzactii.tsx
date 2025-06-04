import React, { useEffect, useState } from 'react';
import { Tranzactie } from '../types/Tranzactie';

const Tranzactii: React.FC = () => {
  const [tranzactii, setTranzactii] = useState<Tranzactie[]>([]);

  useEffect(() => {
    const mockData: Tranzactie[] = [
      {
        IDTranzactie: 1,
        IDUtilizator: 101,
        Suma: 200,
        TipTranzactie: 'Depunere',
        DataTranzactie: '2025-06-01T10:00:00',
      },
      {
        IDTranzactie: 2,
        IDUtilizator: 101,
        Suma: 100,
        TipTranzactie: 'Retragere',
        DataTranzactie: '2025-06-02T14:45:00',
      },
      {
        IDTranzactie: 3,
        IDUtilizator: 101,
        Suma: 300,
        TipTranzactie: 'Depunere',
        DataTranzactie: '2025-06-03T12:15:00',
      },
    ];

    setTranzactii(mockData);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Istoric Tranzacții</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Tip</th>
            <th className="px-4 py-2 text-left">Suma</th>
            <th className="px-4 py-2 text-left">Data</th>
          </tr>
        </thead>
        <tbody>
          {tranzactii.map((t) => (
            <tr key={t.IDTranzactie} className="border-t">
              <td className="px-4 py-2">{t.TipTranzactie}</td>
              <td className="px-4 py-2">{t.Suma.toFixed(2)} RON</td>
              <td className="px-4 py-2">
                {new Date(t.DataTranzactie).toLocaleString('ro-RO')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tranzactii;
