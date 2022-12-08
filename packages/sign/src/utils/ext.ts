export { getBaseInfo, share, receivedMessage } from "@circle/sdk" 

// export const getUserInfo = (): Promise<any> => {
//     return new Promise((resolve, reject) => {
//         postPromiseMessage('getUserInfo', '').then((res: any) => {
//             console.log('用户信息： ', res)
//             resolve(res)
//         }).catch(err => {
//             reject(err)
//         })
//     })
// }

// export const share = (customExts: any) => {
//     return new Promise((resolve, reject) => {
//         postPromiseMessage('share', { customExts }).then((res) => {
//             resolve(res)
//         }).catch(err => {
//             reject(err)
//         })
//     })
// }