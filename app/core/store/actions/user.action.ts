export const initialState = {
  user: {
    account: '',
    token: '',
    isLogin: false,
  },
}

interface UserState {
  account: string
  token: string
  isLogin: boolean
}

interface LoginParam {
  account: string
  password: string
}

export function ACTION_USER_LOGIN(state: StoreStates, action: StoreAction<'ACTION_USER_LOGIN'>): any {
  return { ...action.data }
}

export function ACTION_USER_LOGIN_SUCCESS(
  state: StoreStates,
  action: StoreAction<'ACTION_USER_LOGIN_SUCCESS'>
): any {
  return { user: { ...action.data } }
}

declare global {
  interface StoreStates {
    user: UserState
  }

  interface StoreActions {
    ACTION_USER_LOGIN: LoginParam
    ACTION_USER_LOGIN_SUCCESS: UserState
    ACTION_USER_LOGIN_FAILED: string
    ACTION_USER_LOGOUT_SUCCESS: string
    ACTION_USER_LOGOUT_FAILED: string
  }
}
