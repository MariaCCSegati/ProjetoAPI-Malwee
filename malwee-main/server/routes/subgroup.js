const Joi = require('joi');
const securityConsts = require('../consts/security-consts');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');

knl.post('subgroup', async(req, resp) => {
    const schema = Joi.object({
        productName : Joi.string().min(1).max(100).required(),
        description : Joi.string().min(1).max(100).required(),
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.group.findAll({
        where : {
            description : req.body.description
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const user = knl.sequelize().models.group.build({
        description : req.body.description,
        status   : 1
    });

    await user.save();
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('subgroup', async(req, resp) => {

    const result = await knl.sequelize().models.group.findAll({
        where : {
            description : req.body.description,
            status: 1
        }
    });
    console.log(result);
    resp.send(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.put('subgroup', async(req, resp) => {
    
    const result = await knl.sequelize().models.group.put({
        where : {
            id: req.body.id
        }
    });

    resp.send(result);
    console.log(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)

knl.delete('subgroup', async(req, resp) => {

    const result = await knl.sequelize().models.group.destroy({
        where : {
            id: req.body.id
        }
    });

    resp.send(result);
    console.log(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)