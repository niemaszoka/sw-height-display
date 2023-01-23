import { TSwCharacter } from "./SwCharacter.type";

export const SwApiBaseUrl = `https://swapi.dev/api/`;
export const SwApi = {
    people: {
        get: async function(): Promise<Array<TSwCharacter>> {
            try {
                const response = await fetch(`${SwApiBaseUrl}people/`);
                if (response.ok) {
                    const parsedResponse = await response.json();

                    return parsedResponse.results?.map((item: Record<string, any>) => ({
                        id: item.name, // for simplicity, it's assumed name is unique per character
                        name: item.name,
                        height: parseInt(item.height, 10),
                    })) || [];
                } else {
                    return [];
                }
            } catch (error) {
                throw Error(`[SwApi] Error while fetching ${JSON.stringify(error)}`);
            }
        }
    }
}