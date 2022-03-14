import React from 'react';

import './bayes_node.css';

class NodeProps {
    positionX: number
    positionY: number
}

const BayesNode = (props: NodeProps) => {
    return <div className='BayesNode' style={{
        top: props.positionY,
        left: props.positionX
    }}>
        Bayes node
    </div>
}

export default BayesNode;