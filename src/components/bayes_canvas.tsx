import React from 'react';
import BayesNode from './bayes_node';

import './bayes_canvas.css';

const BayesCanvas = () => {
    return <div className='BayesCanvas'>
        Bayes canvas
        <BayesNode positionX={400} positionY={800} />
    </div>
}

export default BayesCanvas;