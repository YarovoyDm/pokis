export const useLocalStorage = (key: string) => {
    const setItemInLocalStorage = (value: unknown): void => {
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    const getItemFromLocalStorage = () => {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : undefined;
    };

    const removeItemFromLocalStorage = (): void => {
        window.localStorage.removeItem(key);
    };

    return { setItemInLocalStorage, getItemFromLocalStorage, removeItemFromLocalStorage };
};