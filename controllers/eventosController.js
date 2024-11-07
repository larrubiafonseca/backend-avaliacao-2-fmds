import db from '../config/configDataBase.js'

const addEvento = (req, res) => {
    const { nome, data, local, descricao } = req.body;
  
  const query = 'INSERT INTO eventos (nome, data, local, descricao) VALUES (?, ?, ?, ?)';
  
  db.query(query, [nome, data, local, descricao], (error, results) => {
    if (error) {
      console.error('Erro ao inserir evento:', error);
      res.status(500).json({ message: 'Erro ao criar o evento.' });
    } else {
      res.status(201).json({ message: 'Evento criado com sucesso!', eventoId: results.insertId });
    }
  });
};

const getEventos =  (req, res) => {
    const query = 'SELECT * FROM eventos';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao buscar eventos:', error);
      res.status(500).json({ message: 'Erro ao buscar eventos.' });
    } else {
      res.status(200).json(results);
    }
  });
}

const getEvento = (req, res) => {
    const { id } = req.params;

  const query = 'SELECT * FROM eventos WHERE autoid = ?';

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error('Erro ao buscar evento:', error);
      res.status(500).json({ message: 'Erro ao buscar o evento.' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Evento não encontrado.' });
    } else {
      res.status(200).json(results[0]);
    }
  });
}

const updateEvento = (req, res) => {
    const { id } = req.params;
  const { nome, data, local, descricao } = req.body;

  const query = 'UPDATE eventos SET nome = ?, data = ?, local = ?, descricao = ? WHERE autoid = ?';

   db.query(query, [nome, data, local, descricao, id],  (error, results) => {
    if (error) {
      console.error('Erro ao atualizar evento:', error);
      res.status(500).json({ message: 'Erro ao atualizar o evento.' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Evento não encontrado.' });
    } else {
      res.status(200).json({ message: 'Evento atualizado com sucesso!' });
    }
  });
}

const deleteEvento = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM eventos WHERE autoid = ?';
  
    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('Erro ao deletar evento:', error);
        res.status(500).json({ message: 'Erro ao deletar o evento.' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Evento não encontrado.' });
      } else {
        res.status(200).json({ message: 'Evento deletado com sucesso!' });
      }
    });
}

export default {
    addEvento,
    getEventos,
    getEvento,
    updateEvento,
    deleteEvento
    }