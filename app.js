const express = require('express');
const app = express();
const keys = require('./public/assets/json/client_secret.json');
const private_key = keys.private_key;
console.log(private_key);
app.use(express.static('public'));

app.listen(3000, () => {
	console.log('your server is listening on port 3000. Visit: http://localhost:3000 to view your page');
});