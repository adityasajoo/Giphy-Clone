exports.handler = async (event, context) => {
    return{
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello World!',
        }),
        headers:{
            "Access-Control-Allow-Origin":  "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
    }
}