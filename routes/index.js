/**
 * Created by jayam on 4/25/17.
 */
exports.index = function(req, res){
    res.render('index',{
        title:'Express'
    })
}

exports.login = function(req, res){
    res.render('login',{
        title:'Express'
    })
}