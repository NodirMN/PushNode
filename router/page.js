const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home page',
        isHome: true
    })
})
router.get('/about', (req, res) => {
    res.render('animals', {
        title: 'Animal page',
        isAbout: true
    })
})

module.exports = router