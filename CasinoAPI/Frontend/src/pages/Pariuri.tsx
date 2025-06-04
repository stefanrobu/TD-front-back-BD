import React, { useEffect, useState } from 'react';
import { Pariu } from '../types/Pariu';

const Pariuri: React.FC = () => {
  const [pariuri, setPariuri] = useState<Pariu[]>([]);

  useEffect(() => {
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
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/images/background-casino.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '4rem',
        paddingBottom: '4rem',
      }}
    >
      <div className="max-w-4xl w-full bg-black bg-opacity-70 rounded-md shadow-md p-6 text-white">
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#f9fafb',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          📊 Pariurile Tale
        </h1>

        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
            color: '#111827',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'white',
            }}
          >
            <thead>
              <tr
                style={{
                  background:
                    'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)',
                  color: 'white',
                }}
              >
                <th
                  style={{
                    padding: '16px 24px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  #
                </th>
                <th
                  style={{
                    padding: '16px 24px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  ID Utilizator
                </th>
                <th
                  style={{
                    padding: '16px 24px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  ID Joc
                </th>
                <th
                  style={{
                    padding: '16px 24px',
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Suma Pariată
                </th>
                <th
                  style={{
                    padding: '16px 24px',
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Suma Câștigată
                </th>
                <th
                  style={{
                    padding: '16px 24px',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              {pariuri.map((pariu, index) => (
                <tr
                  key={pariu.IDPariu}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
                    borderBottom: '1px solid #f3f4f6',
                    transition: 'background-color 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#eff6ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? 'white' : '#f9fafb';
                  }}
                >
                  <td
                    style={{
                      padding: '16px 24px',
                      color: '#111827',
                      fontWeight: '500',
                    }}
                  >
                    {pariu.IDPariu}
                  </td>
                  <td
                    style={{
                      padding: '16px 24px',
                      color: '#111827',
                      fontWeight: '500',
                    }}
                  >
                    {pariu.IDUtilizator}
                  </td>
                  <td
                    style={{
                      padding: '16px 24px',
                      color: '#111827',
                      fontWeight: '500',
                    }}
                  >
                    {pariu.IDJoc}
                  </td>
                  <td
                    style={{
                      padding: '16px 24px',
                      textAlign: 'right',
                    }}
                  >
                    <span
                      style={{
                        color: '#ea580c',
                        fontWeight: '600',
                        fontSize: '18px',
                      }}
                    >
                      {pariu.SumaPariata.toFixed(2)} RON
                    </span>
                  </td>
                  <td
                    style={{
                      padding: '16px 24px',
                      textAlign: 'right',
                    }}
                  >
                    <span
                      style={{
                        color:
                          pariu.SumaCastigata > 0 ? '#16a34a' : '#dc2626',
                        fontWeight: '600',
                        fontSize: '18px',
                      }}
                    >
                      {pariu.SumaCastigata.toFixed(2)} RON
                    </span>
                  </td>
                  <td
                    style={{
                      padding: '16px 24px',
                      textAlign: 'center',
                      color: '#374151',
                      fontWeight: '500',
                    }}
                  >
                    {new Date(pariu.DataPariu).toLocaleString('ro-RO')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pariuri;
