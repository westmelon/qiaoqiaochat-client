interface AnyObj {
  /* eslint-disable */
  [key: string]: any
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'production' | 'none'
    BUILD_ENV?: 'mock' | 'dev' | 'prod'

    /** API 协议 */
    API_PROTOCOL: string
    /** API 域名 */
    API_HOST: string
    /** API 根路径 */
    API_BASE_PATH: string
    /** websocket 协议 */
    WS_PROTOCOL: string
    /** websocket 域名 */
    WS_HOST: string
    /** websocket 根路径 */
    WS_BASE_PATH: string
  }
}

declare const nodeRequire: NodeRequire
