import React, { ChangeEvent, useState } from 'react';
import { BayesNetworkData, BayesNodeData, getConditionCombinations, hashCondition } from '../data/bayes_network';
import { simulateNetwork } from '../data/simulate_network';
import { TempConnection } from './bayes_connection_renderer';

import './bayes_node_core.css';

export class NodeProps {
    nodeName: string
    network: BayesNetworkData
    setNetwork: (newNetwork: BayesNetworkData) => void
}

const BayesNodeCore = ({nodeName, network, setNetwork}: NodeProps) => {
    const bNode = network.nodes[nodeName];
    const setNode = (newNode: BayesNodeData, simulate = false) => {
        let newNetwork = {
            ...network,
            nodes: {
                ...network.nodes,
                [nodeName]: newNode
            }
        };
        if (simulate) {
            newNetwork = simulateNetwork(newNetwork);
        } 
        setNetwork(newNetwork);
        
    }

    const setName = (ev: ChangeEvent<HTMLInputElement>) => {
        setNode({
            ...bNode,
            name: ev.target.value
        })
    }
    const changeValue = (valKey: string, ev: ChangeEvent<HTMLInputElement>) => {
        ev.preventDefault()
        const lastCol = "val" + (Object.keys(bNode.table.nodeValues).length - 1);
        if (ev.target.value == "" && valKey === lastCol) {
            const {[lastCol]: _, ...nodeValues} = bNode.table.nodeValues;
            setNode({
                ...bNode,
                table: {
                    ...bNode.table,
                    nodeValues
                }
            }, true)
        } else {
            setNode({
                ...bNode,
                table: {
                    ...bNode.table,
                    nodeValues: {
                        ...bNode.table.nodeValues,
                        [valKey]: ev.target.value
                    }
                }
            }, true)
        }
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
        }, true)
    }
    const changeRowData = (condKey: string, valKey: string, ev: ChangeEvent<HTMLInputElement>) => {
        ev.preventDefault()
        setNode({
            ...bNode,
            table: {
                ...bNode.table,
                rows: {
                    ...bNode.table.rows,
                    [condKey]: {
                        ...bNode.table.rows[condKey],
                        [valKey]: ev.target.value
                    }
                }
            }
        }, true)
        
    }
    const conditions = getConditionCombinations(network, nodeName);
    // console.log(network.nodes[nodeName].table.rows);

    return <div className='BayesNodeCore'>
        <input type="text" value={bNode.name} onChange={setName}/>
        <table>
            <thead>
                <tr>
                    {...Object.entries(conditions[0]).map(([nodeKey, _]) => {
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
                    conditions.map((cond) => {
                        const condKey = hashCondition(cond);
                        const rowData: Record<string, string> = network.nodes[nodeName].table.rows[condKey] || {};
                        return <tr key={hashCondition(cond)}>
                            {...Object.entries(cond).map(([nodeKey, nodeVal]) => {
                                return <td key={nodeKey}>
                                    {network.nodes[nodeKey].table.nodeValues[nodeVal]}
                                </td>
                            })}
                            {...Object.entries(bNode.table.nodeValues).map(([key, val]) => {
                                return <td key={key}>
                                    <input type="text" value={rowData[key] || ""} onChange={(ev) => changeRowData(condKey, key, ev)} className="ProbTabInput"/>
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