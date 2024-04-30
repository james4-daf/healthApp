import axios from 'axios';

const firebaseRootUrl =
    'https://gymtracker-85671-default-rtdb.europe-west1.firebasedatabase.app/';

export function storeWeight(weightData) {
    return axios.post(`${firebaseRootUrl}dailyWeights.json`, weightData);
}

export async function getAllDailyWeight() {
    const response = await axios.get(firebaseRootUrl + 'dailyWeights.json')

    const weights = [];
    console.log(response.data)
    for (const key in response.data) {
        const expenseObj = {
            id: key,
            date: response.data[key].todaysDate,
            weight: response.data[key].weight
        }
        weights.push(expenseObj)
    }
    return weights
}


export async function hasTodaysWeight() {
    const weights = await getAllDailyWeight();
    const today = new Date();

    // Get the day, month, and year
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(today.getFullYear()).slice(2);
    const formattedDate = `${day}/${month}/${year}`;
    const hasWeightForToday = weights.some(weight => weight.date === formattedDate);

    return hasWeightForToday;
}

export function deleteWeightEntry(id) {
    return axios.delete(`${firebaseRootUrl}dailyWeights/${id}.json`);
}