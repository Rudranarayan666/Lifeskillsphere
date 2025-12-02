const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class TestResult extends Model {}

TestResult.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    testType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    percentile: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    traits: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Facet/trait scores',
    },
    rawResponses: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Raw answer payload',
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    finishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'TestResult',
    tableName: 'test_results',
    indexes: [
      { fields: ['userId'] },
      { fields: ['testType'] },
      { fields: ['userId', 'finishedAt'] },
      { fields: ['userId', 'testType', 'finishedAt'] },
    ],
  }
);

module.exports = TestResult;


