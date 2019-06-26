const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  })
})

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json({
        message: 'Post created.....',
        authData
      })
    }
  })
})

app.post('/api/login', (req, res) => {
  //  Mock user

  const user ={
    id: 1,
    username: 'sbardella',
    email: 'sbardella@sbardella.de'
  }

  jwt.sign({user}, 'secretkey',{ expiresIn: '30s' }, (err, token) => {
    res.json({
    token
        })
    })
})

// Token Format
// Authorization :Bearer <access_token>

// Verify Token

function verifyToken (req, res, next) {
// get auth headet value
  const bearerHeader = req.headers['authorization'];
  // Check is Sbardella is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ')
    // get token fron array
    const bearerToken = bearer[1]
    // Set Token
    req.token = bearerToken
    // Next middleware
    next()

  } else {
    // Forbidden
    res.sendStatus(403)
}
}

app.listen(5000, () => console.log('Server startet on port 5000') );