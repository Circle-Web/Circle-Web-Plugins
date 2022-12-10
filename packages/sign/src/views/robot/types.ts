export interface IRobot {
    /**
     * 机器人id
     */
    id: number
    /**
     * 创建者id
     */
    userId: string
    /**
     * 机器人昵称
     */
    robotNickname: string
    /**
     * 社区名称
     */
    serverName: string
    /**
     * 频道ID
     */
    channelId: number
    /**
     * 频道名称
     */
    channelName: string
    /**
     * 创建时间
     */
    createTime: number
    /**
     * 更新时间
     */
    updateTime: number
    /**
     * 机器人webhook
     */
    webhook: string
}


export interface IRobotListResponse {
    list: IRobot[]
}