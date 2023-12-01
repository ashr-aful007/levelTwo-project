"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require('cors');
//parsers 
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(cors());
//route instance 
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
//route 
app.use('/api/v1/users', userRouter);
app.use('/api/v1/course', courseRouter);
//
userRouter.post('/create-user', (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        data: user
    });
});
//course router
courseRouter.post("/create-course", (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        data: course
    });
});
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!')
// })
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
app.post('/test', (req, res) => {
    console.log(req.body);
    res.send('Hello World!');
});
//dynamicId and params
app.get('/:userId', (req, res) => {
    console.log(req.params.userId);
    res.send('dynamic route');
});
//Quary parm //http://localhost:5001?email=mezba@gmail.com&name=rafi
app.get('/', logger, (req, res) => {
    console.log(req.query.email);
    res.send('dynamic route');
});
//route error handle
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Route is not found",
    });
});
//global error handler 
app.use((error, req, res, next) => {
    console.log(error);
});
exports.default = app;
