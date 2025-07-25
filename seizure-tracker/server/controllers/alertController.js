import nodemailer from 'nodemailer';
import User from '../models/User.js';

export const sendEmergencyAlert = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user.emergencyContact) return res.status(400).json({ message: 'No emergency contact set' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.emergencyContact,
    subject: '🚨 Seizure Emergency Alert',
    text: `${user.name} may be having a seizure. Please check on them immediately.`
  });

  res.status(200).json({ message: 'Alert sent' });
};
