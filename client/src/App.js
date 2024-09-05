import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import Alunos from './components/Alunos';
import AddStudent from './components/AddStudent';
import Avaliacoes from './components/Avaliacoes';
import Treinos from './components/Treinos';
import Contato from './components/Contato';
import Dashboard from './components/Dashboard';
import ViewStudent from './components/ViewStudent';
import EditStudent from './components/EditStudent';
import AvaliacaoMasculina from './components/AvaliacaoMasculina';
import AvaliacaoFeminina from './components/AvaliacaoFeminina';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/menu" element={<Menu />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="alunos" element={<Alunos />} />
                    <Route path="add-student" element={<AddStudent />} />
                    <Route path="view-student/:id" element={<ViewStudent />} />
                    <Route path="edit-student/:id" element={<EditStudent />} />
                    <Route path="avaliacoes" element={<Avaliacoes />} />
                    <Route path="avaliacao-masculina/:id" element={<AvaliacaoMasculina />} />
                    <Route path="avaliacao-feminina/:id" element={<AvaliacaoFeminina />} />
                    <Route path="treinos" element={<Treinos />} />
                    <Route path="contato" element={<Contato />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
