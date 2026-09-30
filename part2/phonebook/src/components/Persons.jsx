import Person from "./Person"

const Persons = ({persons, search}) => {

    const personsSearched = persons.filter(person => 
    person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
        <ul>
        {personsSearched.map(person =>  
        <Person key={person.id} 
          name={person.name} 
          number={person.number}
        /> )}
      </ul>
    </div>
  )
}

export default Persons