import { useState, useEffect } from 'react'
import './App.css';
import Dog from './components/Dog';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;


function App() {

  const [currentDog, setCurrentDog] = useState(null);

  const [viewedDogs, setViewedDogs] = useState([]);

  const [loading, setLoading] = useState(false);

  // const [batch, setBatch] = useState([]);

  const [bannedBreeds, setBannedBreeds] = useState([]);
  const [bannedGroups, setBannedGroups] = useState([]);
  const [bannedCountries, setBannedCountries] = useState([]);
  const [bannedLifespan, setBannedLifespan] = useState([]);

  const isValid = (dog) => {

    if (!dog.breeds || !dog.breeds[0]) {
      return false;
    }

    const breed = dog.breeds[0]
    const name = breed.name || "N/A"
    const group = breed.breed_group || "N/A"
    const country = breed.country_code || "N/A"
    const lifespan = breed.life_span || "N/A"


    if (bannedBreeds.includes(name)){
      return false;
    }
    if (bannedGroups.includes(group)){
      return false;
    }
    if (bannedCountries.includes(country)){
      return false;
    }
    if (bannedLifespan.includes(lifespan)){
      return false;
    } 

    console.log("hello")

    return true

    
  }

  // const newBatch = async () => {
  //   let query = `https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10&api_key=${ACCESS_KEY}`;
  //   const response = await fetch(query);
  //   const result = await response.json();
  //   const validDogs = result.filter(dog => isValid(dog));
    
  //   return validDogs;
  // }

  const newDog = async () => {

    setLoading(true);

    let selectedDog;
    
    do {
      let query = `https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1&api_key=${ACCESS_KEY}`;
      const response = await fetch(query);
      const result = await response.json();
      selectedDog = result[0];
    } while (!isValid(selectedDog));



    // let validBatch = [...batch];

    // while(validBatch.length == 0) {
    //   validBatch = await newBatch();
    // }

    // const randomIndex = Math.floor(Math.random() * validBatch.length);
    // const selectedDog = validBatch[randomIndex];
    setCurrentDog(selectedDog);
    console.log(selectedDog);
    console.log(selectedDog.breeds[0].name);
    console.log(selectedDog.breeds[0].breed_group);
    console.log(selectedDog.breeds[0].country_code);
    console.log(selectedDog.breeds[0].life_span);
    console.log(selectedDog.url);
    setViewedDogs((prevViewedDogs)=>[...prevViewedDogs, selectedDog]);
    // setBatch(validBatch.filter((_, index) => index != randomIndex ));

    setLoading(false);

  }

  const banBreed = (breed) => {
    setBannedBreeds((prevBannedBreeds) => [...prevBannedBreeds, breed]);
  }
  const banGroup = (group) => {
    setBannedGroups((prevBannedGroups) => [...prevBannedGroups, group]);
  }
  const banCountry = (country) => {
    setBannedCountries((prevBannedCountries) => [...prevBannedCountries, country]);
  }
  const banLifespan = (lifespan) => {
    setBannedLifespan((prevBannedLifespan) => [...prevBannedLifespan, lifespan]);
  }

  const unbanBreed = (breed) => {
    setBannedBreeds((prevBannedBreeds) => prevBannedBreeds.filter(item => item !== breed));
  }
  const unbanGroup = (group) => {
    setBannedGroups((prevBannedGroups) => prevBannedGroups.filter(item => item !== group));
  }
  const unbanCountry = (country) => {
    setBannedCountries((prevBannedCountries) => prevBannedCountries.filter(item => item !== country));
  }
  const unbanLifespan = (lifespan) => {
    setBannedLifespan((prevBannedLifespan) => prevBannedLifespan.filter(item => item !== lifespan));
  }


  return (
    <div className="App">
      <div className="Main">

        <div>
          <h1>🐾Woooof!</h1>
          <p>Did you know that there are over 300 breeds of dogs? Well, now you do!</p>
          <p>Click the 'Discover' button to learn a new breed and it's properties. Feel free to click any property to ban more breeds like that from showing up.</p>
        </div>

        <div  >
          { currentDog && <Dog  breed={currentDog.breeds[0].name || "N/A"} group={currentDog.breeds[0].breed_group || "N/A"} country={currentDog.breeds[0].country_code || "N/A"} lifespan={currentDog.breeds[0].life_span || "N/A"} image={currentDog.url} banBreed = {banBreed} banGroup = {banGroup} banCountry = {banCountry} banLifespan = {banLifespan} /> }
          {loading ? <p>Loading...</p> : <button onClick={newDog}>Discover</button>}
        </div>

        
        
        

      </div>
      <div className="Side" >
        <div className="Seen">
          <p><strong>VIEWED BREEDS</strong></p>
          {viewedDogs && viewedDogs.map(dog => <li key={dog.id}>
            <div className="viewedElement" >
              <img className="smallpic" src={dog.url} />
              <p> The {dog.breeds[0].name}</p>
            </div>
          </li>)}
        </div>
        <div className="Banned">
          <div>
            <p><strong>BANNED BREEDS</strong></p>
            {bannedBreeds && bannedBreeds.map((breed, index) => <li key={index}><p onClick={() => unbanBreed(breed)} style={{ cursor: 'pointer'}} >{breed}</p></li>)}
          </div>
          <div>
            <p><strong>BANNED GROUPS</strong></p>
            {bannedGroups && bannedGroups.map((group, index) => <li key={index}><p onClick={() => unbanGroup(group)} style={{ cursor: 'pointer'}} >{group}</p></li>)}
          </div>
          <div>
            <p><strong>BANNED COUNTRIES</strong></p>
            {bannedCountries && bannedCountries.map((country, index) => <li key={index} ><p onClick={() => unbanCountry(country)} style={{ cursor: 'pointer'}} >{country}</p></li>)}
          </div>
          <div>
            <p><strong>BANNED LIFESPAN</strong></p>
            {bannedLifespan && bannedLifespan.map((lifespan, index) => <li key={index} ><p onClick={() => unbanLifespan(lifespan)} style={{ cursor: 'pointer'}} >{lifespan}</p></li>)}
          </div>
        </div>
          
      </div>
    </div>
  )
}

export default App
