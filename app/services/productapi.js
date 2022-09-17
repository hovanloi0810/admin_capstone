function apiGetProducts(searchProduct) {
    return axios({
        url: 'https://63185e1ff6b281877c6a3e72.mockapi.io/Products',
        method: 'GET',
        params: {
            name: searchProduct,
        }
    });
}

function apiAddProduct(product) {
    return axios({
        url: `https://63185e1ff6b281877c6a3e72.mockapi.io/Products`,
        method: 'POST',
        data: product,
    })
}

function apiRemoveProduct(productId) {
    return axios({
        url: `https://63185e1ff6b281877c6a3e72.mockapi.io/Products/${productId}`,
        method: 'DELETE',
    })
}


function apiGetProductById(productId) {
    return axios({
        url: `https://63185e1ff6b281877c6a3e72.mockapi.io/Products/${productId}`,
        method: 'GET',
    });
}

function aptUpdateProduct(productId, product) {
    return axios({
        url: `https://63185e1ff6b281877c6a3e72.mockapi.io/Products/${productId}`,
        method: 'PUT',
        data: product,
    })
}