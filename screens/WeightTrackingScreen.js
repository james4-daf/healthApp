import { StyleSheet, Text, View, Button, TextInput, Keyboard, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { getAllDailyWeight, storeWeight, deleteWeightEntry, hasTodaysWeight } from '../firebaseCalls/weightTracking'

function WeightTrackingScreen({ navigation }) {
    const [weightEntry, setWeightEntry] = useState('');
    const [dailyWeightList, setDailyWeightList] = useState([]);
    const [fetchedWeights, setFetchedWeights] = useState([])
    const [crossApears, setCrossApears] = useState(false);
    const [addWeightisOpen, setAddWeightisOpen] = useState(false);
    const [todaysWeight, setTodaysWeight] = useState(false);

    function handlePressOutside() {
        setAddWeightisOpen(false);
        Keyboard.dismiss(); // Dismiss keyboard when pressing outside
    }

    function weightInputHandler(enteredWeight) {
        setWeightEntry(enteredWeight);

    }
    function weightSubmitHandler() {
        const today = new Date();

        // Get the day, month, and year
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = String(today.getFullYear()).slice(2);
        const formattedDate = `${day}/${month}/${year}`;
        const newWeightEntry = { weight: weightEntry, todaysDate: formattedDate };
        setDailyWeightList((dailyWeightList) => [
            ...dailyWeightList,
            newWeightEntry,
        ]);
        console.log(dailyWeightList);
        setAddWeightisOpen(false)
        storeWeight(newWeightEntry)
            .then((response) => {
                console.log('Weight stored successfully:', response.data);
                fetchWeights()
                hasTodaysWeight().then(result => setTodaysWeight(result));
            })
            .catch((error) => {
                console.error('Error storing weight:', error);
            });
        setWeightEntry('');
        Keyboard.dismiss();

    }


    function deleteWeightEntryHandler(id) {
        deleteWeightEntry(id).then((response) => {
            console.log('Food entry deleted successfully:', response.data);
            setDailyWeightList((prevList) => prevList.filter((entry) => entry.id !== id));
            setFetchedWeights((prevWeights) => prevWeights.filter((weight) => weight.id !== id));
            fetchWeights()
            hasTodaysWeight().then(result => setTodaysWeight(result));
        })
            .catch((error) => {
                console.error('Error deleting food entry:', error);
            });
        setCrossApears(false)
    }

    function fetchWeights() {
        async function getWeights() {
            const weights = await getAllDailyWeight()
            setFetchedWeights(weights)
            hasTodaysWeight().then(result => setTodaysWeight(result));
        }

        getWeights()
        console.log(fetchedWeights)
    }

    useEffect(() => {
        fetchWeights()
    }
        , []);
    return (
        <Pressable style={{ flex: 1 }} onPress={handlePressOutside}>
            <View style={styles.container}>
                <Text>Weight Tracker</Text>
                <Button onPress={() => navigation.navigate('FoodTrackingScreen')} title='Food Tracker' />
                <Button onPress={() => navigation.navigate('LoginScreen')} title='LogoutScreen' />

                <View style={styles.weightInputContainer}>
                    {addWeightisOpen && !todaysWeight &&
                        <View>

                            <TextInput
                                placeholder=" e.g. 195lbs"
                                style={styles.weightInput}
                                inputMode="decimal"
                                onChangeText={weightInputHandler}
                                maxLength={5}
                            />
                            <Button title="Submit Weight" onPress={weightSubmitHandler} />
                        </View>
                    }
                    {!addWeightisOpen && !todaysWeight &&
                        <Button title="Add Weight" onPress={() => setAddWeightisOpen(true)} />
                    }
                    <Button title='Edit Weight' onPress={() => setCrossApears(prev => !prev)} />
                </View>

                <View>
                    {fetchedWeights?.map((item, i) => {
                        return (
                            <View key={i} style={styles.list}>
                                {crossApears && <Button style={styles.foodItemInput} title='X' onPress={() => deleteWeightEntryHandler(item.id)} />}
                                <Text style={styles.date}>{item.date}</Text>
                                <Text>{item.weight}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 60,
    },
    weightInputContainer: {
        flexDirection: 'row',
        paddingTop: 24,
    },
    weightInput: {
        borderWidth: 1,
        padding: 10,
    },
    list: {
        flexDirection: 'row',
        padding: 10,
    },
    date: {
        paddingRight: 10,
    },
});

export default WeightTrackingScreen;