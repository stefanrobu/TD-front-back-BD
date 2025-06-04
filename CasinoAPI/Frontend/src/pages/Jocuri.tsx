// src/pages/Jocuri.tsx sau src/components/Jocuri.tsx (în funcție de structură)

import React, { useEffect, useState } from 'react';
import { Joc } from '../types/Joc'; // Asigură-te că calea este corectă

const Jocuri: React.FC = () => {
  const [jocuri, setJocuri] = useState<Joc[]>([]);

  useEffect(() => {
    const mockData: Joc[] = [
      {
        IDJoc: 1,
        NumeLoc: 'Masa Blackjack 1',
        TipJoc: 'Blackjack',
        PariuMinim: 10,
        PariuMaxim: 500,
      },
      {
        IDJoc: 2,
        NumeLoc: 'Ruletă VIP',
        TipJoc: 'Ruletă',
        PariuMinim: 50,
        PariuMaxim: 1000,
      },
      {
        IDJoc: 3,
        NumeLoc: 'Sloturi - Lucky 7',
        TipJoc: 'Slot',
        PariuMinim: 5,
        PariuMaxim: 100,
      },
    ];

    setJocuri(mockData);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Jocuri disponibile</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Nume Loc</th>
            <th className="px-4 py-2 text-left">Tip Joc</th>
            <th className="px-4 py-2 text-left">Pariu Minim</th>
            <th className="px-4 py-2 text-left">Pariu Maxim</th>
          </tr>
        </thead>
        <tbody>
          {jocuri.map((joc) => (
            <tr key={joc.IDJoc} className="border-t">
              <td className="px-4 py-2">{joc.NumeLoc}</td>
              <td className="px-4 py-2">{joc.TipJoc}</td>
              <td className="px-4 py-2">{joc.PariuMinim} RON</td>
              <td className="px-4 py-2">{joc.PariuMaxim} RON</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Jocuri;
