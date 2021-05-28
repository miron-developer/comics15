'use strict'


const formDataToString = (data = new FormData()) => {
    let res = "";
    for (let [k, v] of data.entries())
        res += k + "=" + v + "&"
    return res.slice(0, -1)
}

// use fetching by both method
export const Fetching = async(action, data, method = "POST") => {
    if (action === undefined) return { err: "action undefined" };

    const fetchOption = { 'method': method };
    if (method === "GET") action += "?" + encodeURI(formDataToString(data));
    else fetchOption["body"] = data;

    return await fetch(action, fetchOption)
        .then(res => res.json())
        .catch(err => Object.assign({}, { 'err': "500: server not response" }));
}

// convert from object to URLSearchParams
export const PrepareDataToFetch = (datas = {}) => {
    const data = new FormData();
    for (let [k, v] of Object.entries(datas)) data.append(k, v);
    return data;
}

// get data by id & type
export const GetDataByID = async(id, datatype) => {
    const data = PrepareDataToFetch({ 'id': id });
    const res = await Fetching("/api/" + datatype, data, 'GET');
    if (res.err !== 'ok') return { 'err': res.err }

    return res.data;
}