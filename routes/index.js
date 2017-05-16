/**
 * Created by jayam on 4/25/17.
 */
exports.index = function(req, res){
    res.render('index',{
        title:'Express'
    })
}

exports.projectDetail = function(req, res){
  // console.log('Red ' + req.query.id);
  console.log('Red ' + req.params);
  res.render('projectDetail',{
    title:'Project Detail'
  })
}