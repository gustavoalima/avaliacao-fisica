const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const secret = 'your_jwt_secret';

// Endpoint para registrar usuário
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
        if (err) {
            return res.status(400).json({ error: 'User already exists or other error' });
        }
        res.json({ id: this.lastID });
    });
});

// Endpoint para login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    db.all(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ auth: false, token: null });
        }

        const token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });
        res.json({ auth: true, token });
    });
});

// Endpoint para adicionar aluno
app.post('/students', (req, res) => {
    const { name, dob, gender, phone } = req.body;
    if (!name || !dob || !gender || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.run(`INSERT INTO students (name, dob, gender, phone) VALUES (?, ?, ?, ?)`, [name, dob, gender, phone], function(err) {
        if (err) {
            return res.status(400).json({ error: 'Error adding student' });
        }
        res.json({ id: this.lastID });
    });
});

// Endpoint para atualizar aluno
app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, dob, gender, phone } = req.body;

    if (!name || !dob || !gender || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.run(`UPDATE students SET name = ?, dob = ?, gender = ?, phone = ? WHERE id = ?`, [name, dob, gender, phone, id], function(err) {
        if (err) {
            return res.status(400).json({ error: 'Error updating student' });
        }
        res.json({ message: 'Student updated successfully' });
    });
});

// Endpoint para buscar aluno por ID
app.get('/students/:id', (req, res) => {
    const { id } = req.params;

    db.get(`SELECT * FROM students WHERE id = ?`, [id], (err, student) => {
        if (err) {
            return res.status(400).json({ error: 'Error fetching student' });
        }

        if(student.gender.toUpperCase() === 'Male'.toUpperCase()){
            console.log('masculino');
              db.all(`SELECT * FROM avaliacoes_masculinas WHERE aluno_id = ? ORDER BY id DESC LIMIT 2`, [id], (err, avaliacoes) => {
                if (err) {
                    return res.status(400).json({ error: 'Error fetching avaliacoes' });
                }
                console.log(avaliacoes);
                student.avaliacoes = avaliacoes
                res.json(student);

            })

        }
        if(student.gender.toUpperCase() === 'Female'.toUpperCase()){
            console.log('feminino');
            db.all(`SELECT * FROM avaliacoes_femininas WHERE aluno_id = ? ORDER BY id DESC LIMIT 2`, [id], (err, avaliacoes) => {
                if (err) {
                    return res.status(400).json({ error: 'Error fetching avaliacoes' });
                }
                console.log(avaliacoes);
                student.avaliacoes = avaliacoes
                res.json(student);

            })
        }
        
        
    });
});

// Endpoint para buscar alunos por nome
app.get('/students', (req, res) => {
    const searchTerm = req.query.search || '';

    db.all(`SELECT * FROM students WHERE name LIKE ?`, [`%${searchTerm}%`], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: 'Error fetching students' });
        }

        res.json(rows);
    });
});

// Endpoint para adicionar avaliação masculina
app.post('/avaliacao-masculina', (req, res) => {
    const {
      aluno_id, nome, idade, peso, altura, peitoral, abdomen, coxa, axilar_media, subescapular,
      supra_iliaca, triceps, percentual_gordura, percentual_massa_magra, massa_gordura_kg,
      massa_magra_kg, imc, classificacao_imc
    } = req.body;
  
    db.run(`INSERT INTO avaliacoes_masculinas (
        aluno_id, nome, idade, peso, altura, peitoral, abdomen, coxa, axilar_media, subescapular,
        supra_iliaca, triceps, percentual_gordura, percentual_massa_magra, massa_gordura_kg,
        massa_magra_kg, imc, classificacao_imc
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        aluno_id, nome, idade, peso, altura, peitoral, abdomen, coxa, axilar_media, subescapular,
        supra_iliaca, triceps, percentual_gordura, percentual_massa_magra, massa_gordura_kg,
        massa_magra_kg, imc, classificacao_imc
      ],
      function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ message: 'Avaliação masculina salva com sucesso!' });
      }
    );
  });
  

// Endpoint para adicionar avaliação feminina
app.post('/avaliacao-feminina', (req, res) => {
    const {
      aluno_id, nome, idade, peso, altura, peitoral, axilar_media, triceps,
      subescapular, abdomen, supra_iliaca, coxa, percentual_gordura,
      percentual_massa_magra, massa_gordura_kg, massa_magra_kg, imc, classificacao_imc
    } = req.body;
  
    db.run(`INSERT INTO avaliacoes_femininas (
        aluno_id, nome, idade, peso, altura, peitoral, axilar_media, triceps, subescapular,
        abdomen, supra_iliaca, coxa, percentual_gordura, percentual_massa_magra,
        massa_gordura_kg, massa_magra_kg, imc, classificacao_imc
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        aluno_id, nome, idade, peso, altura, peitoral, axilar_media, triceps, subescapular,
        abdomen, supra_iliaca, coxa, percentual_gordura, percentual_massa_magra,
        massa_gordura_kg, massa_magra_kg, imc, classificacao_imc
      ],
      function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ message: 'Avaliação feminina salva com sucesso!' });
      }
    );
  });
  

// Start server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
