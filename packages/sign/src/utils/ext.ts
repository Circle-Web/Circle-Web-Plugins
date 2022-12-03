import { useConnectParent } from '@emojiiii/iframe-promise/lib/iframe'

const {
    addlistenerMessage,
    removeListenerMessage,
    postMessage,
    postPromiseMessage
} = useConnectParent({})

addlistenerMessage()

window.addEventListener('unload', () => {
    console.log('222')
    removeListenerMessage()
})

export const getUserInfo = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        postPromiseMessage('getUserInfo', '').then((res: any) => {
            console.log('用户信息： ', res)
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const share = (customExts: any) => {
    return new Promise((resolve, reject) => {
        postPromiseMessage('share', { customExts }).then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}