const {Router} = require('express')
const router = Router()
const Animal = require('../modules/animal')
router.get('/', async (req, res) => {
    const animals = await Animal.getAnimals()
    res.render('animals', {
        title: 'Xodimlar bo`limi',
        isAnimals: true,
        animals
    })
})
router.get('/add', (req, res) => {
    res.render('newanimal', {
        title: 'Yangi hodim qo`shish'
    })
})
router.get('/:id', async (req, res) => {
    const animal = await Animal.getAnimalById(req.params.id)
    res.render('animal', {
        layout: 'anhead',
        animal
    })
})
router.post('/', async (req, res) => {
    console.log(req.body);
    const animal = new Animal(req.body.name, req.body.place, req.body.kg, req.body.tel, req.body.adap, req.body.klich, req.body.dat, req.body.depart, req.body.doc, )

    await animal.save()

    res.redirect('/animals')
})
module.exports = router