export const getData = (path) => {
    return fetch(path)
        .then(response => response.json())
        .then(data => data)
        .catch(error => "Sorry, error happened!")
};