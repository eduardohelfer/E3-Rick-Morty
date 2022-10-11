import React from 'react'
import "./styles/filterList.css"

const FilterList = ({ suggestionsList, setSearchInput, clearInput }) => {

  const handleClick = id => {
    setSearchInput(id)
    clearInput.current = true
  }

  return (

    <div className="popupList" style={suggestionsList ? { visibility: "visible" } : { visibility: "hidden" }}>
      <ul>
        {
          suggestionsList?.map(location => (
            <li onClick={() => handleClick(location.id)} key={location.id} className="popupList__item">
              {location.name} (Location #{location.id})
            </li>
          ))
        }
      </ul>
    </div >

  )
}

export default FilterList