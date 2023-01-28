const PersonModel = require('../models/PersonModel')

async function GetAllPerson(req, res){
  try {
    const result = await PersonModel.AllPersonData()
    res.writeHead(200, {'Content-Type':'application/json'})
    res.end(JSON.stringify(result))
  } catch (error) {
    console.log('Error')
  }
}
async function FindPerson(req, res, id){
  try {
    const result = await PersonModel.FindPersonData(id)
    if(!result){
      res.writeHead(404, {'Content-Type':'application/json'})
      res.end(JSON.stringify({message:'Person Not Found'}))
    } else {
      res.writeHead(200, {'Content-Type':'application/json'})
      res.end(JSON.stringify(result))
    }
  } catch (error) {
    console.log('Error')
  }
}

async function AddPerson(req, res){
  try {
    let body = ''
    req.on('data' , (chunk) => {
      body+= chunk.toString()
    })
    req.on('end', async() => {
      const {name, age} = JSON.parse(body)
      const newPerson = await PersonModel.AddPersonData({
       name,
       age
     })
       res.writeHead(201, {'Content-Type':'application/json'})
       return res.end(JSON.stringify(newPerson))
    })
  } catch (error) {
    console.log('Error')
  }
}
async function UpdatePerson(req, res, id){
  try {
    let body = ''
    const result = await PersonModel.FindPersonData(id)
    req.on('data' , (chunk) => {
      body+= chunk.toString()
    })
    req.on('end', async() => {
      if(result){
        const {name, age} = JSON.parse(body)
        const updatePerson = await PersonModel.UpdatePersonData(id, {
         name:name || result.name,
         age:age || result.age
       })
         res.writeHead(200, {'Content-Type':'application/json'})
         return res.end(JSON.stringify(updatePerson))
      } else {
        res.writeHead(404, {'Content-Type':'application/json'})
        return res.end(JSON.stringify({message:'Person Not Found'}))
      }
    })
  } catch (error) {
    console.log('Error')
  }
}

async function RemovePerson(req, res, id){
  try {
    const result = await PersonModel.FindPersonData(id)
    if(result){
       PersonModel.RemovePersonData(id)
       res.writeHead(200, {'Content-Type':'application/json'})
       return res.end(JSON.stringify({message:'Removed'}))
    } else {
      res.writeHead(404, {'Content-Type':'application/json'})
      return res.end(JSON.stringify({message:'Person Not Found'}))
    }
  } catch (error) {
    console.log('Error')
  }
}
module.exports = {
  GetAllPerson,
  FindPerson,
  AddPerson,
  UpdatePerson,
  RemovePerson
}