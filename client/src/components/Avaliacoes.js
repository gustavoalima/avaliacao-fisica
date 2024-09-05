import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Avaliacao = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setError('Por favor, insira um termo de pesquisa.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/students?search=${searchTerm}`);
      setStudents(response.data);
      if (response.data.length === 0) {
        setError('Nenhum aluno encontrado.');
      } else {
        setError('');
      }
    } catch (err) {
      console.error('Erro ao buscar alunos:', err);
      setError('Erro ao buscar alunos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (student) => {
    if (student.gender === 'Male') {
      navigate(`/menu/avaliacao-masculina/${student.id}`, { state: { nome: student.name, idade: student.age } });
    } else {
      navigate(`/menu/avaliacao-feminina/${student.id}`, { state: { nome: student.name, idade: student.age } });
    }
  };

  return (
    <div className="avaliacao-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar aluno"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}
      <div className="student-list">
        {students.length > 0 && !loading && (
          students.map(student => (
            <div key={student.id} className="student-card">
              <div className="student-info">
                <h3>{student.name}</h3>
                <p><strong>Data de Nascimento:</strong> {student.dob}</p>
                <p><strong>Gênero:</strong> {student.gender}</p>
              </div>
              <button onClick={() => handleSelect(student)} className="select-button">
                Selecionar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Avaliacao;
