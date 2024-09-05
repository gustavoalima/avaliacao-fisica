import React from 'react';
import '../App.css'; // Certifique-se de que este arquivo CSS existe

const Card = ({ titulo, dados }) => {
  return (
    <div className="card">
      <h2 className="card-title">{titulo}</h2>
      {Object.entries(dados).map(([chave, valor]) => (
        <p key={chave}>
          <strong>{chave.replace(/_/g, ' ')}:</strong> {valor}
        </p>
      ))}
    </div>
  );
};

export default Card;
