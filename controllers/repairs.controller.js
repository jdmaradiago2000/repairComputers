//Models
const { Repair } = require('../models/repair.model');
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');

const getAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    include: [{ model: User }],
  });

  res.status(200).json({ repairs });
});

const createRepair = catchAsync(async (req, res, next) => {
  const { date, userId, comments, computerNumber } = req.body;
  const newRepair = await Repair.create({
    date,
    userId,
    comments,
    computerNumber,
  });
  res.status(201).json({ newRepair });
});

const getRepairById = catchAsync(async (req, res, next) => {
  const { repair } = req;

  res.status(200).json({
    repair,
  });
});

const updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({ status: 'Completed' });

  res.status(200).json({ status: 'Success' });
});

const deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
};
