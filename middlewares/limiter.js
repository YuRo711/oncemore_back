const { rateLimit } = require('express-rate-limit');

module.exports = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 200,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
})