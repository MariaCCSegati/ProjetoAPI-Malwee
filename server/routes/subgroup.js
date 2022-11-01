const Joi = require('joi');
const securityConsts = require('../consts/security-consts');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');

knl.post('subgroup', async(req, resp) => {
    const schema = Joi.object({
        description : Joi.string().min(1).max(100).required(),
        fkGroup: Joi.number().min(1).required(),
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.subgroup.findAll({
        where : {
            description : req.body.description,
            fkGroup: req.body.fkGroup
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const user = knl.sequelize().models.subgroup.build({
        description : req.body.description,
        fkGroup: req.body.fkGroup,
        status   : 1
    });

    await user.save();
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('subgroup', async(req, resp) => {

    const result = await knl.sequelize().models.subgroup.findAll({
        where : {
            status: 1
        }
    });
    console.log(result);
    resp.json(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('subgroup/:id', async(req, resp) => {

    const result = await knl.sequelize().models.subgroup.findAll({
        where : {
            id : req.params.id
        }
    });
    console.log(result);
    resp.json(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.put('subgroup', async(req, resp) => {
    
    const result = await knl.sequelize().models.subgroup.update({
        description : req.body.description,
       },{
          where : {
            id: req.body.id
        }
    });

    resp.json(result);
    resp.end();
})

knl.delete('subgroup/:id', async(req, resp) => {

    const result = await knl.sequelize().models.subgroup.destroy({
        where : {
            id: req.params.id
        }
    });

    resp.json(result);
    console.log(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)

knl.patch('subgroup/:id', async(req, resp) => {

    const result = await knl.sequelize().models.subgroup.update({
        status : 0
    },{
        where : {
            id: req.params.id,
        },
    });

    resp.json(result)
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)