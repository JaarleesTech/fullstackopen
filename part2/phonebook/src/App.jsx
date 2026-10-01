import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

    useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data) 
      })
   },[])

  const addPerson = (event) => {
    event.preventDefault()
    const duplicate = persons.some(person => 
      person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    )

    if(duplicate){
      alert(`${newName} is already added to phonebook`)
      return
    }

    const maxId = persons.length > 0
      ? Math.max(...persons.map(person => person.id)) : 0

    const newPerson = {
      name: newName,
      number: newNumber,
      id: maxId + 1
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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
      <Filter search={search} handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} 
        handleName={handleName} 
        newNumber={newNumber}
        handleNumber={handleNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search} />
    </div>
  )
}

export default App