import axios from 'axios';
export default async function Search(location) {
    try {
        const res = await axios.post('http://localhost:4000/api/satellite/search', {
            location: location
        });
        if(res.data.success === false){
            throw new Error('Error occured in fetching results. Try again')
        };
        return res.data.data
    } catch (error) {
        console.error(`Error with client fetching results ${error}`);
        return null;
    }
}