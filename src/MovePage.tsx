import React, { useState, ReactNode } from 'react';
import Map from './components/Map';

function MovePage() {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartCoords, setDragStartCoords] = useState({ x: 0, y: 0 });
  const [pagePosition, setPagePosition] = useState({ x: 0, y: 0 });

  const [movedDistance, setMovedDistance] = useState({deltaX: 0, deltaY:0});

  const handleMouseDown = (event:any) => {
    setIsDragging(true);
    setDragStartCoords({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event:any) => {
    if (isDragging) {
      const deltaX = event.clientX - dragStartCoords.x;
      const deltaY = event.clientY - dragStartCoords.y;
      setMovedDistance({deltaX, deltaY});
      setPagePosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));
      setDragStartCoords({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
      <div
        className={`[&::-webkit-scrollbar]:hidden absolute ${isDragging && 'cursor-grab'}`}
        style={{
          left: `${pagePosition.x}px`,
          top: `${pagePosition.y}px`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="absolute left-0 top-0">
          {/** Map */}
          <Map pagePosition={{x: pagePosition.x*-1, y: pagePosition.y*-1}}/>
          {/** */}
        </div>
      </div>
  );
}


export default MovePage;
