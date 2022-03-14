import React, { useState } from 'react';
import BayesNode from './bayes_node';
import { exampleNetwork } from '../data/bayes_network';
import BayesConnectionRenderer, { TempConnection } from './bayes_connection_renderer';

import './bayes_canvas.css';


const BayesCanvas = () => {
    const [network, setNetwork] = useState(exampleNetwork());
    const [tempConnection, setTempConnection] = useState<TempConnection | undefined>();

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
    const mouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
        ev.preventDefault();
        if (tempConnection) {
            setTempConnection({
                ...tempConnection,
                toX: tempConnection.toX + ev.movementX,
                toY: tempConnection.toY + ev.movementY,
            })
        }
    }
    const mouseUp = (ev: React.MouseEvent<HTMLDivElement>) => {
        ev.preventDefault();
        setTempConnection(undefined);
    }

    return <div className='BayesCanvas' onMouseMove={mouseMove} onMouseUp={mouseUp}>
        <button className='AddButton' onClick={addNode}>AddButton</button>
        <BayesConnectionRenderer network={network} setNetwork={setNetwork} tempConnection={tempConnection} />
        {
            Object.keys(network.nodes).map((key) => {
                return <BayesNode key={key} nodeName={key} network={network} setNetwork={setNetwork} setTempConnection={setTempConnection}/>
            })
        }
    </div>
}

export default BayesCanvas;
