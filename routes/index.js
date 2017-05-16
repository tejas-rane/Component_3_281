/**
 * Created by jayam on 4/25/17.
 */
exports.index = function(req, res){
    res.render('index',{
        title:'Express'
    })
}

exports.dashboard= function(req, res){
  res.render('dashboard',{
    title:'Express'
  })
}


exports.projectlist= function(req, res){
  res.render('projectlist',{
    title:'Express'
  })
}


exports.forms= function(req, res){
  res.render('forms',{
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
exports.login = function(req, res) {
    res.render('login', {
        title: 'Express'
    })
}