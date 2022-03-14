import React, { ChangeEvent, useState } from 'react';
import { BayesNetworkData } from '../data/bayes_network';
import { TempConnection } from './bayes_connection_renderer';

import './bayes_node.css';

export class NodeProps {
    nodeName: string
    network: BayesNetworkData
    setNetwork: (newNetwork: BayesNetworkData) => void
}

const BayesNodeCore = ({nodeName, network, setNetwork}: NodeProps) => {
    const bNode = network.nodes[nodeName];
    const setName = (ev: ChangeEvent<HTMLInputElement>) => {
        console.log(ev.target.value)
        setNetwork({
            ...network,
            nodes: {
                ...network.nodes,
                [nodeName]: {
                    ...bNode,
                    name: ev.target.value
                }
            }
        })
    }

    return <div>
        <input type="text" value={bNode.name} onChange={setName}/>
    </div>
}

export default BayesNodeCore;