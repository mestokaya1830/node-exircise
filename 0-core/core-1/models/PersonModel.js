let Person = require('../data/Person')
const fs = require('fs')

function AllPersonData() {
  return new Promise((resolve, reject) => {
    resolve(Person)
  })
}
function FindPersonData(id) {
  return new Promise((resolve, reject) => {
    const result = Person.find(item => item.id == id)
    resolve(result)
  })
}

function AddPersonData(person) {
  return new Promise((resolve, reject) => {
    const newPerson = {id:7, ...person }
    Person.push(newPerson)
    fs.writeFileSync('./data/Person.json', JSON.stringify(Person), 'utf8', (err => {
      if(!err){
        console.log('Saved')
      } else {
        console.log(err)
      }
    }))
    resolve(newPerson)
  })
}
function UpdatePersonData(id, person) {
  return new Promise((resolve, reject) => {
    const findIdndex = Person.findIndex(item => item.id == id)
    Person[findIdndex] = {id, ...person}
    fs.writeFileSync('./data/Person.json', JSON.stringify(Person), 'utf8', (err => {
      if(!err){
        console.log('Updated')
      } else {
        console.log(err)
      }
    }))
    resolve(Person[findIdndex])
  })
}
function RemovePersonData(id) {
  return new Promise((resolve, reject) => {
    const result = Person.filter(item => item.id != id)
    fs.writeFileSync('./data/Person.json', JSON.stringify(result), 'utf8', (err => {
      if(!err){
        console.log('Removed')
      } else {
        console.log(err)
      }
    }))
    resolve()
  })
}

module.exports = {
  AllPersonData,
  FindPersonData,
  AddPersonData,
  UpdatePersonData,
  RemovePersonData
}