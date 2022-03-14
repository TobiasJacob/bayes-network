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

    const addNode = () => {
        var key = "node" + Object.keys(nodes).length;
        setNodes({
            ...nodes,
            [key]: {
                positionX: 200,
                positionY: 200,
            }
        })
    }

    return <div className='BayesCanvas'>
        <button className='AddButton' onClick={addNode}>AddButton</button>
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