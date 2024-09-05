import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Import FontAwesome icons
import '../App.css';

const ViewStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/students/${id}`);
                setStudent(response.data);
            } catch (err) {
                console.error('Error fetching student:', err);
            }
        };

        fetchStudent();
    }, [id]);

    if (!student) return <p>Loading...</p>;

    return (
        <div className="view-student-container">
            <div className="back-button" onClick={() => navigate('/menu/alunos')}>
                <FaArrowLeft size={20} />
                <span>Back to Students</span>
            </div>
            <h2>Student Details</h2>
            <div className="student-details">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Date of Birth:</strong> {student.dob}</p>
                <p><strong>Gender:</strong> {student.gender}</p>
                <p><strong>Phone:</strong> {student.phone}</p>
            </div>
            <button onClick={() => navigate(`/menu/edit-student/${student.id}`)}>Edit</button>
        </div>
    );
};

export default ViewStudent;
