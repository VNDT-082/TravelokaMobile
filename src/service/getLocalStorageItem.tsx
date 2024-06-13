import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getLocalStorageItem(key: string) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log(`Retrieved data with key: ${key}, value: ${value}`);
            return value;
        } else {
            console.log(`No data found for key: ${key}`);
            return null;
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
};