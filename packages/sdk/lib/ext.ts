import { useConnectParent } from '@emojiiii/iframe-promise'
import { EXT_EVENT_NAME } from './event'

const {
    addlistenerMessage,
    removeListenerMessage,
    postMessage,
    postPromiseMessage
} = useConnectParent({})

addlistenerMessage()

window.addEventListener('unload', () => {
    removeListenerMessage()
})

/**
 * iframe response
 */
export interface IFrameResponse<T = any> {
    type: string;
    data: T;
}

/**
 * 用户的基础信息
 */
export interface IBaseInfo {
    userInfo: {
        /**
         * 用户名称 [唯一值]
         */
        username: string;
    }
    serverRole: {
        [serverId: string]: string
    }
    currentChannelInfo: {
        /**
         * 社区id
         */
        serverId: string;
        /**
         * 频道ID
         */
        channelId: number;
    }
}


/**
 * 获取用户的基础信息
 * @returns 
 */
export const getBaseInfo = () => {
    return new Promise((resolve, reject) => {
        /**
         * TODO 优化 postPromiseMessage, 第二个参数和返回值都需要泛型
         */
        postPromiseMessage(EXT_EVENT_NAME.BASE_INFO).then((res: any) => {
            resolve(res as IFrameResponse<IBaseInfo>)
        }).catch(err => {
            reject(err)
        })
    })
}


/**
 * 分享返回信息
 */
export interface IShareResponse {
    code: number;
    msg: string
}

/**
 * 分享信息
 * @param customExts 
 * @returns 
 */
export const share = (customExts: any) => {
    return new Promise((resolve, reject) => {
        postPromiseMessage(EXT_EVENT_NAME.SHARE, { customExts }).then((res) => {
            resolve(res as IFrameResponse<IShareResponse>)
        }).catch(err => {
            reject(err)
        })
    })
}


/**
 * 监听信息
 * @param callback 
 */
export const receivedMessage = (callback: (data: any) => void) => {
    /**
     * 发送一种
     */
    postMessage(EXT_EVENT_NAME.LISTEN_MESSAGE, { callback })
}