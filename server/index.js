const express = require('express')
const path    = require('path')
const app     = express()

// port
app.set('port', (process.env.PORT || 4200))

// view engine setup
app.set('views', path.resolve(process.cwd(), 'dist'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

// public
app.use(express.static(path.resolve(process.cwd(), 'dist')))

// open index.html
app.get('/', function(request, response) {
  response.render('index.html')
})

// Redirect All routes to index.html
app.get('/*', function(request, response) {
  response.render('index.html')
})

// run server
app.listen(app.get('port'), function() {
  // console.log(`Servidor activo: [${process.env.NODE_ENV}] http://localhost:${app.get('port')}`)
})
