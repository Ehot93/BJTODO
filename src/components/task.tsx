import { Pagination, Table } from 'react-bootstrap';
import { taskStore } from '../store';
import { observer } from 'mobx-react-lite';

const TaskTable = observer(() => {
    const isAdmin = false;
    const taskList = taskStore.getTasks();

    let active = 1;
    let items = [];
    for (let number = 1; number <= taskList.length; number++) {
        items.push(
          <Pagination.Item key={number} active={number === active}>
            {number}
          </Pagination.Item>,
        );
      }

        if(!!taskList.length) {
            return (
                <>
                <Table striped bordered hover>
            <thead>
                <tr>
                <th>Пользователь</th>
                <th>Почта</th>
                <th>Описание</th>
                <th>Готово</th>
                </tr>    
            </thead>
            <tbody>
                {taskStore.getTasks().map((task, index, array) => {

                    return (
                        <tr>
                            <td>{task.username}</td>
                            <td>{task.email}</td>
                            <td>{task.text}</td>
                            {isAdmin ? <td>{task.isDone}</td>: ''}
                        </tr>
                )})
                }
            </tbody>
            
        </Table>
        <Pagination>{items}</Pagination>
        </>
            )
        } else {
            return <>'Loading'</>
        }    
});

export default TaskTable;