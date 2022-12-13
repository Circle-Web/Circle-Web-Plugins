import { useConnectParent } from '@emojiiii/iframe-promise'
import { EXT_EVENT_NAME, CUSTOM_MSG_TYPE } from './event'
import type { ICustomExts, IFrameResponse, IShareInfo, IShareResponse } from './share'

const {
    reqeust,
    addlistenerMessage,
} = useConnectParent<EXT_EVENT_NAME>({})

let islisten = false

if (!islisten) {
    addlistenerMessage()
    islisten = true
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
 * 分享信息
 * @param customExts 
 * @returns 
 */
export const share = <T = CUSTOM_MSG_TYPE>(customExts: ICustomExts<T>) => {
    return reqeust<IShareInfo<T>, IFrameResponse<IShareResponse>>(EXT_EVENT_NAME.SHARE, { customExts })
}