import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import Location from './components/Location'
import CardResident from './components/CardResident'
import getRandomNumber from './utils/getRandomNumber'
import FilterList from './components/FilterList'
import Error from './components/Error'

function App() {

  // store last search input for suggestions at Error.jsx rendering
  const lastSearch = useRef('')
  // set the flag to True when search is successful, then the input field is emptied
  const clearInput = useRef(false)
  // store a location
  const [location, setLocation] = useState()
  // store content of input field for later request at submit
  const [searchInput, setSearchInput] = useState('')
  // store suggestions of location names from API
  const [suggestionsList, setSuggestionsList] = useState()
  // flag to show whether or not there is an error 
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (clearInput.current) {
      setSuggestionsList()
      document.getElementById("locationID").value = ''
      clearInput.current = false
    }

    let id
    if (searchInput) {
      id = searchInput
    } else {
      id = getRandomNumber()
    }

    const URL = `https://rickandmortyapi.com/api/location/${id}`

    axios.get(URL)
      .then(res => {
        setLocation(res.data)
        setHasError(false)
      })
      .catch(err => {
        setHasError(true)
      })
  }, [searchInput])

  const handleSubmit = e => {
    lastSearch.current = e.target.locationID.value
    e.preventDefault()
    setSearchInput(e.target.locationID.value)
    setSuggestionsList()
    e.target.locationID.value = ''

  }

  const handleChange = e => {
    setHasError(false)
    if (e.target.value === '') {
      setSuggestionsList()
    } else {
      if (+e.target.value >= 1 && +e.target.value <= 126) {
        const URL = `https://rickandmortyapi.com/api/location/${e.target.value}` // query
        axios.get(URL)
          .then(res => setSuggestionsList([res.data]))
          .catch(err => console.log(err))
      } else {
        const URL = `https://rickandmortyapi.com/api/location?name=${e.target.value}` // query
        axios.get(URL)
          .then(res => setSuggestionsList(res.data.results))
          .catch(err => console.log(err))
      }
    }
  }

  // const fieldStyle = {
  //  width: '440px',
  // };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <header className="App__header">
          <h1><img src="image2.svg" className="App__banner" alt="Ricks & Morty" /></h1>
          <section className="App__dialog">
            <input className="App__enquiry" id='locationID' autoComplete='off' placeholder="Search by # (1 ↔ 126) or write location`s name to get suggestions" type="text" /* style={fieldStyle} */ onChange={handleChange} />

            <button className="App__btn">Search</button>
            <FilterList
              suggestionsList={suggestionsList}
              setSearchInput={setSearchInput}
              clearInput={clearInput}
            />
          </section>

        </header>

      </form>


      {
        hasError ?
          <Error
            lastSearch={lastSearch}
            setSearchInput={setSearchInput}
            clearInput={clearInput}
            setHasError={setHasError}
          />
          :
          <>
            <Location location={location} />
            <div className='cards-container'>
              {
                location?.residents.map(url => (  // return implícito
                  <CardResident
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }
    </div >

  )
}

export default App
