import React, { memo, Suspense } from 'react'

import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import ErrorOverlay from '../../components/ErrorOverlay'
import { selectMessage } from '../../store/selectors'
import { FooterLink, FooterNavigation } from './style'

const Footer = () => {
  const message = useSelector(selectMessage())
  return (
    <FooterNavigation>
      <ErrorOverlay message={message} />
      <FooterLink component={RouterLink} to={`/impressum`} variant="h6">
        Impressum
      </FooterLink>
    </FooterNavigation>
  )
}

export default memo(Footer)
