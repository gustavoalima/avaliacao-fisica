import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaClipboardList, FaDumbbell, FaPhone, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import '../App.css'; // Import CSS for Menu

const Menu = () => {
    return (
        <div className="menu-container">
            <nav className="sidebar">
                <ul>
                    <li><Link to="/menu/dashboard"><FaTachometerAlt /> Dashboard</Link></li>
                    <li><Link to="/menu/alunos"><FaUsers /> Alunos</Link></li>
                    <li><Link to="/menu/avaliacoes"><FaClipboardList /> Avaliações</Link></li>
                    <li><Link to="/menu/treinos"><FaDumbbell /> Treinos</Link></li>
                    <li><Link to="/menu/contato"><FaPhone /> Contato</Link></li>
                    <li><Link to="/"><FaSignOutAlt /> Sair</Link></li>
                </ul>
            </nav>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default Menu;
