import Search from "./api/search.js";
import {counties} from './assets/county.js'
import { useState } from "react";
import SatelliteMap from "./map.jsx";
function App() {
  const [location, setLocation] = useState('');
  const [county, setCounty] = useState('');
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false)
  const [mapData, setMapData] = useState([]);

  const handleSearch = async(e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const searchLocation = `${location}, ${county}, Kenya`;
      const response = await Search(searchLocation);
      setMapData(response); 
      setResult(true)
    } catch (error) {
      console.error(`Error with handlesearch function in the form ${error}`);
      return;
    }
  };

  return (
    <>
      <section className="w-full min-h-screen bg-linear-to-b from-blue-500 from-slate-800 flex justify-center">
        <form action="" method="post" className="md:w-1/3 w-full h-fit md:m-0 m-3 p-2 flex flex-col gap-3" onSubmit={handleSearch}>
          <input type="text" placeholder="Enter Location" className="w-full h-fit px-2 py-3 rounded-xl ring ring-blue-800 text-xl"/>
          <select name="" id="" value={county} onChange={(e) => {setCounty(e.target.value)}}>
            <option value="">Select County</option>
            {
              counties.map((county) => (
                <option key={county} value={county}>{county}</option>
              ))
            }
          </select>
          <button type="submit" className="px-2 py-3 rounded-xl bg-blue-800 text-white">{loading ? 'Searching...' : 'Search Satellite'}</button>
        </form>
        {
          result &&
          <SatelliteMap satelliteData={mapData}/> 
        }
      </section>  
    </>
  )
}

export default App
