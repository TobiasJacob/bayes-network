import React, { ChangeEvent, FormEvent, useState } from 'react';
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
    const selectValue = (ev: ChangeEvent<HTMLInputElement>) => {
        let selectedValue = ev.target.value;
        if (selectedValue === "") {
            selectedValue === undefined;
        }
        setNode({
            ...bNode,
            selectedValue
        }, true)
    }
    const conditions = getConditionCombinations(network, nodeName);
    // console.log(network.nodes[nodeName].table.rows);

    return <div className='BayesNodeCore'>
        <input type="text" value={bNode.name} onChange={setName} className="mb-3 w-100"/>
        <table>
            <thead>
                <tr>
                    {...Object.entries(conditions[0]).map(([nodeKey, _]) => {
                        return <td key={nodeKey}>
                            <span>{network.nodes[nodeKey].name}</span>
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
                        let probabilitySum = 0;
                        Object.keys(bNode.table.nodeValues).map((key) => {
                            probabilitySum += parseFloat(rowData[key]);
                        })

                        return <tr key={hashCondition(cond)}>
                            {...Object.entries(cond).map(([nodeKey, nodeVal]) => {
                                return <td key={nodeKey}>
                                    <span>{network.nodes[nodeKey].table.nodeValues[nodeVal]}</span>
                                </td>
                            })}
                            {...Object.keys(bNode.table.nodeValues).map((key) => {
                                return <td key={key}>
                                    <input type="text" value={rowData[key] || ""} onChange={(ev) => changeRowData(condKey, key, ev)} className="ProbTabInput"/>
                                </td>
                            })}
                            <td>
                                <span>{probabilitySum.toFixed(2)}</span>
                            </td>
                        </tr>
                    })
                }
                <tr>
                    {...Object.entries(conditions[0]).map(([nodeKey, _]) => {
                        return <td key={nodeKey} />
                    })}
                    {...Object.entries(bNode.table.nodeValues).map(([key, val]) => {
                        return <td key={key} className='center'>
                            <input type="radio" name={nodeName} onChange={selectValue} value={key} checked={bNode.selectedValue === key} className="radio"/>
                        </td>
                    })}
                    <td className='center'>
                        <input type="radio" name={nodeName} onChange={selectValue} value="" checked={!bNode.selectedValue}  className="radio"/>
                    </td>
                </tr>
                <tr>
                    {...Object.entries(conditions[0]).map(([nodeKey, _]) => {
                        return <td key={nodeKey} />
                    })}
                    {...Object.entries(bNode.table.nodeValues).map(([key, val]) => {
                        return <td key={key} className='center'>
                            <span>{bNode.table.nodeProbabilities[key].toFixed(2)}</span>
                        </td>
                    })}
                    <td />
                </tr>
            </tbody>
        </table>
    </div>
}

export default BayesNodeCore;