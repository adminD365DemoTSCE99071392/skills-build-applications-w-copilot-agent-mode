import app from './app.js';
import './config/database.js';
import { PORT } from './config/env.js';

app.listen(PORT, () => {
  console.log(`Backend server listening at http://localhost:${PORT}`);
});
