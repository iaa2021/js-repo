import cron from 'node-cron';
import nodemailer from 'nodemailer';
import express from 'express';

const app = express();

// Configure mail transporter (this is just an example)
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: 'user@example.com',
    pass: 'password'
  }
});

// Schedule a task to run every day at 9:00 AM
cron.schedule('0 9 * * *', async () => {
  console.log('Running daily report task');
  
  try {
    // Generate report data (in a real app, fetch from database)
    const reportData = {
      date: new Date().toISOString().split('T')[0],
      metrics: {
        users: 1250,
        orders: 350,
        revenue: 12500
      }
    };
    
    // Send email with report
    await transporter.sendMail({
      from: 'system@example.com',
      to: 'admin@example.com',
      subject: `Daily Report - ${reportData.date}`,
      html: `
        <h1>Daily Report</h1>
        <p><strong>Date:</strong> ${reportData.date}</p>
        <h2>Key Metrics</h2>
        <ul>
          <li>Users: ${reportData.metrics.users}</li>
          <li>Orders: ${reportData.metrics.orders}</li>
          <li>Revenue: $${reportData.metrics.revenue}</li>
          </ul>
        `
    });
    
    console.log('Daily report email sent successfully');
  } catch (error) {
    console.error('Error sending daily report:', error);
  }
});

// Schedule database backup every Sunday at midnight
cron.schedule('0 0 * * 0', () => {
  console.log('Running weekly database backup');
  // In a real app, you would run a database backup command here
});

// Clean up temporary files every hour
cron.schedule('0 * * * *', () => {
  console.log('Cleaning up temporary files');
  // In a real app, you would delete old temporary files here
});

// API to add a one-time job
const scheduledJobs = new Map();
app.use(express.json());

app.post('/schedule-job', (req, res) => {
  const { id, scheduledTime, task } = req.body;
  
  if (!id || !scheduledTime || !task) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }
  
  const jobTime = new Date(scheduledTime).getTime();
  const currentTime = Date.now();
  
  if (jobTime <= currentTime) {
    return res.status(400).json({ error: 'Scheduled time must be in the future' });
  }
  
  // Schedule the job
  const timeout = setTimeout(() => {
    console.log(`Executing job: ${id}`);
    // In a real app, use a job queue like Bull to handle the tasks
    console.log(`Task: ${task}`);
    
    scheduledJobs.delete(id);
  }, jobTime - currentTime);
  
  scheduledJobs.set(id, { timeout, scheduledTime, task });
  
  res.status(201).json({
    message: 'Job scheduled successfully',
    job: { id, scheduledTime, task }
  });
});

// Start server
app.listen(8080, () => {
  console.log('Task scheduler running on port 8080');
});