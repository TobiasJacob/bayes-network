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
        <BayesConnectionRenderer network={network} setNetwork={setNetwork}/>
        {
            Object.keys(network.nodes).map((key) => {
                return <BayesNode key={key} nodeName={key} network={network} setNetwork={setNetwork}/>
            })
        }
    </div>
}

export default BayesCanvas;
