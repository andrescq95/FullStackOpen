const Form = ( {addPerson, newName, handleNameChange, newNumber, handleNumberChange} ) => {
    return (
        <form onSubmit={addPerson}>
            <div>Name:   <input value={newName} onChange={handleNameChange} /></div>
            <div>Number: <input value={newNumber} onChange={handleNumberChange}/></div>
            <div><button type="submit">Add</button></div>
        </form>
    )
}

export default Form