const fs = require('fs');
const http = require('http');
const url = require('url');
const replacetemplate = require('./moduleJs/replacetemplate');

// synchronous way ==> Blocking way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log (textIn);
// const textOut=`this is what we know about avocade: ${textIn}.\n create on ${Date.now()}`;
// fs.writeFileSync ('./txt/output.txt',textOut);
// console.log ('file written') ;
// asynchronous way ==> Best solution to avoid problems for users when they use the app
// fs.readFile('./txt/start.txt', 'utf-8', (err,data1)=>{
//     if (err) return console.log ('Error!!!');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err,data2)=>{
//     console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err,data3)=>{
//         console.log(data3);

//             fs.readFile(`./txt/final.txt`, 'utf-8', (err,data)=>{
//             console.log(data);

//                 fs.writeFile('./txt/final.txt', ` ${data2}\n ${data3}` , 'utf-8' , err=>{
//                     console.log ('the file has been written');
//                 });
//             });
//         });
//     });
// });
// console.log (`this line appear in ${Date.now()}`);
///////////////////////////////////////////////////
// Server

const tempOveriew = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  //Overview

  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardhtml = dataObj
      .map((el) => replacetemplate(tempCard, el))
      .join('');
    const output = tempOveriew.replace('{%card%}', cardhtml);
    res.end(output);
  }

  //Product
  else if (pathname === '/product') {
    const product = dataObj[query.id];
    const output = replacetemplate(tempProduct, product);
    res.end(output);
  }

  //API
  else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  }
  //Not found
  else {
    res.writeHead(404, {
      'content-type': 'text/html',
    });
    res.end('<h1>not found !</h1> ');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('the server is running ');
});
