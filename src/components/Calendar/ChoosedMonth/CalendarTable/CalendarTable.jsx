import moment from 'moment';
import { CalendarGrid, Cell, Day, WrapperDay } from './CalendarTable.styled';
import { TaskList } from '../TaskList/TaskList';
import { setDay } from 'helpers/setDay';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchTasksOperation } from 'redux/tasks/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsUpdating } from 'redux/tasks/selectors';

export const CalendarTable = () => {
  const { currentMonth } = useParams();
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const date = moment(`${currentMonth}-01`, 'YYYY-MM-DD');
  const { startMonth, endMonth, weeks, daysArray } = setDay(date);
  const isCurrentDay = day => moment().isSame(day, 'day');
  const editTask = useSelector(selectIsUpdating);

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(fetchTasksOperation(currentMonth));
      setTasks(payload);
    })();
  }, [currentMonth, dispatch, editTask]);

  const handleNavigateToDay = date => {
    const day = moment(date).format('YYYY-MM-DD');
    localStorage.setItem('type', 'day');
    localStorage.setItem('date', day);
    navigate(`/calendar/day/${day}`);
  };

  return (
    <CalendarGrid rows={weeks}>
      {daysArray.map((dayItem, idx) => (
        <Cell key={idx}>
          <WrapperDay
            onClick={() => handleNavigateToDay(dayItem)}
            // to={`/calendar/day/${moment(dayItem).format('YYYY-MM-DD')}`}
          >
            <Day
              color={`${
                isCurrentDay(dayItem)
                  ? '#FFFFFF'
                  : `${
                      startMonth > dayItem || endMonth < dayItem
                        ? 'transparent'
                        : 'var(--date-color)'
                    }`
              }`}
              background={`${
                isCurrentDay(dayItem) ? 'var(--accent-color)' : 'transparent'
              }`}
            >
              {dayItem.format('D')}
            </Day>
          </WrapperDay>
          {startMonth < dayItem && endMonth > dayItem && (
            <TaskList currentDate={dayItem} tasks={tasks} />
          )}
        </Cell>
      ))}
    </CalendarGrid>
  );
};
