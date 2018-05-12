import { AsyncStorage } from 'react-native';

function clear() {
    return AsyncStorage.clear();
}

function get(key: string, defaultValue: any) {
    return AsyncStorage.getItem(key).then(
        value => (value !== null ? JSON.parse(value) : defaultValue)
    );
}

function set(key: string, value: any) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
}

function remove(key: string) {
    return AsyncStorage.removeItem(key);
}

function multiGet(...keys: string[]) {
    return AsyncStorage.multiGet([...keys]).then(stores => {
        let data: { [key: string]: any; };
        stores.forEach((result, i, store) => {
            data[store[i][0]] = JSON.parse(store[i][1]);
        });
        return data;
    });
}

function multiRemove(...keys: string[]) {
    return AsyncStorage.multiRemove([...keys]);
}

export default {
    clear,
    get,
    set,
    remove,
    multiGet,
    multiRemove,
};