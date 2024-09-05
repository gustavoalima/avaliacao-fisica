import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Certifique-se de que o caminho está correto

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    const handleLogin = async () => {
        try {
            await axios.post('http://localhost:3001/login', { username, password });
            alert('Login bem-sucedido!');
            navigate('/menu/dashboard'); // Redirecionar para o menu/dashboard após login
        } catch (error) {
            console.error(error.response.data);
            alert('Login falhou. Verifique suas credenciais.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <img src={require('../assets/logo.png')} alt="Logo" className="logo" />
                <h2>Login</h2>
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
                <button onClick={handleLogin}>Entrar</button>
                <p>Não tem uma conta? <Link to="/register">Registrar</Link></p>
            </div>
        </div>
    );
};

export default Login;
