import React, { useState } from 'react';
interface IToggleProps {
    isActive: boolean,
    onChange: (value: boolean) => void,
    label?: string,
    name: string,
}
export const Toggle: React.FC<IToggleProps> = ({
    isActive,
    onChange,
    label= '',
    name,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        return onChange(event.target.checked);
    }

    return (
        <label
            htmlFor={name}
            className={[
                'Toggle',
                    isActive ? '--active' : '',
                    isFocused ? '--focused' : '',
                ].join(' ')}
        >
            {label}
            <input
                aria-label={name}
                name={name}
                id={name}
                value={name}
                type='checkbox'
                className='Toggle__input'
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <div className={'Toggle__track'} aria-hidden={true}/>
        </label>
    );

}