import AsyncStorage from '@react-native-async-storage/async-storage';

export function get(key: string) {
    try {
        const value: any = AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch (e) {
        // error reading value
    }
}

export function set(key: string, setValue: any) {
    try {
        const value = JSON.stringify(setValue)
        AsyncStorage.setItem(key, value)
    }
    catch (e) {
        // save error
        console.log(e);
    }
}

export function remove(key: string) {
    try {
        AsyncStorage.removeItem(key)
    } catch (e) {
        // remove error
        console.log(e);
    }
}