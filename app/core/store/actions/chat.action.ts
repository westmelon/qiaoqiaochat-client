export const initialState = {
  message: [],
}

export function ACTION_SEND_MESSAGE(
  state: StoreStates,
  action: StoreAction<'ACTION_SEND_MESSAGE'>
): { message: Array<string> } {
  console.log({ state, action })
  const message = Object.assign([], state.message)
  const aa = new Array(action.data)
  console.log(aa)
  const result = message.concat(aa)
  console.log(result)
  return { message: result }
}

declare global {
  interface StoreStates {
    message: Array<string>
  }

  interface StoreActions {
    ACTION_SEND_MESSAGE: string
  }
}
