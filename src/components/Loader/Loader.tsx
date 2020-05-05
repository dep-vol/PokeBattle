import React from 'react';
import style from './Loader.module.css';

const Loader: React.FC = () => {
    return (
        <div className={style.container}>
            <div className={style.lds_ripple}>
                <div />
                <div />
            </div>
        </div>
    );
};

export default Loader;