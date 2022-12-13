// alert('Hi, Wirdha Mohamed, I love you. This a Computer');
async function getProducts() {
    const response = await fetch('http://localhost:3000/api/maal');
    const maal = await response.json()
    return maal;
}
getProducts()
