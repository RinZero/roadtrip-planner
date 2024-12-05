import { memo } from 'react'

import loadinganimation from '../../assets/animation/roadabout.webm'
import { ImgBox } from './style'

const LoadingAnimation = () => {
  return (
    <ImgBox>
      <video autoPlay loop>
        <source src={loadinganimation} type="video/webm"></source>
      </video>
    </ImgBox>
  )
}

export default memo(LoadingAnimation)
