const { createClient } = require('redis');

const redisClient = createClient({
  username: 'default',
  password: 'ao4hrs4UxDHjbw0WwP4nzwjsYmDlTArx',
  socket: {
    host: 'redis-19301.c8.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 19301,
  },
});

redisClient.on('error', (err) => console.error('Redis Error:', err));

(async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('✅ Redis connected');
  }
})();

module.exports = redisClient;
