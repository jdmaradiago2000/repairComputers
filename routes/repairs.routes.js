const express = require('express');
const { body } = require('express-validator');

// Middlewares
const { repairExists } = require('../middlewares/repairs.middlewares');
const {
  createRepairValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

//Controller
const {
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');

const router = express.Router();

router.get('/', getAllRepairs);
router.post('/', createRepairValidations, checkValidations, createRepair);
router
  .use('/:id', repairExists)
  .route('/:id')
  .get(repairExists, getRepairById)
  .patch(repairExists, updateRepair)
  .delete(repairExists, deleteRepair);

module.exports = { repairsRouter: router };
