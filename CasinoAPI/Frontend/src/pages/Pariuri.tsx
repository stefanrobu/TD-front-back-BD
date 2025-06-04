// src/pages/Pariuri.tsx
import React, { useEffect, useState } from 'react';
import { Pariu } from '../types/Pariu';

const Pariuri: React.FC = () => {
  const [pariuri, setPariuri] = useState<Pariu[]>([]);

  useEffect(() => {
    // Temporar: date simulate
    const mockPariuri: Pariu[] = [
      {
        IDPariu: 1,
        IDUtilizator: 101,
        IDJoc: 5,
        SumaPariata: 100.0,
        SumaCastigata: 250.0,
        DataPariu: '2025-06-04T12:00:00',
      },
      {
        IDPariu: 2,
        IDUtilizator: 102,
        IDJoc: 2,
        SumaPariata: 50.0,
        SumaCastigata: 0.0,
        DataPariu: '2025-06-03T15:45:00',
      },
    ];

    setPariuri(mockPariuri);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pariurile Tale</h1>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">ID Utilizator</th>
            <th className="p-2 border">ID Joc</th>
            <th className="p-2 border">Suma Pariată</th>
            <th className="p-2 border">Suma Câștigată</th>
            <th className="p-2 border">Data</th>
          </tr>
        </thead>
        <tbody>
          {pariuri.map((pariu) => (
            <tr key={pariu.IDPariu} className="text-center">
              <td className="p-2 border">{pariu.IDPariu}</td>
              <td className="p-2 border">{pariu.IDUtilizator}</td>
              <td className="p-2 border">{pariu.IDJoc}</td>
              <td className="p-2 border">{pariu.SumaPariata.toFixed(2)} RON</td>
              <td className="p-2 border">{pariu.SumaCastigata.toFixed(2)} RON</td>
              <td className="p-2 border">
                {new Date(pariu.DataPariu).toLocaleString('ro-RO')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pariuri;
