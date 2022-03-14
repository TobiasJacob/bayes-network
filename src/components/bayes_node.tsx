import React from 'react';

import './bayes_node.css';

class NodeProps {
    positionX: number
    positionY: number
}

const BayesNode = (props: NodeProps) => {
    return <div className='BayesNode'>
        Bayes node
    </div>
}

export default BayesNode;