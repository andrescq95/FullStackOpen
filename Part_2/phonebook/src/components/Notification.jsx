const Notification = ({ message, alertType }) => {
  if (message === null) {
    return null
  }
  if (alertType){
    return (
    <div className='notification'>
      {message}
    </div>
    )
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}
export default Notification