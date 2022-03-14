import React, { useState } from 'react';
import BayesNode from './bayes_node';
import { exampleNetwork } from '../data/bayes_network';
import BayesConnectionRenderer from './bayes_connection_renderer';

import './bayes_canvas.css';


const BayesCanvas = () => {
    const [network, setNetwork] = useState(exampleNetwork());

    const addNode = () => {
        var key = "node" + (Object.keys(network.nodes).length + 1);
        setNetwork({
            ...network,
            nodes: {
                ...network.nodes,
                [key]: {
                    positionX: 200,
                    positionY: 200,
                }
            }
        })
    }

    return <div className='BayesCanvas'>
        <button className='AddButton' onClick={addNode}>AddButton</button>
        <BayesConnectionRenderer network={network}/>

        {
            Object.entries(network.nodes).map(([key, bNode]) => {
                return <BayesNode key={key} positionX={bNode.positionX} positionY={bNode.positionY} setPosition={
                    (newX, newY) => {
                        setNetwork({
                            ...network,
                            nodes: {
                                ...network.nodes,
                                [key]: {
                                    positionX: newX,
                                    positionY: newY,
                                }
                            }
                        })
                    }
                }/>
            })
        }
    </div>
}

export default BayesCanvas;
