export const validateSession = (req, res, next) => {
  const cookies = req.headers.cookie || '';

  const jwtString = cookies
    .split('; ')
    .find((cookieString) => cookieString.includes('JWT='));

  if (jwtString) {
    const [key, jwt] = jwtString.split('=');

    if (jwt === 'jwt_example') {
      next();
      return;
    }
  }

  res.status(403).send({ error: 'Credentials invalid or expired' });
};

export const cors = (req, res, next) => {
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.append('Access-Control-Allow-Origin', ['http://localhost:8081']);
  res.append('Access-Control-Allow-Credentials', 'true');
  next();
};
