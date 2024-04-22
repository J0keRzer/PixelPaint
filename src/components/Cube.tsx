import React from 'react';

export const CUBE_SIZE = 50;


export interface cubeProps {
  x: number
  y: number
}

function Cube(props: cubeProps) {
  const [color, setColor] = React.useState<string>("white");

  const [clickPos, setClickPos] = React.useState({x:0, y:0});

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setClickPos({x: event.clientX, y: event.clientY});
  }

  function handleMouseUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    //@ts-ignore
    if(event.clientX === clickPos.x && event.clientY === clickPos.y) {
      setColor("black");
    }
    setClickPos({x: 0, y: 0})
  }

  return (
    <div style={{ 
      position: 'absolute', 
      left: `${props.x}px`, 
      top: `${props.y}px`, 
      width:`${CUBE_SIZE-1}px`, 
      height: `${CUBE_SIZE-1}px`,
      backgroundColor: color }}
      className="no-scrollbar"

      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      >
    </div>
  )
}

export default Cube;