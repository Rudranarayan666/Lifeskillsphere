const User = require('./User');
const TestResult = require('./TestResult');

// Define associations
User.hasMany(TestResult, { foreignKey: 'userId' });
TestResult.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, TestResult };


