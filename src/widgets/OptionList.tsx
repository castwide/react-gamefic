import React from 'react';
import CommandLink from './CommandLink';

interface OptionListProps {
    options: string[],
    handleInput: (command: string) => void,
    className? : string
}

export default function OptionList({options, handleInput, className}: OptionListProps) {
    const renderOptions = () => {
        const listItems = options.map((opt: string, index: number) => {
            return (
                <li key={index}>
                    <CommandLink command={opt} handleInput={handleInput}>{opt}</CommandLink>
                </li>
            );
        });

        return (
            <div>
                <nav>
                    <ol>
                        {listItems}
                    </ol>
                </nav>
            </div>
        )
    };

    return (options?.length > 0 ?
        <div className={className}>
            {renderOptions()}
        </div>
        : null
    );
}
