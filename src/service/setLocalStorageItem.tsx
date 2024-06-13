import AsyncStorage from "@react-native-async-storage/async-storage";


export default async function setLocalStorageItem(key: string, value: string) {
    try {
        await AsyncStorage.setItem(key, value);
        console.log(`Saved data with key: ${key}`);
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

