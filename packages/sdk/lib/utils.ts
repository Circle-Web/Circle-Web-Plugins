export const isFunction = (fn: any) => {
    return Object.prototype.toString.call(fn) === '[object Function]'
}