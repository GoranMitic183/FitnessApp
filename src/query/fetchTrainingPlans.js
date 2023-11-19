// import axios from 'axios';

// export const fetchTrainings = async () => {
//     try {
//         const response = await axios.get("http://localhost:3001/training");
//         return response.data.data;
//     } catch (error) {
//         console.log(error);
//     }
// }

export const fetchTrainings = async () => {
    try {
        const response = await fetch("http://localhost:3001/training");
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
    }
}
