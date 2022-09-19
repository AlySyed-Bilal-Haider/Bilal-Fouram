import React from 'react'
import Commompage from './Common/Commonpage';
function Feed({title}) {
    console.log("Feed");
  return (
   <Commompage title={title}/>
  )
}

export default React.memo(Feed);