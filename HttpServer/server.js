const express = require('express')
const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.post('/form', (req, res) => {
    const formData = req.body;
    req.json({ receivedData: formData });
})

app.post('/json', (req, res) => {
    const jsonData = req.body;
    req.json({receivedData: jsonData});
})

app.listen(port, () => {
    console.log('Server is running on http://localhost:${PORT}');
})