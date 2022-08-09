const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    // ini untuk development tutorial fase awal kita bedakan antara production dan develpoment
    // karena di instance aws EC2, tidak dapat berjalan di localhost
    // host: 'localhost',
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
    // pengaturan CORS (Cross-Origin Resource Sharing) pada pembuatan server.
    // bisa dilakuakn di routes

  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
