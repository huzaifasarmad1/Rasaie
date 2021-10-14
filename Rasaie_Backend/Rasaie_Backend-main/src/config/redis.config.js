// this creates a new client

const redis = require('redis').createClient({
  port: process.env.RedisPort,
  host: process.env.RedisHost,
  auth_pass: process.env.RedisPassword
});

const redis = require('redis').createClient(6379, 'redis');

module.exports = redis;
