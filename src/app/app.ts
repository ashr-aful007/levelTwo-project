import { error } from 'console'
import express, {NextFunction, Request, Response} from 'express'
const app = express()
const cors = require('cors')

//parsers 
app.use(express.json())
app.use(express.text())
app.use(cors())


//route instance 
const userRouter = express.Router()
const courseRouter = express.Router()

//route 
app.use('/api/v1/users',userRouter)
app.use('/api/v1/course',courseRouter)


//

userRouter.post('/create-user', (req:Request, res:Response) =>{
  const user = req.body;
  console.log(user);

  res.json({
    success: true,
    data: user
  })
})

//course router
courseRouter.post("/create-course", (req:Request, res:Response) =>{

  const course = req.body;
  console.log(course);

  res.json({
    success: true,
    data: course
  })
})

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!')
// })

const logger = (req:Request, res:Response, next: NextFunction) =>{
  console.log(req.url, req.method, req.hostname);
  next()
}

app.post('/test', (req: Request, res: Response) =>{
  console.log(req.body);
  res.send('Hello World!')
})

//dynamicId and params
app.get('/:userId', (req:Request, res:Response) =>{
  console.log(req.params.userId);
   res.send('dynamic route')
})

//Quary parm //http://localhost:5001?email=mezba@gmail.com&name=rafi
app.get('/',logger, (req:Request, res:Response) =>{
   console.log(req.query.email);
   res.send('dynamic route')
})


//route error handle
app.all("*", (req:Request, res: Response) =>{
    res.status(400).json({
      success: false,
      message: "Route is not found",
    })
})

//global error handler 
app.use((error:any, req:Request, res:Response, next: NextFunction) =>{
    console.log(error);
})












export default app;