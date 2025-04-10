const getData = async (url) => {
    const res = await fetch(url)
    const contentType = res.headers.get('content-type')

    if (contentType && contentType.includes('application/json')) {
        const json = await res.json()
        return json
    } else {
        throw new Error(`Expected JSON, but received ${contentType}`)
    }
}

const url = 'https://jsonplaceholder.typicode.com/posts/1'

try {
    const data = await getData(url)
    console.log(data)
} catch (error) {
    console.log('Fetch error:', error.message)
}