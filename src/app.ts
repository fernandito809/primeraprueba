import express, {Request, Response} from 'express';
const app = express();
const port = 3000;

//middleware 
app.use(express.json());

type User = {
    id: number,
    username: string,
    fullname: string
}

const users: User[] = [
    {id: 1, username: 'facosta', fullname: 'Fernando Acosta'},
    {id: 2, username: 'fmelena', fullname: 'Fernando Melena'},
    {id: 3, username: 'ftiburcio', fullname: 'Fernando Tiburcio'},
    {id: 4, username: 'fperez', fullname: 'Fernando Perez'},
    {id: 5, username: 'fmanteca', fullname: 'Fernando Manteca'},
    {id: 6, username: 'fcerda', fullname: 'Fernando Cerda'},
]

app.get('/', (req, res) => {
    res.send('<h1>Primera Api</h1>');
})

let id_secuence = users.length;

app.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

app.get('/users/:username', (req: Request, res: Response) => {
    
    const user = users.find( (u:User) => u.username === req.params.username);

    if(!user) {
        return res.status(404).json({
            statusCode: 404,
            statusValue: 'Not Found',
            Message: `The user with the username ${req.params.username} was not found, sorry.` 
        })
    }
    res.json(user);
});

app.post('/users', (request: Request, response: Response) => {
    const {id, username, fullname} = request.body;
    
    const newUser = {
        id: id_secuence,
        username,
        fullname
    }
    id_secuence++;
    users.push(newUser);
    response.status(400).json(users);
})

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});