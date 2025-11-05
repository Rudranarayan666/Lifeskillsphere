// models/User.js
// Sequelize User model definition

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: () => uuidv4(),
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Name is required' },
				len: { args: [2, 100], msg: 'Name must be between 2 and 100 characters' },
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: { msg: 'Must be a valid email address' },
				notEmpty: { msg: 'Email is required' },
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Password hash is required' },
				len: { args: [8, 255], msg: 'Password hash length invalid' },
			},
			comment: 'Stores the bcrypt-hashed password',
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: { msg: 'Age must be an integer' },
				min: { args: [1], msg: 'Age must be a positive integer' },
			},
		},
		section: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Section is required' },
				len: { args: [2, 100], msg: 'Section must be between 2 and 100 characters' },
			},
			comment: 'e.g., "Grade 10", "Marketing Dept"',
		},
		isVerified: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		verificationToken: {
			type: DataTypes.STRING,
			allowNull: true,
			comment: 'Holds email verification token until verified',
		},
		verificationCode: {
			type: DataTypes.STRING,
			allowNull: true,
			comment: 'Temporary 6-digit email verification code',
		},
		verificationCodeExpiresAt: {
			type: DataTypes.DATE,
			allowNull: true,
			comment: 'Expiry time for the verification code',
		},
	},
	{
		sequelize,
		modelName: 'User',
		tableName: 'users',
		indexes: [
			{ unique: true, fields: ['email'] },
			{ fields: ['verificationToken'] },
		],
	}
);

module.exports = User;



