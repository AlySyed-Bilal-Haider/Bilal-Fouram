import React from 'react'
import Commompage from './Common/Commonpage';
function Community({title,tage}) {
    console.log("Community");
  return (
   <Commompage title={title} tage={tage}/>
  )
}

export default Community;