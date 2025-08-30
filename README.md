# JWT-TokenAuthentication
This application uses JWT tokens to authenticate users and protect the /dashboard route. When a user logs in, a token is generated and sent back to the client. The client must include this token in the Authorization header when accessing the /dashboard route. If the token is valid, the route grants access; otherwise, it denies access.

This is an Express.js application that demonstrates authentication using JSON Web Tokens (JWT). It allows users to register, login, and access a protected dashboard.

Registration Route

app.post('/Register', async (req, res) => {
  const { username, password } = req.body;
  const hashedpassword = await bcrypt.hash(password, 10)
  users.push({ username, password: hashedpassword })
  res.send('user registered')
})

1. When a user sends a POST request to /Register, the route extracts the username and password from the request body.
2. The password is hashed using bcrypt.hash() to store a secure version of the password.
3. The user is added to the users array with the hashed password.


Login Route

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username)
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send('Not authorised');
  }
  const token = jwt.sign({ username: username }, 'secret-key')
  res.json({ token })
});
1. When a user sends a POST request to /login, the route extracts the username and password from the request body.
2. The route finds the user in the users array and checks if the password matches using bcrypt.compare().
3. If the credentials are valid, a JWT token is generated using jwt.sign() with the username as the payload and a secret key ('test#secret').
4. The token is sent back to the client in the response.


Dashboard Route

app.get('/dashboard', (req, res) => {
  try {
    const token = req.header('authorization')
    const decodedtoken = jwt.verify(token, 'secret-key')
    if (decodedtoken.username) {
      res.send(`Welcome ${decodedtoken.username} to the dashboard`)
    } else {
      res.send('Access denied!')
    }
  } catch (err) {
    res.send('access denied!')
  }
});
1. When a user sends a GET request to /dashboard, the route expects an Authorization header with the JWT token.
2. The token is verified using jwt.verify() with the same secret key ('test#secret').
3. If the token is valid, the route extracts the username from the decoded token and sends a welcome message.
4. If the token is invalid or missing, the route sends an "Access denied!" message.
