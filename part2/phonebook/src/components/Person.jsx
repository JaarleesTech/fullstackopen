const Person = ({name, number, deletePerson, id}) => {
  return (
    <li>
        {name} {number}
        <button onClick={() => deletePerson(id, name)} >
          delete
        </button>
    </li>
    
    
  )
}

export default Person