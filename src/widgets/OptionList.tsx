import React from 'react';
import CommandLink from './CommandLink';

export default function OptionList({options, handleInput, className = ''}: any) {
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
