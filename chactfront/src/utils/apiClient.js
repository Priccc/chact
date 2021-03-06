import superagent from 'superagent';
export default (path,type,query) => {
    const url = `http://localhost:8086/api${path}`;
    const request = superagent[type](url);
    const actionHeader = {};
    const clientPromise = new Promise((resolve, reject) => {
        request.type('form').set(actionHeader);
        if (query) {
            request.send(query);
        }
        request.end((err, response) => {
            const result = {};

            if (err) {
                result.status = err.status || 500;
                result.message = err.message;
                reject(result)
            } else if (response) {
                result.status = response.status;
                result.body = response.body;
                if(result.body.success){
                    resolve(result.body.result)
                }else{
                    reject(result.body.result)
                }
            }
        });

    });
    clientPromise.abort = () => {
        request.abort()
    };

    return clientPromise;
}
