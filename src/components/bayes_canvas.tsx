import React, { useState } from 'react';
import BayesNode from './bayes_node';
import { existsConnection } from '../data/bayes_network';
import BayesConnectionRenderer, { TempConnection } from './bayes_connection_renderer';
import { exampleNetwork } from '../data/load_example';

import './bayes_canvas.css';
import { loadNetwork, saveNetwork } from '../data/save_network';

const exampe = exampleNetwork('Ex1');

const BayesCanvas = () => {
    /**
     * Visualizes the whole bayes network with nodes and connections.
     */
    const [network, setNetwork] = useState(exampe); // The bayes network.
    const [tempConnection, setTempConnection] = useState<TempConnection | undefined>(); // A temporary connection to be rendered when the user starts dragging a new connection.

    const addNode = () => {
        /**
         * Adds a new node with a random position.
         */
        console.log("add")
        var key = "node" + Object.keys(network.nodes).length;
        setNetwork({
            ...network,
            nodes: {
                ...network.nodes,
                [key]: {
                    positionX: 300 * Math.random() + 200,
                    positionY: 300 * Math.random() + 200,
                    name: "Node",
                    table: {
                        nodeValues: {"val0": "A"},
                        nodeProbabilities: {"val0": parseFloat('Nan')},
                        rows: {"": {"val0": "1.0"} },
                    },
                    parents: [],
                }
            }
        })
    }
    const mouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
        /**
         * Drags the temporary connection if it was started by a BayesNode.
         */
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
        /**
         * Checks if the temporary connection is connected to another node.
         */
        ev.preventDefault();
        if (tempConnection) {
            for (const toKey in network.nodes) {
                if (toKey === tempConnection.from) continue;
                if (Object.prototype.hasOwnProperty.call(network.nodes, toKey)) {
                    const bNode = network.nodes[toKey];
                    if (Math.abs(bNode.positionX - tempConnection.toX) < 80 && Math.abs(bNode.positionY - tempConnection.toY) < 80) {
                        if (existsConnection(network, tempConnection.from, toKey)) continue;
                        setNetwork({
                            ...network,
                            nodes: {
                                ...network.nodes,
                                [toKey]: {
                                    ...network.nodes[toKey],
                                    parents: [...network.nodes[toKey].parents, ...[tempConnection.from]],
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
        <div className='CanvasButtons'>
            <button onClick={addNode}>Add Node</button> <br />
            <button onClick={() => saveNetwork(network)}>Download</button>
            <label htmlFor="file-input" className="fileInputLabel">
                Open
            </label>
            <input type="file" id="file-input" className='fileInput' onChange={async (ev) => { await loadNetwork(ev, setNetwork) }} value=""/> <br />
            <button onClick={() => {setNetwork(exampleNetwork("New"))}}>New</button>
            <button onClick={() => {setNetwork(exampleNetwork("Ex1"))}}>Example 1</button>
            <button onClick={() => {setNetwork(exampleNetwork("Ex2"))}}>Example 2</button>
            <button onClick={() => {setNetwork(exampleNetwork("Ex3"))}}>Example 3</button>
        </div>
    </div>
}

export default BayesCanvas;
