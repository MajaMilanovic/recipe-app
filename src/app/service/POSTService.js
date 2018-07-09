export const postData = (data, path) => {
    return fetch(path, {
        method: "POST",
        body: JSON.stringify({
            "id": data.id,
            "title": data.title,
            "veg": data.veg,
            "date": data.date,
            "content": data.content
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}