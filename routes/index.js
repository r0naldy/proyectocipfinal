var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/portada/portada1', function(req, res, next) {
  res.render('portada/portada1');
});
router.get('/portada/portada2', function(req, res, next) {
  res.render('portada/portada2');
});
router.get('/portada/portada3', function(req, res, next) {
  res.render('portada/portada3');
});
router.get('/portada/portada4', function(req, res, next) {
  res.render('portada/portada4');
});
router.get('/portada/portada5', function(req, res, next) {
  res.render('portada/portada5');
});
router.get('/portada/portada6', function(req, res, next) {
  res.render('portada/portada6');
});
router.get('/portada/portada7', function(req, res, next) {
  res.render('portada/portada7');
});
router.get('/portada/portada8', function(req, res, next) {
  res.render('portada/portada8');
});
router.get('/portada/portada9', function(req, res, next) {
  res.render('portada/portada9');
});
router.get('/portada/portada10', function(req, res, next) {
  res.render('portada/portada10');
});
router.get('/portada/portada11', function(req, res, next) {
  res.render('portada/portada11');
});
router.get('/login2', function(req, res, next) {
  res.render('usuario/build/pages/capacitaciones.ejs');
});


router.post('/dashboard', function(req, res, next) {
  email=req.body.email;
  password=req.body.password;
  console.log(email);
  dbConn.query("SELECT * FROM usuarios WHERE email='"+email+"' AND password='"+password+"'",function(err,rows){
    if(err){
      req.flash('error',err);
      console.log(err);
    }else{
      if(rows.length){
        console.log(rows);
        req.session.idu=rows[0]["id"];
        req.session.email=rows[0]["email"];
        req.session.loggedin = true;
        res.redirect('/main');
      }else{
        req.flash('error','El usuario no existe...');
        res.redirect('/login');
      }
    }
  });

  
});


router.get('/main', function(req, res, next) {
   //if(!req.session.loggedin){
   //  res.redirect('/login');
   //}else{
     res.locals.idu=req.session.idu;
     res.locals.email=req.session.email;
     res.locals.loggedin=req.session.loggedin;

     var queries = [
      "SELECT COUNT(idx) as cantidad FROM clientes",
      "SELECT SUM(saldo) as total FROM clientes",
      "SELECT COUNT(sexo) as hombres FROM clientes WHERE sexo='H'",
      "SELECT COUNT(sexo) as mujeres FROM clientes WHERE sexo='M'"
    ];
    
     //dbConn.query('SELECT SUM(saldo) as total FROM clientes',function(err,rows) {
     dbConn.query(queries.join(';'),function(err,rows) {
      //console.log(rows[0].total);
      if(err) throw err;
      //console.log(rows[0][0].cantidad);
      res.render('dashboard',{dataCantidad:rows[0][0].cantidad,dataSaldo:rows[1][0].total,dataHombres:rows[2][0].hombres.total,dataMujeres:rows[3][0].mujeres});
     });
     
   //}
});

router.get('/api', function(req, res, next) {
  //if(!req.session.idu){
    //res.render('login/index');
  //}else{
    dbConn.query('SELECT marca, COUNT(*) as cantidad FROM clientes GROUP BY marca',function(err,rows)     {
      if(err) {
          req.flash('error', err);  
          console.log(rows);
      } else {
        res.send(JSON.stringify(rows));
        //res.render('login/dashboard',{data:JSON.stringify(rows)});
      }
    });
  //}
});


router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

router.get('/clientes', function(req, res, next) {
  dbConn.query('SELECT * FROM clientes WHERE activo=1',function(err,rows)     {
      if(err) {
          req.flash('error', err);
          // render to views/books/index.ejs
          res.render('clientes/list',{data:''});   
          console.log(rows);
      } else {
          // render to views/books/index.ejs
          res.locals.idu=req.session.idu;
          res.locals.user=req.session.user;
          res.locals.email=req.session.email;

          res.render('clientes/list',{data:rows});
      }
  });
});

module.exports = router;
