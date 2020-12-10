const Joi=require("@hapi/joi");

const registerValidation=(data)=>{
    const schema=Joi.object({
        name:Joi.string()
        .min(6)
        .required(),
        email:Joi.string()
        .min(10)
        .required()
        .email(),
        phoneno:Joi.string()
        .min(10)
        .max(10),
        password:Joi.string()
        .min(6)
        .required()
    
    });
    return schema.validate(data);
}

const loginValidation=(data)=>{
    const schema=Joi.object({
        email:Joi.string()
        .min(10)
        .required()
        .email(),
        password:Joi.string()
        .min(6)
        .required()
    
    });
    return schema.validate(data);
}

const productValidation=(data)=>{
    const schema=Joi.object({
    p_category:Joi.string().required(),
    p_pet_type:Joi.string().required(),
    p_name:Joi.string().required(),
    p_quantity:Joi.number().required(),
    p_price:Joi.number().required(),
    p_description:Joi.string().required(),
    p_image:Joi.string().required(),
    p_manf_date:Joi.date().when('p_category',{
        is:'medicines',
        then:Joi.date().required("Manufacturing date is required")
    }).concat(Joi.date().when("p_category",{
        is:"foods",
        then:Joi.date().required()
    })),
    p_exp_date:Joi.date().when('p_category',{
        is:'medicines',
        then:Joi.date().greater(Joi.ref('p_manf_date')).required("Expiry date  is required")
    }).concat(Joi.date().when("p_category",{
        is:"foods",
        then:Joi.date().required()
    })),

    });
    return schema.validate(data);
}
module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;
module.exports.productValidation=productValidation;

