import express from 'express';
import bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;
app.use(express.json());

const users=[]

app.get('/',(req,res)=>{
  res.send('Hello Express')
})

app.post('/Register',async(req,res)=>{
  const {username,password}=req.body;
  //hash password in array ,password is hashed using bcrypt.hash() to store a secure version of the password
  const hashedpassword= await bcrypt.hash(password,10)
  users.push({
    username,
    password: hashedpassword //storing it in array
  })
  res.send('user registered')
})


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username)
    //JWT token is generated using jwt.sign() with the username as the payload and a secret key 
    if (!user || !(await bcrypt.compare(password,user.password))) {
      return res.send('Not authorised');
    }
     const token=jwt.sign({username:username},'test#secret')
     res.json({token}) // token is sent back to the client in the response.

  });


app.get('/dashboard', (req, res) => {
  try{
  const token=req.header('authorization') //keyname :authorization
  const decodedtoken=jwt.verify(token,'test#secret')
  if(decodedtoken.username){
     res.send(`Welcome ${decodedtoken.username} to the dashboard`)
  }
  else{
    res.send('Access denied!')
  }}
  catch(err){
      res.send('access denied!')
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });