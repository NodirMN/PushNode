const fs = require('fs')
const path = require('path')
const {v4: uuidv4} = require('uuid')
class Animal {
    constructor(name, place, kg, tel, adap, klich, dat, depart, doc, ) {
        this.name = name
        this.place = place
        this.kg = kg
        this.tel = tel
        this.adap = adap
        this.klich = klich
        this.dat = dat
        this.depart = depart
        this.doc = doc
        this.id = uuidv4()
    }
    toObj() {
        return {
            name: this.name,
            place: this.place,
            kg: this.kg,
            tel: this.tel,
            adap: this.adap,
            klich: this.klich,
            dat: this.dat,
            depart: this.depart,
            doc: this.doc,
            id: this.id
        }
    }
    async save() {
        const animals = await Animal.getAnimals()
        animals.push(this.toObj())
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'animals.js'),
                JSON.stringify(animals),
                (err) => {
                    if (err)
                        reject(err)
                    else
                        resolve()
                }
            )
        })
    }
    static async getAnimalById(id) {
        const animals = await Animal.getAnimals()
        return animals.find(p => p.id === id)
    }
    static getAnimals() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'animals.js'),
                'utf-8',
                (err, content) => {
                    if (err)
                        reject(err)
                    else
                        resolve(JSON.parse(content))


                }
            )
        })
    }
}



module.exports = Animal