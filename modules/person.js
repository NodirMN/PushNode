const fs = require('fs')
const path = require('path')
const {v4: uuidv4} = require('uuid')
class Person {
    constructor(name, fm, email,tel, day, vadress, depart, opt, doc,) {
        this.name = name
        this.fm = fm
        this.email = email
        this.tel = tel
        this.day = day
        this.vadress = vadress
        this.depart = depart
        this.opt = opt
        this.doc = doc
        this.id = uuidv4()
    }
    toObj() {
        return {
            name: this.name,
            fm: this.fm,
            email: this.email,
            tel: this.tel,
            day: this.day,
            vadress: this.vadress,
            depart: this.depart,
            opt: this.opt,
            doc: this.doc,
            id: this.id
        }
    }
    async save() {
        const persons = await Person.getPersons()
        persons.push(this.toObj())
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'persons.js'),
                JSON.stringify(persons),
                (err) => {
                    if (err)
                        reject(err)
                    else
                        resolve()
                }
            )
        })
    }
    static async getPersonById(id) {
        const persons = await Person.getPersons()
        return persons.find(p => p.id === id)
    }
    static getPersons() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'persons.js'),
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



module.exports = Person