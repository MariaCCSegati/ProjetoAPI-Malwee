const Joi = require('joi');
const securityConsts = require('../consts/security-consts');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');

knl.post('product', async(req, resp) => {
    const schema = Joi.object({
        descripiton : Joi.string().min(1).max(100).required(),
        preco : Joi.float().min(1).max(100).required()
        })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.product.findAll({
        where : {
            descripiton : req.body.descripiton
        } 
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const user = knl.sequelize().models.product.build({
        descripiton : req.body.descripiton,
        preco : req.body.preco,
        status   : 1
    });

    await user.save();
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);
