import React, { useState } from 'react';
import BayesNode from './bayes_node';
import { exampleNetwork, existsConnection } from '../data/bayes_network';
import BayesConnectionRenderer, { TempConnection } from './bayes_connection_renderer';

import './bayes_canvas.css';


const BayesCanvas = () => {
    const [network, setNetwork] = useState(exampleNetwork());
    const [tempConnection, setTempConnection] = useState<TempConnection | undefined>();

    const addNode = () => {
        console.log("add")
        var key = "node" + Object.keys(network.nodes).length;
        setNetwork({
            ...network,
            nodes: {
                ...network.nodes,
                [key]: {
                    positionX: 200,
                    positionY: 200,
                    name: "Node",
                    table: {
                        nodeValues: {"val0": "A"},
                        rows: {"": {"val0": "1.0"} }
                    }
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
        if (tempConnection) {
            for (const key in network.nodes) {
                if (key === tempConnection.from) continue;
                if (Object.prototype.hasOwnProperty.call(network.nodes, key)) {
                    const bNode = network.nodes[key];
                    if (Math.abs(bNode.positionX - tempConnection.toX) < 80 && Math.abs(bNode.positionY - tempConnection.toY) < 80) {
                        const connKey = "conn" + Object.keys(network.connections).length;
                        if (existsConnection(network, tempConnection.from, key)) continue;
                        setNetwork({
                            ...network,
                            connections: {
                                ...network.connections,
                                [connKey]: {
                                    from: tempConnection.from,
                                    to: key,
                                }
                            }
                        })
                        break;
                    }
                }
            }
            setTempConnection(undefined);
        }
    }

    return <div className='BayesCanvas' onMouseMove={mouseMove} onMouseUp={mouseUp}>
        <BayesConnectionRenderer network={network} setNetwork={setNetwork} tempConnection={tempConnection} />
        {
            Object.keys(network.nodes).map((key) => {
                return <BayesNode key={key} nodeName={key} network={network} setNetwork={setNetwork} setTempConnection={setTempConnection}/>
            })
        }
        <button className='AddButton' onClick={addNode}>AddButton</button>
    </div>
}

export default BayesCanvas;
