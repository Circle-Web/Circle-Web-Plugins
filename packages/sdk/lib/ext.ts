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
    return reqeust<any, IBaseInfo>(EXT_EVENT_NAME.BASE_INFO)
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
    customExts: ICustomExts
}

/**
 * 自定义的分享消息类型
 */
 export const enum CUSTOM_MSG_TYPE {
    /**
     * 邀请消息? 不知道是谁定义的
     */
    INVITE = 1,
    /**
     * 打卡消息
     * @deprecated
     */
    SIGN_IN,
    /**
     * 卡片消息
     */
    CARD
  }

/**
 * 自定义的扩展信息
 * 分享的时候会带上
 */
export interface ICustomExts {
    /**
     * 分享的标题
     */
    title?: string
    /**
     * 分享的类型
     */
    customMsgType: CUSTOM_MSG_TYPE,
    /**
     * 分享的背景图片
     */
    backgroundUrl?: string
    /**
     * 可以打开弹窗
     */
    url?: string
    /**
     * 小标题
     */
    smallTitle?: string;
    /**
     * 描述
     */
    description?: string;
}

/**
 * 分享信息
 * @param customExts 
 * @returns 
 */
export const share = (customExts: ICustomExts) => {
    return reqeust<IShareInfo, IFrameResponse<IShareResponse>>(EXT_EVENT_NAME.SHARE, { customExts })
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
    // unlistenMessage(callback)
}