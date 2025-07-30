// server/utils/sendAlert.js

export default async function sendAlert(userName, emergencyContact) {
  try {
    console.log(`🚨 Emergency Alert: Sending alert for ${userName} to ${emergencyContact}`);

    // 🔧 Placeholder for integration with real alert service (e.g., SMS API like Twilio or Email)
    // Simulate async action
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { success: true, message: `Alert sent to ${emergencyContact}` };
  } catch (error) {
    console.error('Error sending alert:', error);
    throw new Error('Failed to send emergency alert');
  }
}
