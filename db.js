const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    // Criar tabela de usuários
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`);

    // Criar tabela de alunos com coluna idade
    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        dob TEXT NOT NULL,
        age INTEGER,
        gender TEXT NOT NULL,
        phone TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS avaliacoes_femininas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        aluno_id INTEGER,
        nome TEXT,
        idade INTEGER,
        peso REAL,
        altura REAL,
        peitoral REAL,
        axilar_media REAL,
        triceps REAL,
        subescapular REAL,
        abdomen REAL,
        supra_iliaca REAL,
        coxa REAL,
        percentual_gordura REAL,
        percentual_massa_magra REAL,
        massa_gordura_kg REAL,
        massa_magra_kg REAL,
        imc REAL,
        classificacao_imc TEXT,
        FOREIGN KEY (aluno_id) REFERENCES alunos(id)
      )`);
    
      db.run(`CREATE TABLE IF NOT EXISTS avaliacoes_masculinas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        aluno_id INTEGER,
        nome TEXT,
        idade INTEGER,
        peso REAL,
        altura REAL,
        peitoral REAL,
        abdomen REAL,
        coxa REAL,
        axilar_media REAL,
        subescapular REAL,
        supra_iliaca REAL,
        triceps REAL,
        percentual_gordura REAL,
        percentual_massa_magra REAL,
        massa_gordura_kg REAL,
        massa_magra_kg REAL,
        imc REAL,
        classificacao_imc TEXT,
        FOREIGN KEY (aluno_id) REFERENCES alunos(id)
      )`);
    });
    
module.exports = db;
