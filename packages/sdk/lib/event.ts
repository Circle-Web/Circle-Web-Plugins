/**
 * 事件名称
 */
export const enum EXT_EVENT_NAME {
    /**
     * 基础信息
     */
    BASE_INFO = 'baseInfo',
    /**
     * 分享
     */
    SHARE = 'share',
    /**
     * 监听信息
     */
    LISTEN_MESSAGE = 'listenMessage',
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
    CARD,
    /**
     * 代码消息
     */
    CODE,
  }