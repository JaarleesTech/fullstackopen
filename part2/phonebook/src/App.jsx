import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

    useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons) 
      })
   },[])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => 
      person.name.trim().toLowerCase() === newName.trim().toLowerCase())

    if(existingPerson){
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to phonebook. Replace the old number with the new one ?`
      )

      if(!confirmUpdate) {
        return
      }

      const updatedPerson = {
        ...existingPerson,
        number: newNumber
        }

      personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => 
            person.id === existingPerson.id
              ? returnedPerson
              : person
          ))

          setNewName('')
          setNewNumber('')
      })

      return
    }

    const maxId = persons.length > 0
      ? Math.max(...persons.map(person => person.id)) : 0
    const newPerson = {
      name: newName,
      number: newNumber,
      id: maxId + 1
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id, name) => {
    if(window.confirm(`delete ${name} ?`)) {
      personService
        .removePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value) 
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search = {search} handleSearch = {handleSearch} />
      <h3>Add a new</h3>
      <PersonForm 
        newName = {newName} 
        handleName = {handleName} 
        newNumber = {newNumber}
        handleNumber = {handleNumber}
        addPerson = {addPerson}
      />
      <h3>Numbers</h3>
      <Persons 
        persons = {persons} 
        search = {search} 
        deletePerson = {deletePerson}
      />
    </div>
  )
}

export default App