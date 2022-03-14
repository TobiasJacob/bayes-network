import React, { ChangeEvent, useState } from 'react';
import { BayesNetworkData, BayesNodeData, getValueCombinations } from '../data/bayes_network';
import { TempConnection } from './bayes_connection_renderer';

import './bayes_node_core.css';

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

    const rows = getValueCombinations(network, nodeName);

    return <div className='BayesNodeCore'>
        <input type="text" value={bNode.name} onChange={setName}/>
        <table>
            <thead>
                <tr>
                    {...Object.entries(rows[0]).map(([nodeKey, _]) => {
                        return <td key={nodeKey}>
                            {network.nodes[nodeKey].name}
                        </td>
                    })}
                    {...Object.entries(bNode.table.nodeValues).map(([key, val]) => {
                        return <td key={key}>
                            <input type="text" value={val} onChange={(ev) => changeValue(key, ev)} className="ProbTabInput"/>
                        </td>
                    })}
                    <td key={newValKey}>
                        <input type="text" value="" onChange={(ev) => createNewValue(ev)} className="ProbTabInput"/>
                    </td>
                </tr>
            </thead>
            <tbody>
                {
                    rows.map((row) => {
                        return <tr>
                            {...Object.entries(row).map(([nodeKey, nodeVal]) => {
                                return <td key={nodeKey}>
                                    {network.nodes[nodeKey].table.nodeValues[nodeVal]}
                                </td>
                            })}
                            {...Object.entries(bNode.table.nodeValues).map(([key, val]) => {
                                return <td key={key}>
                                    <input type="text" value={val} onChange={(ev) => changeValue(key, ev)} className="ProbTabInput"/>
                                </td>
                            })}
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
}

export default BayesNodeCore;