const { Repair } = require('../models/repair.models');

const getAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll();
    res.status(200).json({ repairs });
  } catch (error) {
    console.log(error);
  }
};

const createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;
    const newRepair = await Repair.create({ date, userId });
    res.status(201).json({ newRepair });
  } catch (error) {
    console.log(error);
  }
};

const getRepairById = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({ where: { id } });

    if (!repair) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Repair not found given that id' });
    }

    res.status(200).json({
      repair,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const repair = await Repair.findOne({ where: { id } });

    if (!repair) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Repair not found given that id' });
    }

    await repair.update({ name });

    res.status(200).json({ status: 'Success' });
  } catch (error) {
    console.log(error);
  }
};

const deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({ where: { id } });

    if (!repair) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Repair not found given that id' });
    }

    await repair.update({ status: 'deleted' });

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
};
