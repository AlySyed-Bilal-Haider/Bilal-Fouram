import React from 'react'
import Commompage from './Common/Commonpage';
function Feed({title,tage}) {
    console.log("Feed");
  return (
   <Commompage title={title} tage={tage}/>
  )
}

export default React.memo(Feed);