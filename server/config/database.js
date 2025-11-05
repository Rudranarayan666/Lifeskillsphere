// config/database.js
// Sequelize configuration and connection setup for PostgreSQL

const { Sequelize } = require('sequelize');
const { Client } = require('pg');

const {
	NODE_ENV = 'development',
	DB_HOST = 'localhost',
	DB_PORT = '5432',
	DB_NAME = 'psychometric_db',
	DB_USER = 'postgres',
	DB_PASS = '123456',
	DB_SSL = 'false',
	DB_LOGGING = 'false',
} = process.env;

const useSSL = String(DB_SSL).toLowerCase() === 'true';
const loggingEnabled = String(DB_LOGGING).toLowerCase() === 'true';

// Create Sequelize instance
const sequelize = new Sequelize(String(DB_NAME || ''), String(DB_USER || ''), String(DB_PASS ?? ''), {
	host: DB_HOST,
	port: Number(DB_PORT),
	dialect: 'postgres',
	logging: loggingEnabled ? console.log : false,
	dialectOptions: useSSL
		? {
				ssl: {
					require: true,
					rejectUnauthorized: false,
				},
		  }
		: {},
	define: {
		underscored: false,
		freezeTableName: true,
		timestamps: true,
	},
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

async function ensureDatabaseExists() {
	const adminClient = new Client({
		host: DB_HOST,
		port: Number(DB_PORT),
		user: String(DB_USER || ''),
		password: String(DB_PASS ?? ''),
		database: 'postgres',
		ssl: useSSL
			? { rejectUnauthorized: false }
			: undefined,
	});

	await adminClient.connect();
	try {
		const checkRes = await adminClient.query('SELECT 1 FROM pg_database WHERE datname = $1', [DB_NAME]);
		if (checkRes.rowCount === 0) {
			await adminClient.query(`CREATE DATABASE "${DB_NAME}"`);
			if (NODE_ENV !== 'test') {
				console.log(`✅ Database created: ${DB_NAME}`);
			}
		}
	} finally {
		await adminClient.end();
	}
}

async function testConnection() {
	try {
		await sequelize.authenticate();
		if (NODE_ENV !== 'test') {
			console.log('✅ Database connection established.');
		}
	} catch (err) {
		// Attempt to auto-create DB if it does not exist, then retry once
		const msg = String(err && (err.message || err));
		if (msg.toLowerCase().includes('does not exist')) {
			try {
				await ensureDatabaseExists();
				await sequelize.authenticate();
				if (NODE_ENV !== 'test') {
					console.log('✅ Database connection established after creating database.');
				}
				return;
			} catch (inner) {
				console.error('❌ Unable to connect after creating database:', inner.message);
				throw inner;
			}
		}
		console.error('❌ Unable to connect to the database:', err.message);
		throw err;
	}
}

module.exports = {
	sequelize,
	Sequelize,
	testConnection,
};


