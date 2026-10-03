import Person from "./Person"

const Persons = ({persons, search, deletePerson}) => {

    const personsSearched = persons.filter(person => 
    person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
        <ul>
        {personsSearched.map(person =>  
        <Person key={person.id} 
          id = {person.id}
          name = {person.name} 
          number = {person.number}
          deletePerson = {deletePerson}
        /> )}
      </ul>
    </div>
  )
}

export default Persons