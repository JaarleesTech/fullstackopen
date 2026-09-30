const PersonForm = ({
    newName,
    handleName,
    newNumber,
    handleNumber,
    addPerson
}) => {

    

  return (
    <div>
        <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleName}
          required
          />
        </div>
        <div>
          number: <input  
          value={newNumber}
          onChange={handleNumber}
          required
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm