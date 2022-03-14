import React, { useState } from 'react';

import './bayes_node.css';

export class NodeProps {
    positionX: number
    positionY: number
    setPosition: (newX: number, newY: number) => void
}

const BayesNode = (props: NodeProps) => {
    const [dragged, setDragged] = useState(false);

    const mouseDown = (ev: React.MouseEvent<HTMLDivElement>) => {
        ev.preventDefault();
        setDragged(true);
    }
    const mouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
        ev.preventDefault();
        if (ev.buttons != 1) {
            setDragged(false);
        } else if (dragged) {
            props.setPosition(
                props.positionX + ev.movementX,
                props.positionY + ev.movementY,
            )
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
        top: props.positionY,
        left: props.positionX
    }} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp}>
        Bayes node
        <button className='ConnectButton' onMouseDown={startConnect}>Connect</button>
    </div>
}

export default BayesNode;