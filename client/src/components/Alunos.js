import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../App.css';
import { FaPlus } from 'react-icons/fa'; // Import FontAwesome Plus icon

const Alunos = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/students?search=${searchTerm}`);
            setStudents(response.data);
        } catch (err) {
            console.error('Error fetching students:', err);
        }
    };

    return (
        <div className="alunos-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for a student"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="student-list">
                {students.length > 0 ? (
                    students.map(student => (
                        <div key={student.id} className="student-card">
                            <div className="student-info">
                                <h3>{student.name}</h3>
                                <p><strong>Date of Birth:</strong> {student.dob}</p>
                                <p><strong>Gender:</strong> {student.gender}</p>
                                <p><strong>Phone:</strong> {student.phone}</p>
                            </div>
                            <div className="student-actions">
                                <Link to={`/menu/view-student/${student.id}`} className="view-button">
                                    View
                                </Link>
                                <Link to={`/menu/edit-student/${student.id}`} className="edit-button">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No students found</p>
                )}
            </div>
            <div className="add-button">
                <Link to="/menu/add-student">
                    <FaPlus size={24} />
                </Link>
            </div>
        </div>
    );
};

export default Alunos;
