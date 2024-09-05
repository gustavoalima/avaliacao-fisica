import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaCalendarAlt, FaTransgender, FaPhone } from 'react-icons/fa'; // Import FontAwesome icons
import '../App.css';

const EditStudent = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/students/${id}`);
                const student = response.data;
                setName(student.name);
                setDob(student.dob);
                setGender(student.gender);
                setPhone(student.phone);
            } catch (err) {
                console.error('Error fetching student:', err);
            }
        };

        fetchStudent();
    }, [id]);

    const handleUpdateStudent = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/students/${id}`, { name, dob, gender, phone });
            navigate('/menu/alunos');
        } catch (err) {
            setError('Failed to update student.');
        }
    };

    // Função para formatar a data de nascimento
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
    };

    return (
        <div className="edit-student-container">
            <div className="back-button" onClick={() => navigate('/menu/alunos')}>
                <FaArrowLeft size={20} />
                <span>Back to Students</span>
            </div>
            <form onSubmit={handleUpdateStudent} className="edit-student-form">
                <h2>Edit Student</h2>
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
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditStudent;
