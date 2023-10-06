
import Button from 'react-bootstrap/Button';

import { useEffect, useState } from 'react';

const UseEfff = () => {

  const [name1, setName1] = useState(window.innerWidth)
  useEffect(()=>{

window.addEventListener("resize",()=>{setName1(window.innerWidth)})


  },[])
 

  return (
    <>
      <h2 className='container'>
        <Button onClick={()=>{setName1(name1+1)}} variant="primary">Primary</Button><br />
{name1}

      </h2>
    </>
  );
}

export default UseEfff;
