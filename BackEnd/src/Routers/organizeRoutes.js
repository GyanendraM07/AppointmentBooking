const appointmentRoutes = require('../Controllers/AppointmentController');
const apiRoutes = require('../Controllers/ApiCheckController');
const userRoutes = require('../Controllers/UserController');
const adminRoutes = require('../Controllers/AdminController');
const authenticate = require('../security/Authentication');


function organizeRoutes(app) {
  // Mount appointmentRoutes under '/apt'
  app.use('/apt',authenticate.authenticateToken, appointmentRoutes);
  app.use('/check',apiRoutes);
  app.use('/user', userRoutes);
  app.use('/admin',authenticate.authenticateToken, adminRoutes);
}

module.exports = organizeRoutes;
