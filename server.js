var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')
var jsonfile = require('jsonfile')
var bodyParser = require('body-parser')
var crypto = require('crypto')
var expressJWT = require('express-jwt')
var jwt = require('jsonwebtoken')
var secrets = require('./secrets.js')


var passwordMatch = function passwordMatch(password) {
	var hash = password ? crypto.createHash('sha256').update(password).digest('hex') : null
	
	return hash === secrets.passwordEncrypted
}

app.use('/static', express.static('dist'));

app.use(bodyParser.json())

app.use(expressJWT({ secret: secrets.signature }).unless({ custom: function(req) {
	var isProtected = /save/.test(req.url) || /authcheck/.test(req.url)
	var authNotRequired = !isProtected
	return authNotRequired // return false to run middleware
}}))

app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).end()
	}
})

app.head('/api/authcheck', function (req, res) {
	res.status(200).end()
})

app.get('/api/data', function (req, res) {
	res.sendFile( __dirname + "/" + "data.json" )
})

app.get('/api/download', function(req, res){

	var file = './data.json'

	var filename = path.basename(file)
	var mimetype = 'application/json'

	res.setHeader('Content-disposition', 'attachment; filename=' + filename)
	res.setHeader('Content-type', mimetype)

	var filestream = fs.createReadStream(file)
	filestream.pipe(res)
})

app.get('/*', function (req, res) {
	res.sendFile( __dirname + "/" + "index.html" )
})

app.post('/api/save', function (req, res) {	
	var file = './data.json'
	var obj = req.body
	
	jsonfile.writeFile(file, obj, function (err) {
		res.send({ success: true })
	})
})

app.post('/api/login', function(req, res){

	var token = null;

	if(passwordMatch(req.body.password)) {
		token = jwt.sign({ authenticated: true }, secrets.signature)
		res.status(200).json({ success: true, token })		
	}

	res.status(401).json({ success: false })
})

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3001
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});