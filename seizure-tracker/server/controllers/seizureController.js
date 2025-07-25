import Seizure from '../models/SeizureLog.js';

export const addSeizure = async (req, res) => {
  const { type, duration, notes } = req.body;
  const seizure = await Seizure.create({
    user: req.user._id,
    type,
    duration,
    notes
  });
  res.status(201).json(seizure);
};

export const getSeizures = async (req, res) => {
  const seizures = await Seizure.find({ user: req.user._id }).sort({ date: -1 });
  res.json(seizures);
};

export const deleteSeizure = async (req, res) => {
  const { id } = req.params;
  await Seizure.findByIdAndDelete(id);
  res.json({ message: 'Deleted successfully' });
};
