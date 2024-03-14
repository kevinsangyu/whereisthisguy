const express = require('express');
const bodyParser = require('body-parser');
const { readFile, writeFile } = require('fs')
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());

app.get('/', async (request, response) => {
    response.send();
})

app.get('/map', async (request, response) => {
    // await readFile('./groups/'.concat(request.query.group, '.json'), (err, data) => {
    //     if (err) {
    //         response.send("Group not found");
    //         return;
    //     }
    //     response.send("".concat(data));
    // });
    console.log(path.join(__dirname, "./groups/", request.query.group.concat(".json")));
    response.sendFile(path.join(__dirname, "./groups/", request.query.group.concat(".json")), (err, data) => {
        if (err) {
            response.send("Group not found");
        }
    })
});

app.get('/show', async (request, response) => {
    response.render('show');
})

app.post('/show', async (request, response) => {
    const groupjson = await readFile('./groups/'.concat(request.body.group, '.json'));
    var jsonobj = JSON.parse(groupjson);
    jsonobj[request.body.name] = {"lat": request.body.lat, "lng": request.body.lng, "time": Date.now()};
    await writeFile('./groups/'.concat(request.body.group, '.json'), JSON.stringify(jsonobj));
    response.end;
})

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`))
