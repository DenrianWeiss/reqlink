/* jshint esversion: 11 */

export async function kvGet(namespace, k) {
    let r = await KV.get(`${namespace}::${k}`, {type: "text"})
    if(r === null) {
        return null;
    }
    return JSON.parse(r)
}

export async function kvSet(namespace, k, v) {
    return JSON.parse(await KV.put(`${namespace}::${k}`), JSON.stringify(v))
}

export async function kvDel(namespace, k) {
    await KV.delete(`${namespace}::${k}`)
}