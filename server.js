const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(auth);

// Protect routes: Example -> Users must be logged in to access `/products`
server.use('/products', auth.rewriter({
  products: 600 // Only logged-in users (code 600) can access `/products`
}));

server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
