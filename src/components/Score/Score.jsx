import React from 'react';

export default function Score({ score }) {
    return (
        <div className="Score">
            <span>Score: </span>
            <span>{score}</span>
        </div>
    );
}