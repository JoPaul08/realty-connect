const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://realty-connect-dev.eba-gxhpdprt.ca-central-1.elasticbeanstalk.com',
      changeOrigin: true,
    })
  );
};
