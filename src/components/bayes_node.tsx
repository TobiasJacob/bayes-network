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
        setDragged(true);
    }
    const mouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (dragged) {
            props.setPosition(
                props.positionX + ev.movementX,
                props.positionY + ev.movementY,
            )
        }
    }
    const mouseUp = (ev: React.MouseEvent<HTMLDivElement>) => {
        setDragged(false);
    }

    return <div className='BayesNode' style={{
        top: props.positionY,
        left: props.positionX
    }} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp}>
        Bayes node
    </div>
}

export default BayesNode;