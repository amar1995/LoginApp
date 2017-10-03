const app = require('./server/app');

app.set('port',process.env.PORT || 3000);

const server = app.listen(app.get('port'), function(){
    console.log('Running on port '+server.address().port);
})