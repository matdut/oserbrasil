let request = require('request');
 
let url = `http://ip-api.com/json`
//let url = 'http://freegeoip.net/json/'
let dados = '';

request(url, function (err, response, body) {
   if(err){
       console.log('error:', err);
   } else {
       let ipInfo = JSON.parse(body);
       dados = `?????????? WHERE AM I ?????????
                -------------------------------
                IP: ${ipInfo.query}
                Country: ${ipInfo.country}
                City: ${ipInfo.city}
                Region: ${ipInfo.regionName}
                Lat: ${ipInfo.lat}
                Lon: ${ipInfo.lon}
                Organization: ${ipInfo.org}
                -------------------------------
                Dev by CP 2019`
       console.log(dados);
   }
});


/*const http = require('http');
var server = http.createServer(function(req, res) {
	res.writeHead(200);
	res.write(dados);
  res.end();
});
*/
//server.listen(3000, () => {
 //       console.log("Server is running on http://localhost:8001");
//});

app.listen(3000, err => {
   console.log(`Server is listening on 3000`);
});