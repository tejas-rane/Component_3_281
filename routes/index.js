/**
 * Created by jayam on 4/25/17.
 */
exports.index = function(req, res){
    res.render('index',{
        title:'Express'
    })
}

exports.projectDetail = function(req, res){
  res.render('projectDetail',{
    title:'Project Detail'
  })
}