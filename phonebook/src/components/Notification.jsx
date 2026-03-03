const Notification = ({ message,type }) => {
  if (message === null) {
    return null
  }

  const className = type ? type : ''
  //console.log("Notification component: ",type)
  return (
    <div className={classType}>
      {message}
    </div>
  )
}

export default Notification