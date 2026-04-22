const app = require('./src/app');
const { connectToDatabase } = require('./src/config/db');

const port = Number(process.env.PORT) || 4000;

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start API:', error);
    process.exit(1);
  }
};

startServer();
