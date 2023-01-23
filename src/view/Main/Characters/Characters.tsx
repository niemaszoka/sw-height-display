import React from "react";
import { CharacterCard } from "./CharacterCard/CharacterCard";
import { TSwCharacter } from "../../../api";

interface ICharactersProps {
    characters: Array<TSwCharacter>,
}
export const Characters: React.FC<ICharactersProps> = ({
    characters,
}) => {

    return (
        <ul className="Characters">
            { characters.map((character) => (
                <CharacterCard
                    key={character.id}
                    name={character.name}
                    height={character.height}
                />
            ))}
        </ul>
    );

}