
module.exports.index = function(req, res)
{
    var userId = res.cookie('user-id').value;
    res.render('index');
};