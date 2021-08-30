const fs = require('fs')
const path = require('path')
const {v4: uuidv4} = require('uuid')
class Praduct {
    constructor(name, day, fname, email,vadress,debat,doc) {
        this.name = name
        this.day = day
        this.fname = fname
        this.email = email
        this.vadress = vadress
        this.depart = debat
        this.doc = doc
        this.id = uuidv4()
    }
    toObj() {
        return {
            name: this.name,
            day: this.day,
            fname: this.fname,
            email: this.email,
            vadress: this.vadress,
            depart: this.depart,
            doc: this.doc,
            id: this.id
        }
    }
    async save() {
        const praducts = await Praduct.getPraducts()
        praducts.push(this.toObj())
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'praducts.js'),
                JSON.stringify(praducts),
                (err) => {
                    if (err)
                        reject(err)
                    else
                        resolve()
                }
            )
        })
    }
    static async getPraductById(id) {
        const praducts = await Praduct.getPraducts()
        return praducts.find(p => p.id === id)
    }
    static getPraducts() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname,'..','data', 'praducts.js'),
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



module.exports = Praduct