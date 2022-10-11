import React from 'react'
import './styles/location.css'

const Location = ({ location }) => {
  return (
    <article className="location__container">
      <h2 className="location__title">{location?.name} (Location #{location?.id})</h2>
      <ul className="location__card">
        <li className="location__card-item"><span className="location__card-span">Name: </span>{location?.name}</li>
        <li className="location__card-item"><span className="location__card-span">Type: </span>{location?.type}</li>
        <li className="location__card-item"><span className="location__card-span">Dimmension: </span>{location?.dimension}</li>
        <li className="location__card-item"><span className="location__card-span">Population: </span>{location?.residents.length}</li>
      </ul>
    </article>
  )
}

export default Location