import { useMemo, useState } from 'react';
import { Pagination, Table } from 'react-bootstrap';
import { taskStore } from '../store';
import { observer } from 'mobx-react-lite';

const TaskTable = observer(() => {
    const taskList = taskStore.getTasks();
    const [sortKey, setSortKey] = useState<'username' | 'email' | 'isDone'>('username');
    const [sortAsc, setSortAsc] = useState(true);
    const items = [];

    const toggleSort = (key: 'username' | 'email' | 'isDone') => {
        if (key === sortKey) {
            setSortAsc(!sortAsc);
        } else {
            setSortKey(key);
            setSortAsc(true);
        }
    };

    const sortedTasks = useMemo(() => {
        return [...taskList].sort((a, b) => {
            let compare = 0;
            if (sortKey === 'username') {
                compare = a.username.localeCompare(b.username);
            } else if (sortKey === 'email') {
                compare = a.email.localeCompare(b.email);
            } else if (sortKey === 'isDone') {
                compare = Number(a.isDone) - Number(b.isDone);
            }
            return sortAsc ? compare : -compare;
        });
    }, [taskList, sortKey, sortAsc]);

    const pageSize = 3;
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(sortedTasks.length / pageSize));

    const pagedTasks = useMemo(() => {
        const start = (page - 1) * pageSize;
        return sortedTasks.slice(start, start + pageSize);
    }, [sortedTasks, page]);

    for (let number = 1; number <= totalPages; number++) {
        items.push(
          <Pagination.Item key={number} active={number === page} onClick={() => setPage(number)}>
            {number}
          </Pagination.Item>,
        );
    }

      const isAdmin = taskStore.getRole() === 'ADMIN';

    if(!!taskList.length) {
        return (
            <>
            <Table striped bordered hover>
        <thead>
            <tr>
            <th onClick={() => toggleSort('username')}>Пользователь {sortKey === 'username' ? (sortAsc ? '↑' : '↓') : '⇅'}</th>
            <th onClick={() => toggleSort('email')}>Почта {sortKey === 'email' ? (sortAsc ? '↑' : '↓') : '⇅'}</th>
            <th>Описание</th>
            {isAdmin && (
              <th onClick={() => toggleSort('isDone')}>Готово {sortKey === 'isDone' ? (sortAsc ? '↑' : '↓') : '⇅'}</th>
            )}
            </tr>    
        </thead>
        <tbody>
            {pagedTasks.map((task, index, array) => {

                return (
                    <tr key={task.username + index}>
                        <td>{task.username}</td>
                        <td>{task.email}</td>
                        <td>{task.text}</td>
                        {isAdmin && <td>{task.isDone ? '+' : '-'}</td>}
                    </tr>
            )})
            }
        </tbody>
        
    </Table>
    <Pagination>
      <Pagination.Prev disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} />
      {items}
      <Pagination.Next disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} />
    </Pagination>
    </>
        )
    } else {
        return <>'Loading'</>
    }    
});

export default TaskTable;