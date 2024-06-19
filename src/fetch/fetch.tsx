const { createProxyMiddleware } = require('http-proxy-middleware');
import app  from "../App";

module.exports = function(app: { use: (arg0: string, arg1: any) => void; }) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api-dev.sparquer.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove /api prefix when sending the request
      },
    })
  );
};