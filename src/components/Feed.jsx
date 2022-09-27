import React from 'react'
import Commompage from './Common/Commonpage';
function Feed({title,tage}) {
  return (
   <Commompage title={title} tage={tage}/>
  )
}

export default React.memo(Feed);