module.exports = {
    // imprime no console o tipo da requisicao e o body
    logRequisition: function (req, res, next){
        console.log("----- NEW REQUEST -----");
        console.log(`Method: ${req.method}`);
        console.log(`URL: ${req.url}`);
        
        if (Object.keys(req.params).length !== 0){
            console.log(`Parameters:`);
            console.log(req.params);
        }

        if (Object.keys(req.body).length !== 0){
            console.log(`Body:`);
            console.log(req.body);
        }
        
        console.log(`...`);
        next();
    }
}


