import React, { useState } from 'react';
import { BayesNetworkData } from '../data/bayes_network';
import { TempConnection } from './bayes_connection_renderer';

import './bayes_node.css';
import BayesNodeCore from './bayes_node_core';

export class NodeProps {
    nodeName: string
    network: BayesNetworkData
    setNetwork: (newNetwork: BayesNetworkData) => void
    setTempConnection: (conn: TempConnection) => void
}

const BayesNode = ({nodeName, network, setNetwork, setTempConnection}: NodeProps) => {
    /**
     * Visualizes a draggable BayesNode. This part is mostly focused on dragging.
     */

    const [dragged, setDragged] = useState(false);
    const bNode = network.nodes[nodeName];

    const mouseDown = (ev: React.MouseEvent<HTMLDivElement>) => {
        /**
         * Mouse Down Event starts dragging if no input is selected.
         */
        if ((ev.target as any)?.tagName === "INPUT") return;
        setDragged(true);
    }
    const mouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
        /**
         * Updates the position of the node.
         */
        if (ev.buttons != 1 && dragged) {
            setDragged(false);
        } else if (dragged) {
            setNetwork({
                ...network,
                nodes: {
                    ...network.nodes,
                    [nodeName]: {
                        ...network.nodes[nodeName],
                        positionX: bNode.positionX + ev.movementX,
                        positionY: bNode.positionY + ev.movementY,
                    }
                }
            })
        }
    }
    const mouseUp = (ev: React.MouseEvent<HTMLDivElement>) => {
        /**
         * Stops dragging.
         */
        setDragged(false);
    }
    const startConnect = (ev: React.MouseEvent<HTMLButtonElement>) => {
        /**
         * Starts a new temporary connection, which is used to connect this node to another one.
         */
        ev.stopPropagation();
        setTempConnection({
            from: nodeName,
            toX: ev.clientX,
            toY: ev.clientY,
        })
    }

    return <div className='BayesNode' style={{
        top: bNode.positionY,
        left: bNode.positionX
    }} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp}>
        <BayesNodeCore nodeName={nodeName} network={network} setNetwork={setNetwork} />
        <button className='ConnectButton' onMouseDown={startConnect}>+</button>
    </div>
}

export default BayesNode;