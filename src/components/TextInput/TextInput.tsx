import React, { useState } from "react";
interface ITextInputProps {
    onChange: (value: string) => void,
    placeholder?: string,
    className?: string,
    maxLength?: number,
    name: string,
    value?: string,
}
export const TextInput: React.FC<ITextInputProps> = ({
    onChange,
    placeholder = '',
    className= '',
    maxLength ,
    name,
    value,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        return onChange(event.target.value);
    }

    return (
        <input
            className={[
                'TextInput',
                className,
                isFocused && '--focused'
            ].join(' ')}
            type='text'
            value={value}
            name={name}
            aria-label={name}
            placeholder={placeholder}
            onChange={handleChange}
            maxLength={maxLength}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    );

}