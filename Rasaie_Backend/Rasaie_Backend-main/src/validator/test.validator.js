const Joi = require('joi');
const  companyVaidator = {}

companyVaidator.schemaCompany = Joi.object().keys({
    company_legal_name: Joi.string().required(),    
    trade_name: Joi.string(),
    entity_id: Joi.number(),
    duns_number: Joi.number(),
    federal_tax_number: Joi.number(),
    employee_count: Joi.number(),
    corporate_contact_information: Joi.object().keys({
        name: Joi.string(),    
        dot_number: Joi.number(),
        address: Joi.object().keys({
            street: Joi.string(),
            suite: Joi.number(),
            city: Joi.string(),
            state: Joi.string(),
            zipcode: Joi.number(),
        }),
        phone: Joi.string(),
        website: Joi.string(),
        email: Joi.string()
    })
});

companyVaidator.schemaCustomer = Joi.object().keys({
    name: Joi.string().required()
});



module.exports = companyVaidator;
