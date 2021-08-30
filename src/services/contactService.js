const HttpStatus = require('http-status-codes');
const ContactRepository = require('../repositories/contactRepository');
const ApiResponse = require('../models/apiResponse');
const MessageConstant = require('../constants/messageConstant');

module.exports = class ContactService{

    constructor(){
        this.contactRepository = new ContactRepository();
    }

    /**
     * Retorna todos os Contatos
     * @returns {ApiResponse} Objeto ApiResponse
     */
    async getAll(){
        let apiResponse = new ApiResponse();

        apiResponse.object = await this.contactRepository.getAll();
        apiResponse.status = HttpStatus.OK;

        return apiResponse;
    }

    /**
     * Retorna um contato por ID
     * @param {*} id 
     * @returns {ApiResponse} Objeto ApiResponse
     */
    async get(id){
        let apiResponse = new ApiResponse();

        if (!this.validateId(apiResponse, id)){
            return apiResponse;
        }

        let contact = await this.contactRepository.get(id);

        if (contact !== undefined){
            apiResponse.object = contact;
        } else {
            apiResponse.status = HttpStatus.NOT_FOUND;
            apiResponse.messages.push(MessageConstant.contactNotFound);
        }

        return apiResponse;
    }

    /**
     * Insere um novo contato
     * @param {*} contact 
     * @returns {ApiResponse} Objeto ApiResponse
     */
    async insert(contact){
        let apiResponse = new ApiResponse();

        // validação
        this.validateBody(apiResponse, contact);
        this.validateBodyInsertUpdate(apiResponse, contact);
        this.isValidDate(apiResponse, contact.dtBirth);

        // insere no repositorio caso nao há mensagens de validação
        if (apiResponse.messages.length <= 0)
        {
            // converte string para data
            contact.dtBirth = new Date( contact.dtBirth.replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3") ).toLocaleString();

            console.log('inserting new contact...');
            await this.contactRepository.insert(contact);
            apiResponse.messages.push(MessageConstant.contactInserted);
            console.log('contact inserted!');
        }

        return apiResponse;
    }

    /**
     * Atualiza um contato existente
     * @param {*} id 
     * @param {*} contact 
     * @returns {ApiResponse} Objeto ApiResponse
     */
    async update(id, contact){
        let apiResponse = new ApiResponse();

        this.validateId(apiResponse, id);
        this.validateBody(apiResponse, contact);
        this.validateBodyInsertUpdate(apiResponse, contact);
        this.validateContactExist(apiResponse, id);

        if (apiResponse.messages.length <= 0){ 
            contact.id = Number(id);
            console.log('updating contact...');
            await this.contactRepository.update(contact);
            console.log('contact updated!');
        }

        return apiResponse;
    }

    /**
     * Deleta um contato existente
     * @param {*} id 
     * @returns {ApiResponse} ApiResponse
     */
    async delete(id){
        let apiResponse = new ApiResponse();

        this.validateId(apiResponse, id);
        this.validateContactExist(apiResponse, id);

        if (apiResponse.messages.length <= 0){
            console.log(`deleting contact id '${id}'...`);
            await this.contactRepository.delete(Number(id));
            console.log('contact Deleted!');
        }

        return apiResponse;
    }

    /**
     * Validação do campo ID
     * @param {ApiResponse} apiResponse 
     * @param {*} id 
     * @returns {Boolean} Boolean
     */
    validateId(apiResponse, id){
        if (id === undefined || id === null){
            apiResponse.status = HttpStatus.BAD_REQUEST;
            apiResponse.messages.push(`'id' ${MessageConstant.isRequired}`);
        }
        else if (isNaN(id)){
            apiResponse.status = HttpStatus.BAD_REQUEST;
            apiResponse.messages.push(`'id' ${MessageConstant.mustBeNumber}`);
        }

        return apiResponse.status == HttpStatus.OK;
    }

    /**
     * Validação comum do body
     * @param {ApiResponse} apiResponse 
     * @param {*} body 
     * @returns {Boolean} Boolean
     */
    validateBody(apiResponse, body){
        if(body === undefined || body === null || !Object.keys(body).length){
            apiResponse.status = HttpStatus.BAD_REQUEST;
            apiResponse.messages.push(`'body' ${MessageConstant.isRequired}`);
        }

        return apiResponse.status == HttpStatus.OK;
    }

    /**
     * Validação dos campos obrigatórios do body
     * @param {ApiResponse} apiResponse 
     * @param {*} body 
     * @returns {Boolean} Boolean
     */
    validateBodyInsertUpdate(apiResponse, body){
        if (apiResponse.status === HttpStatus.OK)
        {
            let requiredFields = ['name', 'dtBirth', 'nuPhone'];

            requiredFields.forEach(field => {
                if (!(field in body)){
                    apiResponse.status = HttpStatus.BAD_REQUEST;
                    apiResponse.messages.push(`'${field}' ${MessageConstant.isRequired}`);
                }
            });
        }

        return apiResponse.status == HttpStatus.OK;
    }

    /**
     * Valida se o contato existe na base
     * @param {ApiResponse} apiResponse 
     * @param {Number} id 
     * @returns {Boolean} Boolean
     */
    validateContactExist(apiResponse, id){
        if (apiResponse.status === HttpStatus.OK)
        {
            let contact = this.contactRepository.get(id);
            if (contact === undefined)
            { 
                apiResponse.status = HttpStatus.BAD_REQUEST;
                apiResponse.messages.push(`${MessageConstant.contactNotFound}`);
            }
        }

        return apiResponse.status == HttpStatus.OK;
    }

    isValidDate(apiResponse, dateAsString){
        if (apiResponse.status === HttpStatus.OK)
        {
            var dateParts = dateAsString.split("/");
            let isValidDate = Date.parse(dateParts[1] + "/" + dateParts[0] + "/"+ dateParts[2]);

            if (Number.isNaN(isValidDate))
            { 
                apiResponse.status = HttpStatus.BAD_REQUEST;
                apiResponse.messages.push(`Date ${MessageConstant.isInvalid}`);
            }
        }

        return apiResponse.status == HttpStatus.OK;
    }
}