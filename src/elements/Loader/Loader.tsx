//CORE
import React from 'react';
//ASSETS
import style from './Loader.module.css';

export const Loader: React.FC = () => {
    return (
        <div className={style.container}>
            <div className={style.lds_ripple} key={'ripple'}>
                <div/>
                <div/>
            </div>
        </div>
    );
};
