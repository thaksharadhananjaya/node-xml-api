const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());


const JWT_SECRET = '7elzOsSYZ/tEETx2L2mZIS8gczxMec5gzUmCW4CkwsI=';
const students=[];

app.post('/get-token', (req, res) => {
    console.log(req.headers);
    //
    const token = jwt.sign({ user: 'example_user' }, JWT_SECRET, { expiresIn: '1h' });
    //
    const xmlResponse = `<AuthInfo><token>${token}</token><AuthStatus><Id>200</Id><Description>LOGIN_OK</Description></AuthStatus></AuthInfo>`;
    //
    res.set('Content-Type', 'text/xml');
    res.send( xmlResponse );
});


app.get('/validate-token', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        res.json({ message: 'Token is valid', user: decoded });
    });
});


app.get('/students', (req, res) => {
    res.json({ data: students});
});

app.post('/students', (req, res) => {
    const student = req.body.student;
    console.log("data: ", student);
    students.push(student);
    res.json({ data: student});
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
