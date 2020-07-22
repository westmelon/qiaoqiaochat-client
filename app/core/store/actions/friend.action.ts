export const initialState = {
  friend: null,
}

interface FriendType {
  headImage: string
  nickName: string
}

//刷新好友列表
export function ACTION_FRESH_FRIEND(
  state: StoreStates,
  action: StoreAction<'ACTION_FRESH_FRIEND'>
): { friends: Map<string, FriendType> } {
  console.log({ state, action })
  const friends = new Map<string, FriendType>(action.data)
  console.log(friends)
  return { friends: friends }
}

declare global {
  //state 节点类型
  interface StoreStates {
    friend: Map<string, FriendType>
  }

  //参数类型
  interface StoreActions {
    ACTION_FRESH_FRIEND: Map<string, FriendType>
  }
}
