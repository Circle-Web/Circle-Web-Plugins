export interface IVoteOption {
    /**
     * 每一项的描述
     */
    desc: string
    /**
     * 当前选中该选项的人数
     */
    selectCount: number
    /**
     * 本人是否选中该选项
     */
    select: boolean
    /**
     * 百分比
     */
    percent: number
}

export interface IVoteDetail<T = string> {
    /**
     * 投票id
     */
    id: number
    /**
     * 投票标题
     */
    title: string
    /**
     * 选项列表
     */
     option: T[]
    /**
     * 是否多选 
     */
    multipleChoice: boolean
    /**
     * 是否公开结果
     */
    publicResult: boolean
    /**
     * 是否已结束
     */
    finish: boolean
    /**
     * 发起人
     */
    userId: string
    /**
     * 发起时间
     */
    createTime: number
}

export interface IVote {
    /**
     * 投票id
     */
    id: number
    /**
     * 当前的用户id
     */
    userId: string
    /**
     * 选择的选项 index[]
     */
    select: number[]
}

export interface IVoteResponse {
    mainRecord: IVoteDetail
    list: IVote[]
    /**
     * 本人是否已投票
     */
    selected: boolean
}