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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="w-full min-h-screen bg-linear-to-b from-blue-500 from-slate-800 flex flex-col gap-2 justify-center items-start p-4 md:p-8">
        <form
          action=""
          method="post"
          className="md:w-1/3 w-full h-fit md:m-0 m-3 p-4 flex flex-col gap-3 rounded-2xl bg-slate-900/40 shadow-xl border border-white/10 backdrop-blur-sm"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
            className="w-full h-fit px-4 py-3 rounded-xl border border-slate-300 bg-white/90 text-base text-slate-800 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
          />
          <select
            name="county"
            id="county"
            value={county}
            onChange={(e) => {setCounty(e.target.value)}}
            className="w-full h-fit px-4 py-3 rounded-xl border border-slate-300 bg-white/90 text-base text-slate-800 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
          >
            <option value="">Select County</option>
            {
              counties.map((county) => (
                <option key={county} value={county}>{county}</option>
              ))
            }
          </select>
          <button
            type="submit"
            className="px-4 py-3 rounded-xl bg-blue-800 text-white font-medium shadow-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {loading ? 'Searching...' : 'Search Satellite'}
          </button>
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
