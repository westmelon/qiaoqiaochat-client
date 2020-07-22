import { MessageType, ChatType, ChatWrapper, Message, Chat } from './type'
import { v4 as uuidv4 } from 'uuid'
import { replyMessage } from '@/core/websocket'

export const initialState = {
  chat: {
    nini: { someone: 'nini', type: '0', messages: [] },
  },
}

//发送消息 往消息窗口丢消息
export function ACTION_CHAT_SEND_MESSAGE(
  state: StoreStates,
  action: StoreAction<'ACTION_CHAT_SEND_MESSAGE'>
): { chat: ChatWrapper } {
  console.log({ state, action })

  //把发送的消息放进聊天列表中
  //把消息放到所有的消息中
  // const newMessage = new Map<string, MessageType>(state.message.send)
  // const message = new Message()
  // const data = action.data
  // message.uniqueId = uuidv4()
  // message.sender = data.sender
  // message.timestamp = new Date().getTime()
  // message.content = data.message
  // message.receiver = data.receiver
  // newMessage.set(message.uniqueId, message)

  const receiver = action.data.receiver
  const chatContent = Object.assign({}, state.chat)
  let chat = new Chat(receiver)
  if (receiver in chatContent) {
    chat = chatContent[receiver]
  }
  const messages: Array<string> = chat.messages
  console.log(chat)
  console.log(chat.messages)
  messages.push(action.data.id)

  return { chat: chatContent }
}

/**
 * 向消息界面添加接收到的消息id
 * @param state
 * @param action
 */
export function ACTION_CHAT_RECEIVE_MESSAGE(
  state: StoreStates,
  action: StoreAction<'ACTION_CHAT_RECEIVE_MESSAGE'>
): { chat: ChatWrapper } {
  const receiver = action.data.receiver
  const id = action.data.id
  const chatContent = Object.assign({}, state.chat)
  const chat = getChat(chatContent, receiver)
  const messages: Array<string> = chat.messages
  messages.push(id)
  return { chat: chatContent }
}

/**
 * 接收到消息应答时 删掉旧的id,添加新的id
 * @param state
 * @param action
 */
export function ACTION_CHAT_RECEIVE_MESSAGE_REPLY(
  state: StoreStates,
  action: StoreAction<'ACTION_CHAT_RECEIVE_MESSAGE_REPLY'>
): { chat: ChatWrapper } {
  const receiver = action.data.receiver
  const uniqueId = action.data.uniqueId
  const identifier = action.data.identifier
  const chatContent = Object.assign({}, state.chat)
  const chat = getChat(chatContent, receiver)
  const messages = chat.messages
  const newMessages = messages.map(msgId => {
    if (msgId == identifier) {
      return uniqueId
    } else {
      return msgId
    }
  })
  chat.messages = newMessages
  return { chat: chatContent }
}

function getChat(chatContent: ChatWrapper, receiver: string): ChatType {
  let chat: ChatType
  if (receiver in chatContent) {
    chat = chatContent[receiver]
  } else {
    chat = new Chat(receiver)
  }
  return chat
}
declare global {
  interface StoreStates {
    chat: ChatWrapper
  }

  interface StoreActions {
    ACTION_CHAT_SEND_MESSAGE: { receiver: string; id: string }
    ACTION_CHAT_RECEIVE_MESSAGE: { receiver: string; id: string }
    ACTION_CHAT_RECEIVE_MESSAGE_REPLY: { receiver: string; uniqueId: string; identifier: string }
  }
}
