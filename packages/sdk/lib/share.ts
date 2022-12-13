import type { CUSTOM_MSG_TYPE } from "./event";

/**
 * iframe response
 */
export interface IFrameResponse<T = any> {
    type: string;
    data: T;
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
export interface IShareInfo<T> {
    customExts: ICustomExts<T>
}

/**
 * 自定义的扩展信息
 */
export interface ICustomExtsBase {
    /**
     * 标题
     */
    title: string
    /**
     * 分享的消息类型
     */
    customMsgType: CUSTOM_MSG_TYPE;
    /**
     * 如果需要可打开的消息, url是必选的
     * 需要打开的链接
     */
    url: string
}

/**
 * 签到需要的参数
 */
export interface ISignInCustomExts extends ICustomExtsBase {
    /**
     * 每日打卡的背景图
     */
    backgroundUrl?: string
}

/**
 * 卡片需要的参数
 */
export interface ICardCustomExts extends ICustomExtsBase {
    /**
     * 小标题
     */
    smallTitle: string;
    /**
     * 描述
     */
    description: string;
}

/**
 * 代码需要的参数
 * 
 */
export interface ICodeCustomExts {
    /**
     * 代码语言
     */
    codeLang: string;
    /**
     * 代码内容
     */
    codeContent: string;
    /**
     * 代码运行的结果
     */
    codeResult?: string;
}

/**
 * 根据不同的类似需要传递不同的参数
 */
export type ICustomExts<T> =
    T extends CUSTOM_MSG_TYPE.SIGN_IN
        ? ISignInCustomExts
        : T extends CUSTOM_MSG_TYPE.CARD
            ? ICardCustomExts
            : T extends CUSTOM_MSG_TYPE.CODE
                ? ICodeCustomExts 
                : ICustomExtsBase


