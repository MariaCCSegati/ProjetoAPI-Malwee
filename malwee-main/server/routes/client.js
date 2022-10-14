const Joi = require('joi');
const securityConsts = require('../consts/security-consts');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');

knl.post('client', async(req, resp) => {
    const schema = Joi.object({
        nome : Joi.string().min(1).max(100).required(),
        CNPJ : Joi.string().min(1).max(14).required(),
        razaoSocial : Joi.string().min(1).max(100).required(),
        clienteDesde : Joi.string().min(1).max(14).required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.client.findAll({
        where : {
            nome : req.body.nome
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const user = knl.sequelize().models.client.build({
        nome : req.body.nome,
        CNPJ : req.body.CNPJ,
        razaoSocial : req.body.razaoSocial,
        clienteDesde : req.body.clienteDesde,
        status   : 1
    });

    await user.save();
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('group', async(req, resp) => {

    const result = await knl.sequelize().models.group.findAll({
        where : {
            status: 1
        }
    });
    console.log(result);
    resp.json(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('group/:id', async(req, resp) => {

    const result = await knl.sequelize().models.group.findAll({
        where : {
            id : req.params.id
        }
    });
    console.log(result);
    resp.json(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.put('group/:id', async(req, resp) => {
    
    const result = await knl.sequelize().models.group.put({
        where : {
            id: req.body.id
        }
    });

    resp.send(result);
    console.log(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)

knl.delete('group/:id', async(req, resp) => {

    const result = await knl.sequelize().models.group.destroy({
        where : {
            id: req.params.id
        }
    });

    resp.json(result);
    console.log(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)

knl.patch('group/:id', async(req, resp) => {

    const result = await knl.sequelize().models.group.update({
        status : 0
    },{
        where : {
            id: req.params.id,
        },
    });

    resp.json(result)
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)