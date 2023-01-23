import React, { useEffect, useState } from 'react';

import { SwApi, TSwCharacter } from "../../api";

import { Header, Footer } from "../../view";
import { Toggle, TextInput } from "../../components";
import { filterByHeight, filterByName, getAverageHeight } from "./Main.utils";
import { Characters } from "./Characters/Characters";

const minHeightFilter = 100;
function Main(): JSX.Element {
    const [charactersResponse, setCharactersResponse] = useState<Array<TSwCharacter>>([]);
    const [charactersFiltered, setCharactersFiltered] = useState<Array<TSwCharacter>>([]);
    
    const [searchValue, setSearchValue] = useState('');
    const [showOnlyTall, setShowOnlyTall] = useState(false);
    const [averageHeight, setAverageHeight] = useState('0');

    const tallToggleText = 'Include only tall';
    const averageHeightText = 'Average height';
    const searchPlaceholderText = 'Filter...';


    useEffect(() => {
        if (charactersResponse && charactersResponse.length) {
            const filteredByHeight = filterByHeight(charactersResponse, showOnlyTall ? minHeightFilter : 0);
            const updatedCharacters = filterByName(filteredByHeight, searchValue);

            setCharactersFiltered(updatedCharacters);
            setAverageHeight(getAverageHeight(updatedCharacters, true));
        } else {
            setCharactersFiltered([]);
        }

    }, [charactersResponse, searchValue, showOnlyTall]);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            const result = await SwApi.people.get();
            if (!cancelled) {
                setCharactersResponse(result);
            }
        })();

        return () => {
            cancelled = true;
        }
    }, []);

  return (
    <div className="Main">
        <Header >
            <TextInput
                value={searchValue}
                onChange={setSearchValue}
                placeholder={searchPlaceholderText}
                maxLength={100}
                name='name-filter'
            />
        </Header>
        <main className="Main__content">
            <Characters
                characters={charactersFiltered}
            />
        </main>
        <Footer>
            <Toggle
                isActive={showOnlyTall}
                onChange={setShowOnlyTall}
                label={tallToggleText}
                name='only-tall-filter'
            />
            <span className="Main__average-height">
                {`${averageHeightText}: `}

                <span className="Main__average-height__value"
                    aria-label='average-height-output'
                >
                    {averageHeight}
                </span>
            </span>
        </Footer>
    </div>
  );
}

export default Main;
