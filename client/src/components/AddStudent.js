import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaCalendarAlt, FaTransgender, FaPhone } from 'react-icons/fa'; // Import FontAwesome icons
import '../App.css';

const AddStudent = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState(''); // Data de nascimento
    const [age, setAge] = useState(''); // Idade
    const [gender, setGender] = useState(''); // Sexo
    const [phone, setPhone] = useState(''); // Telefone
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Hook para navegação programática

    // Função para calcular a idade com base na data de nascimento
    const calculateAge = (dob) => {
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDifference = today.getMonth() - dobDate.getMonth();
        const dayDifference = today.getDate() - dobDate.getDate();
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }
        return age;
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/students', { name, dob, age, gender, phone });
            navigate('/menu/alunos'); // Navega de volta para a tela de alunos
        } catch (err) {
            setError('Failed to add student.');
        }
    };

    // Função para formatar a data de nascimento e calcular a idade
    const handleDobChange = (e) => {
        let value = e.target.value;

        // Remove tudo que não é número
        value = value.replace(/\D/g, '');

        // Adiciona as barras (/)
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        if (value.length > 5) {
            value = value.substring(0, 5) + '/' + value.substring(5);
        }

        setDob(value);

        // Calcular idade somente se o valor for uma data válida
        if (value.length === 10) {
            // Converte data no formato dd/mm/aaaa para yyyy-mm-dd
            const [day, month, year] = value.split('/');
            const formattedDate = `${year}-${month}-${day}`;
            setAge(calculateAge(formattedDate));
        } else {
            setAge('');
        }
    };

    return (
        <div className="add-student-container">
            <div className="back-button" onClick={() => navigate('/menu/alunos')}>
                <FaArrowLeft size={20} />
                <span>Back to Students</span>
            </div>
            <form onSubmit={handleAddStudent} className="add-student-form">
                <h2>Add New Student</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <FaUser className="form-icon" />
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <FaCalendarAlt className="form-icon" />
                    <input
                        type="text"
                        placeholder="dd/mm/aaaa"
                        value={dob}
                        onChange={handleDobChange}
                        maxLength="10"
                        required
                    />
                </div>
                <div className="form-group">
                    <FaCalendarAlt className="form-icon" />
                    <input
                        type="text"
                        placeholder="Age"
                        value={age}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <FaTransgender className="form-icon" />
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <FaPhone className="form-icon" />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default AddStudent;
