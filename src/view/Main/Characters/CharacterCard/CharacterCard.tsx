import React from "react";
interface ICharacterCardProps {
    name: string,
    height: number,
}
export const CharacterCard: React.FC<ICharacterCardProps> = ({
    name,
    height
}) => {

    return (
        <li className="CharacterCard" data-testid={`characterCard_${name}`}>
            <div className="CharacterCard__content">
                <span className="CharacterCard__content__height">
                    {height}
                </span>
            </div>
            <div className="CharacterCard__footer">
                <span className="CharacterCard__footer__name">
                    {name}
                </span>
            </div>
        </li>
    );

}