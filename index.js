const express = require('express');
const bodyParser = require('body-parser')
const { readFile, writeFile } = require('fs').promises

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());

app.get('/', async (request, response) => {
    response.redirect('./map');
})

app.get('/map', async (request, response) => {

    const gropjason = await readFile("".concat('./groups/', request.query.group, '.json'), 'utf-8');
    response.render('map', { group: request.query.group, data: gropjason });
});

app.get('/testpost', async (request, response) => {
    response.render('testpost');
})

app.post('/testpost', async (request, response) => {
    const groupjson = await readFile('./groups/'.concat(request.body.group, '.json'));
    var jsonobj = JSON.parse(groupjson);
    jsonobj[request.body.name] = {"loc": request.body.location, "time": Date.now()};
    await writeFile('./groups/'.concat(request.body.group, '.json'), JSON.stringify(jsonobj));
    response.redirect('./map?group='.concat(request.body.group));
})

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`))
