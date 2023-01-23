import { SwCharactersMock } from "../../api/data-mock";
import { filterByHeight, filterByName, getAverageHeight } from "./Main.utils";
import { TSwCharacter } from "../../api";

describe('Main.utils', () => {

    describe('filterByHeight', () => {

        test('returns only elements above height passed in params', async () => {
            const inputArray = [...SwCharactersMock];
            const result = filterByHeight(inputArray, 100);
            expect(result.length).toBe(2);
        });

        test('returns input array if minHeight === 0', async () => {
            const inputArray = [...SwCharactersMock];
            const result = filterByHeight(inputArray, 0);
            expect(result).toBe(inputArray);
        });
    });

    describe('filterByName',  () => {
        test('returns only elements with names containing the string passed in params', async () => {
            const inputArray = [...SwCharactersMock];
            const result = filterByName(inputArray, 'name2');
            expect(result.length).toBe(1);
        });

        test('returns input array if param string is empty', async () => {
            const inputArray = [...SwCharactersMock];
            const result = filterByName(inputArray, '');
            expect(result).toBe(inputArray);
        });
    });

    describe('getAverageHeight',  () => {
        test('calculates average height of all elements in the array', async () => {
            const inputArray = [...SwCharactersMock];
            const result = getAverageHeight(inputArray);
            expect(result).toBe("126.67");
        });

        test('returns 0 if the provided array is empty', async () => {
            const inputArray: Array<TSwCharacter> = [];
            const result = getAverageHeight(inputArray);
            expect(result).toBe("0");
        });

        test('omits extreme values', async () => {
            const inputArray: Array<TSwCharacter> = [...SwCharactersMock];
            const result = getAverageHeight(inputArray, true);
            expect(result).toBe("120.00");
        });
    });
})
