import React from 'react';
import CommandLink from './CommandLink';

export default function OptionList({options, handleInput}: any) {
    const renderOptions = () => {
        const listItems = options.map((opt: any, index: any) => {
            return (
                <li key={index}>
                    <CommandLink command={opt} handleInput={handleInput}>{opt}</CommandLink>
                </li>
            );
        });

        return (
            <div>
                <nav>
                    <ul>
                        {listItems}
                    </ul>
                </nav>
            </div>
        )
    };

    return (options?.length > 0 ? renderOptions() : null);
}
