import React, { ReactElement } from 'react';
import Cube, {cubeProps, CUBE_SIZE} from './Cube';

interface mapProps {
  pagePosition: { x: number; y: number };
}

const offset = 2*CUBE_SIZE;

function roundToSize(x: number, cubesize:number) {
  return Math.round(x/cubesize)*cubesize;
}

function Map({pagePosition}: mapProps) {
  const [cubeMap, setCubeMap] = React.useState<Record<string, ReactElement>>({});


  React.useEffect(() => {

    for(let j=-offset; j<window.innerWidth+offset; j+=CUBE_SIZE) {
      for(let i=-offset; i<window.innerHeight+offset; i+=CUBE_SIZE) {
        const 
          x = roundToSize(pagePosition.x, CUBE_SIZE) + j,
          y = roundToSize(pagePosition.y, CUBE_SIZE) + i;
        const key = `${x}_${y}`;

        // add cube to list if it doesnt exist
        if(cubeMap[key] === undefined) {
          const cube = <Cube x={x} y={y}/>;
          setCubeMap(prevMap => {
            prevMap[key] = cube;
            return prevMap;
          });
        }
      }
    }

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
  
  const renderedCubes = Object.values(cubeMap);
  return (
    <div>
      {renderedCubes}
    </div>
  )
}

export default Map;