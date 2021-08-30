var HttpStatus = require('http-status-codes');

module.exports = class ApiResponse{
    constructor(){
        this.status = HttpStatus.OK;
        this.messages = new Array();
        this.object = null;
    }
}