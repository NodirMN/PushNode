const {Router} = require('express')
const router = Router()
const Praduct = require('../modules/praduct')
router.get('/', async (req, res) => {
    const praducts = await Praduct.getPraducts()
    res.render('praducts', {
        title: 'Xodimlar bo`limi',
        isPersons: true,
        praducts
    })
})
router.get('/add', (req, res) => {
    res.render('newpraduct', {
        title: 'Yangi hodim qo`shish'
    })
})
router.get('/:id', async (req, res) => {
    const praduct = await Praduct.getPraductById(req.params.id)
    res.render('praduct', {
        layout: 'nohead',
        praduct
    })
})
router.post('/', async (req, res) => {
    console.log(req.body);
    const praduct = new Praduct(req.body.name, req.body.day, req.body.fname, req.body.email, req.body.vadress, req.body.depart, req.body.doc)

    await praduct.save()

    res.redirect('/praducts')
})
module.exports = router