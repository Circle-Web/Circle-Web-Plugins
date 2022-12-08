import { Message, useConnectParent } from '@emojiiii/iframe-promise'
import { EXT_EVENT_NAME } from './event'

const {
    addlistenerMessage,
    removeListenerMessage,
    reqeust,
    listenMessage,
    unlistenMessage
} = useConnectParent<EXT_EVENT_NAME>({})

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
    return reqeust<any, IFrameResponse<IBaseInfo>>(EXT_EVENT_NAME.BASE_INFO)
}


/**
 * 分享返回信息
 */
export interface IShareResponse {
    code: number;
    msg: string
}

/**
 * 分享的内容
 */
export interface IShareInfo {
    customExts: {
        title: string;
    };
}

/**
 * 分享信息
 * @param customExts 
 * @returns 
 */
export const share = (customExts: any) => {
    return new Promise((resolve, reject) => {
        reqeust<IShareInfo, IFrameResponse<IShareResponse>>(EXT_EVENT_NAME.SHARE, { customExts }).then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}


/**
 * 监听信息
 * @param callback 
 */
export const receivedMessage = (callback: (data: Message<any>) => void) => {
    /**
     * 发送一种
     */
    return listenMessage(EXT_EVENT_NAME.LISTEN_MESSAGE, callback)
}

/**
 * 取消监听信息
 */
export const unReceivedMessage = (callback: (data: Message<any>) => void) => {
    // unlistenMessage()
}