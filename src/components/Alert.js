import React from 'react'

const Alert = ({alert}) => {
  return (
    <div style={{height:'60px'}}>
    {
      alert && alert.msg && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <strong>{alert.type}:</strong>{alert.msg}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )
    }
    </div>
  )
}

export default Alert
