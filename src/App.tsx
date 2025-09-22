import { useEffect, useState } from 'react';
import { createTask, getTasks, requestLogin } from './api';
import TaskTable from './components/task';
import { taskStore } from './store';
import { Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const [showCreateTask, setShowCreateTask] = useState(false);
  const [user, setUser] = useState('');
  const [mail, setMail] = useState('');
  const [text, setText] = useState('');

  const createHandler = () => {
     createTask({username: user, id: Math.floor(Math.random()*1000).toString(), email: mail, text: text, isDone: false})
     setShowCreateTask(!showCreateTask);
     getTasks().then(tasks => {
      taskStore.setTasks(tasks);
    });
  }

  const loginHandler = () => {
    requestLogin({username: login, password: pass}).then(result => taskStore.setRole(result.user));
    setShow(!show);
  }

  useEffect(() => {
    getTasks().then(tasks => {
      taskStore.setTasks(tasks);
    });
  }, []);

  return (
    <div style={{padding: 16}}>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Button variant="primary" onClick={()=>setShowCreateTask(!showCreateTask)}>Создать задачу</Button>
        <Button variant="primary" onClick={()=>setShow(!show)}>Логин</Button>
      </div>

    <div style={{marginTop: 16}}>
      <TaskTable/>
    </div>
    <Modal show={showCreateTask} onHide={()=>setShowCreateTask(!showCreateTask)} style={{border: '3px solid #bbb'}}>
        <Modal.Header>
          <Modal.Title>Новая задача</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{flex: '1 1'}}>
          <Form.Label htmlFor="login">Пользователь</Form.Label>
          <Form.Control
            type="text"
            id="user"
            value={user}
            onChange={(e)=>setUser(e.currentTarget.value)}
          />
          <Form.Label htmlFor="password">Почта</Form.Label>
          <Form.Control
            type="text"
            id="mail"
            value={mail}
            onChange={(e)=>setMail(e.currentTarget.value)}
          />
          <Form.Label htmlFor="password">Описание</Form.Label>
          <Form.Control
            type="text"
            id="text"
            value={text}
            onChange={(e)=>setText(e.currentTarget.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowCreateTask(!showCreateTask)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={()=>createHandler()}>
            Отправить
          </Button>
        </Modal.Footer>
      </Modal>

    <Modal show={show} onHide={()=>setShow(!show)} style={{border: '3px solid #bbb'}}>
        <Modal.Header>
          <Modal.Title>Авторизация</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{flex: '1 1 auto'}}>
          <Form.Label htmlFor="login">Логин</Form.Label>
          <Form.Control
            type="text"
            id="login"
            value={login}
            onChange={(e)=>setLogin(e.currentTarget.value)}
          />
          <Form.Label htmlFor="password">Пароль</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={pass}
            onChange={(e)=>setPass(e.currentTarget.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShow(!show)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={()=>loginHandler()}>
            Отправить
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  );
}

export default App;
