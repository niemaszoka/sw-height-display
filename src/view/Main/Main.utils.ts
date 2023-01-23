import { TSwCharacter } from "../../api";

// Return only characters with names containing provided string value
export const filterByName = (charactersToFilter: Array<TSwCharacter>, value: string): Array<TSwCharacter> => {
    if (!value?.length) {
        return charactersToFilter;
    }
    return charactersToFilter.filter(
        (character) => character.name.toLowerCase().includes(value.toLowerCase())
    );
}

// Returns only characters with height above provided minimal height
export const filterByHeight = (charactersToFilter: Array<TSwCharacter>, minHeight: number): Array<TSwCharacter> => {
    if (!minHeight) {
        return charactersToFilter;
    }
    return charactersToFilter.filter((character) => character.height > minHeight
    );
};

// Calculates average height of all characters provided in the array
export const getAverageHeight = (characters: Array<TSwCharacter>, omitExtremeValues: boolean = false): string => {
    let newAverageHeight = '0';
    if (characters.length) {
        const heightsArray = characters.map((character) => character.height);
        if (omitExtremeValues && characters.length > 2) {
            heightsArray.sort((a, b) => a < b ? -1 : 1);
            heightsArray.shift();
            heightsArray.pop();
        }
        const heightSum: number = heightsArray.reduce(
            (currentSum, nextValue) => {
                return currentSum + nextValue;
            }, 0);

        newAverageHeight = (heightSum / heightsArray.length).toFixed(2);
    }

    return newAverageHeight;
}