
const express = require('express');
let app = express();
let db_config = require(__dirname + '/config/database.js');
let conn = db_config.init();
let bodyParser = require('body-parser');
let range_sql;

db_config.connect(conn);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


app.use(express.static(__dirname + '/public'));




//PYTHON !!!
let runPy = new Promise(function(success, nosuccess) {

    const { spawn } = require('child_process');
    const pyprog = spawn('python', ['./public/python/test.py']);

    pyprog.stdout.on('data', function(data) {

        success(data);
    });

    pyprog.stderr.on('data', (data) => {

        nosuccess(data);
    });
});

//test!!!
app.get('/list', (req, res) => {
    console.log(runPy);
    if(runPy=1){   //나중에 upload aws 로 바꾸기
        res.redirect('/'); // 홈으로 가기
    }
});


// AWS!!!!!!!!!!!!1
// const fs=require('fs');
// const AWS = require('aws-sdk');
// const id = 'AKIAXU3SCGJX3KBU42EI'; // 키 값
// const pw = 'M36CFGm1CeW2LHIaNbdh0zyn7JXcqRsFOrLK7mr/'; //  시크릿 키
// const bucket_name = 'lifeflavor'; //버킷 이름
// const s3=new AWS.S3({
//   accessKeyId: id,
//   secretAccessKey: pw
// });

//다운로드
// const downloadFile=(fileName)=>{
//     const params ={
//       Bucket: bucket_name,
//       Key: 'kakao.mp4', //you want to file in s3 안에 있는 파일 이름
//     };
//     s3.getObject(params, function(err,data){
//       if(err){throw err;}
//       fs.writeFileSync(fileName, data.Body.toString());
//     });
//   };


app.get('/', function (req, res) {
    res.render('index.html');
});


app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/loginAF', function (req, res) {
    let body = req.body;
    console.log(body);

    let sql = 'INSERT INTO user_info values(?,?,?,?)';
    let params = [body.user_name, body.box_number, body.user_email, body.phone_number];
    console.log(sql);
    conn.query(sql, params, function(err) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else res.redirect('/login');
    });
});

app.post('/equalAF', function (req, res) {
  let body = req.body;
  console.log(body);
  let phone=[body.equal_phone];
  let box=[body.equal_box];
  let sql = `select * from user_info where phone_number= ${phone} AND box_number =${box}`;
  console.log(sql);
  range_sql=sql;  //전역변수 할당
  const result= conn.query(sql, function(err, result ,field) {
    if(err) console.log('query is not excuted. 일치실패...\n' + err); //에러
    
    else if(result.length != 0){ 
        res.redirect('/report');  //일치하는 sql 있을경우
     } 
     else { 
        res.write("<script>alert('login faild')</script>");  // 일치하는 sql 없을경우
        res.write("<script>window.location=\"/login\"</script>");
 
         }
     console.log(result.length);

    
  });
});


app.get('/report', function (req, res) {
    let sql = range_sql;    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
          res.render('report', {report : rows});
        };
    });
});


app.listen(3000, () => console.log('Server is running on port 3000...'));