const express = require('express')

const exphbs = require('express-handlebars')

const app = express()

const pageRouter = require('./router/page')
const praductRouter = require('./router/praduct')
const personRouter = require('./router/person')
const animalRouter = require('./router/animal')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.urlencoded({
    extended: false
})) //ma'lumot kelishi uchun
app.use(express.static('public'))
app.use(pageRouter)
app.use('/praducts', praductRouter)
app.use('/persons', personRouter)
app.use('/animals', animalRouter)








app.listen(3000, () => {
    console.log('Server is running ⋙⋙⋙⋙⋙');
})