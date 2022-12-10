import { defineStore } from 'pinia'
import type { IBaseInfo } from '@circle/sdk'


export const useUserStore = defineStore('user', {
    state: () => ({
        baseInfo: {
            userInfo: {
                username: ''
            },
            serverRole: {},
            currentChannelInfo: {
                serverId: '',
                channelId: 0
            }
        } as IBaseInfo
    }),
    actions: {
        SET_BASE_INFO(baseInfo: IBaseInfo) {
            this.baseInfo = baseInfo
        }
    }
})
