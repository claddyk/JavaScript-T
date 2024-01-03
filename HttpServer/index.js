const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, this is the root/main route.. hehe boii')
});

app.get('/api', (req, res)=> {
    res.json({message: 'This is the API route. yo bro'});
});

app.get('/html', (req, res) => {
    const htmlContent = '<h1>This is an HTML response</h1>'
    res.send(htmlContent);
})

const PORT = 3003;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
})
