var express = require('express');
var router = express.Router();
var less = require('less');

/* GET home page. */
router.post('/less', function(req, res, next) {
  console.log(req.body.less);
  less.render(req.body.less, function (e, output) {
    res.json(output);
  });
});


module.exports = router;
