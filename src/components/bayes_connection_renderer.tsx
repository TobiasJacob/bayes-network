import React from 'react';
import { BayesNetworkData } from '../data/bayes_network';

import './bayes_connection_renderer.css';

class BayesConnectionRendererProps {
    network: BayesNetworkData
    setNetwork: (newNetwork: BayesNetworkData) => void
};


const BayesConnectionRenderer = ({network, setNetwork}: BayesConnectionRendererProps) => {
    return <div className='AbsPosFullSize'>
        <svg className='AbsPosFullSize'>
            <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
                    markerWidth="6" markerHeight="6"
                    orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>
            {
                Object.entries(network.connections).map(([key, conn]) => {
                    const startX = network.nodes[conn.from].positionX;
                    return (
                        <line
                            x1={network.nodes[conn.from].positionX}
                            y1={network.nodes[conn.from].positionY + 80}
                            x2={network.nodes[conn.to].positionX}
                            y2={network.nodes[conn.to].positionY - 80}
                            stroke="black"
                            stroke-width="6px"
                            markerEnd='url(#arrow)'
                        />
                    );
                })
            }
        </svg>
        {
            Object.entries(network.connections).map(([key, conn]) => {
                const buttonX = (network.nodes[conn.from].positionX + network.nodes[conn.to].positionX) / 2;
                const buttonY = (network.nodes[conn.from].positionY + network.nodes[conn.to].positionY) / 2;
                return (
                    <button
                        className='RemoveButton'
                        style={{
                            top: buttonY,
                            left: buttonX
                        }}
                    >Remove</button>
                );
            })
        }
    </div>;
}

export default BayesConnectionRenderer;
