import React, { useState } from 'react';
import { BayesNetworkData } from '../data/bayes_network';

import './bayes_node.css';

export class NodeProps {
    nodeName: string
    network: BayesNetworkData
    setNetwork: (newNetwork: BayesNetworkData) => void
}

const BayesNode = ({nodeName, network, setNetwork}: NodeProps) => {
    const [dragged, setDragged] = useState(false);
    const bNode = network.nodes[nodeName];

    const mouseDown = (ev: React.MouseEvent<HTMLDivElement>) => {
        ev.preventDefault();
        setDragged(true);
    }
    const mouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
        ev.preventDefault();
        if (ev.buttons != 1) {
            setDragged(false);
        } else if (dragged) {
            setNetwork({
                ...network,
                nodes: {
                    ...network.nodes,
                    [nodeName]: {
                        positionX: bNode.positionX + ev.movementX,
                        positionY: bNode.positionY + ev.movementY,
                    }
                }
            })
        }
    }
    const mouseUp = (ev: React.MouseEvent<HTMLDivElement>) => {
        ev.preventDefault();
        setDragged(false);
    }
    const startConnect = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        ev.stopPropagation();
        console.log("start");
    }

    return <div className='BayesNode' style={{
        top: bNode.positionY,
        left: bNode.positionX
    }} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp}>
        Bayes node
        <button className='ConnectButton' onMouseDown={startConnect}>Connect</button>
    </div>
}

export default BayesNode;