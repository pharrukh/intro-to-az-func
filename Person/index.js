const azure = require('azure-storage')

module.exports = async function (context, req) {
  switch (req.method) {
    case 'GET':
      const personEntity = context.bindings.personEntity

      delete personEntity.PartitionKey
      delete personEntity.RowKey

      return {
        body: personEntity,
      }
    case 'POST':
      context.bindings.tableBinding = []
      const person = req.body

      context.bindings.tableBinding.push({
        PartitionKey: 'Persons',
        RowKey: person.id,
        name: person.name,
        surname: person.surname,
        age: person.age,
      })
      break

    case 'DELETE':
      const id = context.bindings.req.params.id
      await deletePerson(id)
      break
      
    default:
      throw new Error('Method not allowed')
  }
}

function deletePerson(id) {
  const tableSvc = azure.createTableService()
  const task = {
    PartitionKey: { _: 'Persons' },
    RowKey: { _: id },
  }

  return new Promise((resolve, reject) => {
    tableSvc.deleteEntity('Persons', task, function (error, response) {
      if (!error) {
        resolve(response)
      } else {
        reject(error)
      }
    })
  })
}
