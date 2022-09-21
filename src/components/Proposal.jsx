import React from 'react'
import Commompage from './Common/Commonpage';
function Proposal({title,tage}) {
    console.log("Proposal");
  return (
   <Commompage title={title} tage={tage}/>
  )
}

export default Proposal;