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
                Object.entries(network.connections).map(([key, conn]) => {
                    return (
                        <line
                            key={key}
                            x1={network.nodes[conn.from].positionX}
                            y1={getBottomY(conn.from)}
                            x2={network.nodes[conn.to].positionX}
                            y2={getTopY(conn.to)}
                            stroke="white"
                            strokeWidth="0.2em"
                            markerEnd='url(#arrow)'
                        />
                    );
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
            Object.entries(network.connections).map(([key, conn]) => {
                const buttonX = (network.nodes[conn.from].positionX + network.nodes[conn.to].positionX) / 2;
                const buttonY = (getBottomY(conn.from) + getTopY(conn.to)) / 2;
                return (
                    <button
                        key={key}
                        className='RemoveButton'
                        style={{
                            top: buttonY,
                            left: buttonX
                        }}
                        onClick={() => {
                            const {[key]: deletedKey, ...connections} = network.connections
                            setNetwork({
                                ...network,
                                connections
                            })
                        }}
                    >Remove</button>
                );
            })
        }
    </div>;
}

export default BayesConnectionRenderer;
