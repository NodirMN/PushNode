const {Router} = require('express')
const router = Router()
const Person = require('../modules/person')
router.get('/', async (req, res) => {
    const persons = await Person.getPersons()
    res.render('persons', {
        title: 'Xodimlar bo`limi',
        isPersons: true,
        persons
    })
})
router.get('/add', (req, res) => {
    res.render('newperson', {
        title: 'Yangi hodim qo`shish'
    })
})
router.get('/:id', async (req, res) => {
    const person = await Person.getPersonById(req.params.id)
    res.render('person', {
        layout: 'nshead',
        person
    })
})
router.post('/', async (req, res) => {
    console.log(req.body);
    const person = new Person(req.body.name, req.body.fm, req.body.email, req.body.tel, req.body.day, req.body.vadress, req.body.depart, req.body.opt, req.body.img, req.body.doc)

    await person.save()

    res.redirect('/persons')
})
module.exports = router