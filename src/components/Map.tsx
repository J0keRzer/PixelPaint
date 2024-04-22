import React, { ReactElement } from 'react';
import Cube, {cubeProps, CUBE_SIZE} from './Cube';

interface mapProps {
  pagePosition: any
}

const offset = 2*CUBE_SIZE;

function roundToSize(x: number, cubesize:number) {
  return Math.round(x/cubesize)*cubesize;
}

function Map({pagePosition}: mapProps) {
  const [cubeMap,setCubeMap]= React.useState<ReactElement<cubeProps>[]>([]);

  React.useEffect(() => {
    const items: ReactElement<cubeProps>[] = [];

    for(let j=-offset; j<window.innerWidth+offset; j+=CUBE_SIZE)
      for(let i=-offset; i<window.innerHeight+offset; i+=CUBE_SIZE)
        items.push(
          <Cube x={roundToSize(pagePosition.x, CUBE_SIZE) + j} 
                y={roundToSize(pagePosition.y, CUBE_SIZE) + i}/>);

    console.log(pagePosition)
    setCubeMap(items);
  }, [pagePosition.x, pagePosition.y]); // add IF RESIZED 


  /**
   * When the screen is moved add the deltax / deltay difference of cubes to map
   * But before that make sure the start map is right size compared to current window.width ect.
   * If not, add needed cubes, but dont create new map, just add new cubes.
   */

  if(cubeMap === undefined){
    return(
      <div>
        <p>Cannot Load Map</p>
      </div>
    )
  }
  
  return (
    <div>
      {cubeMap}
    </div>
  )
}

export default Map;