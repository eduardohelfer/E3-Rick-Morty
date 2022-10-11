import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./styles/error.css"

const Error = ({ lastSearch, setSearchInput, clearInput, setHasError }) => {


  const URL = `https://rickandmortyapi.com/api/location?name=${lastSearch.current}` // query

  const [suggestions, setSuggestions] = useState()

  useEffect(() => {
    axios.get(URL)
      .then(res => setSuggestions(res.data.results))
      .catch(err => console.log(err))
  }, [])

  const handleClick = id => {
    setSearchInput(id)
    clearInput.current = true
    setHasError(false)
  }

  return (
    <div>
      <h2>This is not a valid location number 😑</h2>
      {
        suggestions ?
          <h3>but perhaps you might be looking for one of these:</h3>
          :
          <h3>Please try to search a location once again.</h3>
      }
      <ul>
        {
          suggestions?.map(location => (
            <li onClick={() => handleClick(location.id)} key={location.id}
              className="choice">
              {location.name} (Location #{location.id})
            </li>
          ))
        }
      </ul>



    </div>
  )
}

export default Error