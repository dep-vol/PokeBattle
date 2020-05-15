import React from 'react';

const styles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    height: '50px',
    color: 'white',
    padding: '0 20px',
    background: '#4b4b57'
};

export const Footer: React.FC = () => {
    return (
        <div style={styles}>
            <p>@Copyright TECTO</p>
            <p>Poke battle 2020</p>
        </div>
    );
};