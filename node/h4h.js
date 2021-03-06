const http = require('http'); // For the server

const fs = require('fs');     // Read the JSON

http.createServer((req, res) => {
	res.writeHead(200, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
		'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
		'Access-Control-Allow-Credentials': true,
	})
	if(req.url.includes('?io=home')) { res.write(exportJSON()); console.log('reading...') }
	if(req.url.includes('?io=send')) { res.write("no data"); update(req.url) }
	res.end()
}).listen(8080)



const exportJSON = () => {
	var file  = fs.readFileSync('h4h-data.json')
	var parse = JSON.parse(file)
	var cut = '[' + JSON.stringify(parse[0]) + ',' + JSON.stringify(parse[1]) + ',' + JSON.stringify(parse[2]) + ',' + JSON.stringify(parse[3])
	 				+ ',' + JSON.stringify(parse[4]) + ',' + JSON.stringify(parse[5]) + ',' + JSON.stringify(parse[6]) + ',' + JSON.stringify(parse[7])
					+ ',' + JSON.stringify(parse[8]) + ',' + JSON.stringify(parse[9]) + ']'
	return cut
}

const update = (pg) => {
	var raw = pg.split('?io=send&data=')[1]
	var parsed = decodeURI(raw);
	var code = JSON.parse(exportJSON())
	code.unshift(JSON.parse(parsed))
	code.pop()
	console.log(code)
	fs.writeFile("h4h-data.json", JSON.stringify( code), e=>console.log(e))
}
