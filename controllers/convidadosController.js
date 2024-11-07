import db from '../config/configDataBase.js'

const addConvidado = (req, res) => {
    const { idEvento } = req.params; 
  const { nome } = req.body; 

 
  if (!nome) {
    return res.status(400).json({ message: 'O campo nome é obrigatório.' });
  }

  const query = 'INSERT INTO convidados (nome, evento) VALUES (?, ?)';

  db.query(query, [nome, idEvento], (error, results) => {
    if (error) {
      console.error('Erro ao adicionar convidado:', error);
      res.status(500).json({ message: 'Erro ao adicionar o convidado.' });
    } else {
      res.status(201).json({ message: 'Convidado adicionado com sucesso!', convidadoId: results.insertId });
    }
  });
};

const getConvidados =  (req, res) => {
    const { idEventos } = req.params;

  const query = 'SELECT * FROM convidados WHERE evento = ?';

  db.query(query, [idEventos], (error, results) => {
    if (error) {
      console.error('Erro ao buscar convidados:', error);
      res.status(500).json({ message: 'Erro ao buscar convidados.' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Nenhum convidado encontrado para este evento.' });
    } else {
      res.status(200).json(results);
    }
  });
    
};

const deleteConvidado = (req, res) => {
    const { idEventos, convidadoId } = req.params;

  const query = 'DELETE FROM convidados WHERE evento = ? AND autoid = ?';

  db.query(query, [idEventos, convidadoId], (error, results) => {
    if (error) {
      console.error('Erro ao deletar convidado:', error);
      res.status(500).json({ message: 'Erro ao deletar o convidado.' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Convidado não encontrado para este evento.' });
    } else {
      res.status(200).json({ message: 'Convidado deletado com sucesso!' });
    }
  });
};

export default {
    addConvidado,
    getConvidados,
    deleteConvidado
    }