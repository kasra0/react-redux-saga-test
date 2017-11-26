import  express  from 'express'
const port = 3001;
const app =  express();
 
app.get('/equipments/*', function (req, res) {
    console.log(req.originalUrl)
    let result =  {a: 1}
    console.log(result)
    res
    .status(200)
    .json(result)

})
 
app.listen(port,()=>{console.log(`server is listening on port ${port} `)})
