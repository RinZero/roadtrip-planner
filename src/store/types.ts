import { RouterState } from 'connected-react-router'

import { UiState } from './ui/types'
import { UserState } from './user/types'

export type ReduxState = {
  user: UserState
  ui: UiState
  router: RouterState
}
