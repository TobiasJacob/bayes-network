import React, { ChangeEvent, useState } from 'react';
import { BayesNetworkData, BayesNodeData } from '../data/bayes_network';
import { TempConnection } from './bayes_connection_renderer';

import './bayes_node.css';

export class NodeProps {
    nodeName: string
    network: BayesNetworkData
    setNetwork: (newNetwork: BayesNetworkData) => void
}

const BayesNodeCore = ({nodeName, network, setNetwork}: NodeProps) => {
    const bNode = network.nodes[nodeName];
    const setNode = (newNode: BayesNodeData) => {
        setNetwork({
            ...network,
            nodes: {
                ...network.nodes,
                [nodeName]: newNode
            }
        })
    }

    const setName = (ev: ChangeEvent<HTMLInputElement>) => {
        setNode({
            ...bNode,
            name: ev.target.value
        })
    }
    const changeValue = (valKey: string, ev: ChangeEvent<HTMLInputElement>) => {
        ev.preventDefault()
        setNode({
            ...bNode,
            table: {
                ...bNode.table,
                nodeValues: {
                    ...bNode.table.nodeValues,
                    [valKey]: ev.target.value
                }
            }
        })
    }
    const newValKey = "val" + Object.keys(bNode.table.nodeValues).length;
    const createNewValue = (ev: ChangeEvent<HTMLInputElement>) => {
        ev.preventDefault()
        setNode({
            ...bNode,
            table: {
                ...bNode.table,
                nodeValues: {
                    ...bNode.table.nodeValues,
                    [newValKey]: ev.target.value
                }
            }
        })
    }

    return <div>
        <input type="text" value={bNode.name} onChange={setName}/>
        <table>
            <thead>
                <tr>
                    {...Object.entries(bNode.table.nodeValues).map(([key, val]) => {
                        return <td key={key}>
                            <input type="text" value={val} onChange={(ev) => changeValue(key, ev)}/>
                        </td>
                    })}
                    <td key={newValKey}>
                        <input type="text" value="" onChange={(ev) => createNewValue(ev)}/>
                    </td>
                </tr>
            </thead>
        </table>
    </div>
}

export default BayesNodeCore;