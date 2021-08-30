const contactController = require('../controllers/contactController');
const express = require('express');
const router = express.Router();

// rotas de contato
router.get(`/contato/all`, contactController.getAll);
router.get(`/contato/`, contactController.get);
router.get(`/contato/:id`, contactController.getId);
router.post(`/contato/`, contactController.post);
router.put(`/contato/:id`, contactController.put);
router.delete(`/contato/:id`, contactController.delete);


module.exports = router;