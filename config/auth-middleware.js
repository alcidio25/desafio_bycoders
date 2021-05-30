/**
* Criado por Alcidio Lucas - 30/05/2021
*/

exports.verificarAutenticacao = (req, res, next) => {
    if(req.session.passport.user){
        next()
    }else{
        res.sendStatus(401);
    }
}