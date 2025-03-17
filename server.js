  const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

const SECRET_KEY = "THEDTDSSDD";
const expiresIn = "1h";

const getUserDb = () => {
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  return db.users || [];
}

const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
      return res.status(401).json({message: "Access denied: No token provided."});
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if(err) {
        return res.status(403).json({message: "Access denied: invalid token"});
      }
      req.user = decoded;
      next();
    })
}

server.post("/login", (req, res) => {
  const {username, password} = req.body;
  const users = getUserDb();
  console.log("backend",username,password)
  const user = users.find((user) => user.username == username && user.password == password);

  if(!user){
    return res.status(401).json({message: "invalid username or password"});
  }

  const token = createToken({ id: user.id, username: user.username, role: user.role });
  res.json({ accessToken: token, user});

})

server.use('/products', verifyToken);

server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
