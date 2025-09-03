const Form = ( {addContact, newName, handleNameChange, newNumber, handleNumberChange} ) => {
    return (
        <form onSubmit={addContact}>
            <div>Name:   <input value={newName} onChange={handleNameChange} /></div>
            <div>Number: <input value={newNumber} onChange={handleNumberChange}/></div>
            <div><button type="submit">Add</button></div>
        </form>
    )
}

export default Form