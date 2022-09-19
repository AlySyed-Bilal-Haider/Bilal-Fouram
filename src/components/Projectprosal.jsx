import React from 'react'
import Commompage from './Common/Commonpage';
function Projectproposal({title}) {
    console.log("Project propsal");
  return (
   <Commompage title={title}/>
  )
}

export default React.memo(Projectproposal);