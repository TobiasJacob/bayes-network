import React from 'react';
import { BayesNetworkData, getParents, getRowCount } from '../data/bayes_network';

import './bayes_connection_renderer.css';

export class TempConnection {
    from: string
    toX: number
    toY: number
}

class BayesConnectionRendererProps {
    network: BayesNetworkData
    setNetwork: (newNetwork: BayesNetworkData) => void
    tempConnection: TempConnection | undefined
};

const BayesConnectionRenderer = ({network, setNetwork, tempConnection}: BayesConnectionRendererProps) => {
    const rowCount: Record<string, number> = {};
    Object.keys(network.nodes).forEach((nodeName) => {
        rowCount[nodeName] = getRowCount(network, nodeName);
    });

    const getTopY = (nodeName: string) => {
        return network.nodes[nodeName].positionY - 85 - 12 * rowCount[nodeName];
    }
    const getBottomY = (nodeName: string) => {
        return network.nodes[nodeName].positionY + 85 + 12 * rowCount[nodeName];
    }

    return <div className='AbsPosFullSize'>
        <svg className='AbsPosFullSize'>
            <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
                    markerWidth="6" markerHeight="6"
                    orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="white"/>
                </marker>
            </defs>
            {
                Object.keys(network.nodes).map((to) => {
                    return network.nodes[to].parents.map((from) => {
                        return (
                            <line
                                key={to + from}
                                x1={network.nodes[from].positionX}
                                y1={getBottomY(from)}
                                x2={network.nodes[to].positionX}
                                y2={getTopY(to)}
                                stroke="white"
                                strokeWidth="0.2em"
                                markerEnd='url(#arrow)'
                            />
                        );
                    });
                })
            }
            {
                tempConnection && (
                    <line
                        x1={network.nodes[tempConnection.from].positionX}
                        y1={getBottomY(tempConnection.from)}
                        x2={tempConnection.toX}
                        y2={tempConnection.toY}
                        stroke="white"
                        strokeWidth="6px"
                        markerEnd='url(#arrow)'
                    />
                )
            }
        </svg>
        {
            Object.keys(network.nodes).map((to) => {
                return network.nodes[to].parents.map((from) => {
                    const buttonX = (network.nodes[from].positionX + network.nodes[to].positionX) / 2;
                    const buttonY = (getBottomY(from) + getTopY(to)) / 2;
                    return (
                        <button
                            key={to + from}
                            className='RemoveButton'
                            style={{
                                top: buttonY,
                                left: buttonX
                            }}
                            onClick={() => {
                                setNetwork({
                                    ...network,
                                    nodes: {
                                        ...network.nodes,
                                        [to]: {
                                            ...network.nodes[to],
                                            parents: network.nodes[to].parents.filter((par) => (par !== from))
                                        }
                                    }
                                })
                            }}
                        >Remove</button>
                    );
                });
            })
        }
    </div>;
}

export default BayesConnectionRenderer;
