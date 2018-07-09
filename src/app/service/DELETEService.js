export const deleteData = (path) => {
    return fetch(path, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => "Sorry, error happened!")
};