
const express = require('express');
const bodyParser = require('body-parser');
import Rest from '../src/controller';

const app = express();
const PORT = 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

export default async function(){
  return new Promise((resolve, reject)=>{
    const server = app.listen(PORT, () => {
      const host = server.address().address;
      const port = server.address().port;
      console.log(`express server listening at http://${host}:${port}`);
      resolve(app);
    });
  });
};
