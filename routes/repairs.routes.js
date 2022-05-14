const express = require('express');

// Middlewares
const { repairExists } = require('../middlewares/repairs.middlewares');
const {
  protectToken,
  protectEmployee,
} = require('../middlewares/users.middlewares');

const {
  createRepairValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

//Controller
const {
  getAllRepairs,
  getAllCompletedRepairs,
  getAllPendingRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');

const router = express.Router();

router.post('/', createRepairValidations, checkValidations, createRepair);

router.use(protectToken);
router.get('/', protectEmployee, getAllRepairs);
router.get('/completed', protectEmployee, getAllCompletedRepairs);
router.get('/pending', protectEmployee, getAllPendingRepairs);

router
  .use('/:id', repairExists)
  .route('/:id')
  .get(repairExists, protectEmployee, getRepairById)
  .patch(repairExists, protectEmployee, updateRepair)
  .delete(repairExists, protectEmployee, deleteRepair);

module.exports = { repairsRouter: router };
