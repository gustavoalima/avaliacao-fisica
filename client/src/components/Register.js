import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Certifique-se de que o caminho está correto

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false); // Nova variável de estado para indicar sucesso
    const navigate = useNavigate(); // Hook para navegação

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }

        try {
            await axios.post('http://localhost:3001/register', { username, password });
            setSuccess(true); // Define o estado de sucesso
            alert('Usuário cadastrado com sucesso!'); // Exibe o alerta de sucesso
        } catch (error) {
            alert('Registro falhou'); // Exibe um alerta para falha no registro
            console.error(error.response.data);
        }
    };

    // Redirecionar para a tela de login após o sucesso
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 1500); // Aguarde 1,5 segundos antes de redirecionar

            return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
        }
    }, [success, navigate]);

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Registro</h2>
                <input 
                    type="text" 
                    placeholder="Nome de usuário" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Confirmar Senha" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                <button onClick={handleRegister}>Registrar</button>
                <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
            </div>
        </div>
    );
};

export default Register;
