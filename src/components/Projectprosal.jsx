import React from 'react'
import Commompage from './Common/Commonpage';
function Projectproposal({title,tage}) {
    console.log("Project propsal");
  return (
   <Commompage title={title} tage={tage}/>
  )
}

export default React.memo(Projectproposal);