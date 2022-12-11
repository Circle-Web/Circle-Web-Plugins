export interface IOwnRecord {
    createTime: number
}

export interface ISignInfo {
    /**
     * 今日签到人数
     */
    person: number
    /**
     * 今天签到排位第几?
     */
    rankIndexToday: number
    /**
     * 签到时间
     */
    signTime: number
    /**
     * 今日是否签到
     */
    signToday: boolean
    /**
     * 签到总天数
     */
    day: number
    /**
     * 签到总人数
     */
    ownRecordList: IOwnRecord []
  }