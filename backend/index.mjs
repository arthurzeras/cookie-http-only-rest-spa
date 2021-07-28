import express from 'express';
import database from './database.mjs';
import { cors, validateSession } from './middleware.mjs';

const PORT = 1234;
const app = express();

app.use(express.json());
app.use(cors);

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === database.user.email && password === database.user.password) {
    const fakeJWT = 'jwt_example';

    res.cookie('JWT', fakeJWT, {
      maxAge: 86400,
      domain: 'localhost',
      httpOnly: true,
    });

    res.send({ message: 'Login successfully', result: database.user });

    return;
  }

  res.status(401).send({ error: 'Email or password invalid' });
});

app.get('/me', validateSession, (req, res) => {
  res.send(database.user);
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
