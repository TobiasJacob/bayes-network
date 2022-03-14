import React from 'react';
import { BayesNetworkData } from '../data/bayes_network';

import './bayes_connection_renderer.css';

class BayesConnectionRendererProps {
    network: BayesNetworkData
};


const BayesConnectionRenderer = ({network}: BayesConnectionRendererProps) => {
    return <svg className='SVGLines'>
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
        <line x1="50" y1="50" x2="350" y2="350" stroke="black" stroke-width="6px" markerEnd='url(#arrow)' />
    </svg>;
}

export default BayesConnectionRenderer;
