const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList= ['http://localhost:' + port,'https://secret-hamlet-90407.herokuapp.com/'];
const options = {
  origin: (origin, callback) =>{
    if (whiteList.includes(origin) || !origin){
      callback(null, true)
    }
    else{
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});
