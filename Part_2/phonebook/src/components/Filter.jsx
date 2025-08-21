const Filter = ( {onChange, value} ) => {
    return(
        <div>
            Filter contacts: <input value={value} onChange={onChange}/>
        </div>
    )
}

export default Filter