import Login from "./components/Login";
import TodoList from "./components/TodoList";

const routes = [
    {
        'path': '/login',
        'component': Login,
        'type': 'guest',
    },
    {
        'path': '/todo',
        'component': TodoList,
        'type': 'authenticated'
    }
]

export default routes;
