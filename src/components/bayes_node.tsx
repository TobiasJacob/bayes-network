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
    const [dragged, setDragged] = useState(false);
    const bNode = network.nodes[nodeName];

    const mouseDown = (ev: React.MouseEvent<HTMLDivElement>) => {
        setDragged(true);
    }
    const mouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (ev.buttons != 1) {
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
        setDragged(false);
    }
    const startConnect = (ev: React.MouseEvent<HTMLButtonElement>) => {
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
        <button className='ConnectButton' onMouseDown={startConnect}>Connect</button>
    </div>
}

export default BayesNode;