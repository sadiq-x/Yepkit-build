import express from 'express';
const app = express();
const PORT = process.env.PORT_SRV || 5000;

import fs from 'fs';
const templateHTML = fs.readFileSync('./src/index.html', 'utf-8');
app.use(express.static('./src/'))
app.use(express.json())

app.use((req, res) => {
    let view = templateHTML;
    res.send(view)
})

function server() {
    app.listen(PORT, () => {
        console.log(`Server listen on port ${PORT}`)
    });
}

server();

