export const getExample = (webhook: string) => {
    return `const params = {
    "type": "txt",
    "body": {
        "msg": "Hi, I'm a robot."
    }
}
fetch("${webhook}", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
}).then(res => res.json()).then(res => {
    console.log(res)
}).catch(err => {
    console.error(err)
})
`
}