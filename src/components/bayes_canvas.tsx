import React, { useState } from 'react';
import BayesNode, { NodeProps } from './bayes_node';

import './bayes_canvas.css';

class NodeStruct {
    positionX: number
    positionY: number
}

const BayesCanvas = () => {
    const [nodes, setNodes] = useState<Record<string, NodeStruct>>({
        "firstNode": {
            positionX: 400,
            positionY: 400,
        }
    });

    return <div className='BayesCanvas'>
        Bayes canvas
        {
            Object.entries(nodes).map(([key, bNode]) => {
                return <BayesNode key={key} positionX={bNode.positionX} positionY={bNode.positionY} setPosition={
                    (newX, newY) => {
                        setNodes({
                            ...nodes,
                            [key]: {
                                positionX: newX,
                                positionY: newY,
                            }
                        })
                    }
                }/>
            })
        }
    </div>
}

export default BayesCanvas;