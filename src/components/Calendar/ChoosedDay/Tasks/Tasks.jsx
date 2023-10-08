import React, { useState } from 'react';
import {
  ContainerButtonsTask,
  ContainerIcons,
  IconTask,
  ListTasks,
  Task,
  TaskButtonPriority,
  TaskContainer,
  TaskImage,
  TaskImagePlug,
  TaskTitle,
} from './Tasks.styled';
import PopUpReplace from '../PopUpReplace/PopUpReplace';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskOperation } from 'redux/tasks/operations';

import sprite from '../../../../assets/images/icons/icons.svg';
import { selectUserAvatar } from 'redux/auth/selectors';
import { Notify } from 'notiflix';
import { TaskModal } from 'components/TaskModal/TaskModal';

const Tasks = ({ type, tasks, setTasks }) => {
  const dispatch = useDispatch();
  const [isShowPopUpReplace, setIsShowPopUpReplace] = useState(false);
  const avatarURL = useSelector(selectUserAvatar);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskForForm, setTaskForForm] = useState({});

  const toggleShowPopUpReplace = id => {
    isShowPopUpReplace === id
      ? setIsShowPopUpReplace(false)
      : setIsShowPopUpReplace(id);
  };

  const onEdit = task => {
    setTaskForForm(task);
    setIsFormOpen(true);
  };

  const onDelete = async taskId => {
    const response = await dispatch(deleteTaskOperation(taskId));
    if (response.payload.status) {
      Notify.failure('Task don`t delete. Try again');
      return;
    }
    const filteredTasks = tasks
      ? tasks.filter(({ _id }) => _id !== taskId)
      : [];
    setTasks(filteredTasks);
    Notify.success('Task deleted successfully');
  };

  const closeForm = () => {
    setTaskForForm({});
    setIsFormOpen(false);
  };

  return (
    <ListTasks>
      {tasks.map(task => {
        const { _id, title, priority, category } = task;
        if (type !== category) {
          return '';
        }
        return (
          <TaskContainer>
            <Task key={_id}>
              <TaskTitle>{title}</TaskTitle>
              <ContainerButtonsTask>
                {avatarURL ? (
                  <TaskImage src={avatarURL} alt="User avatar" />
                ) : (
                  <TaskImagePlug>
                    <use href={`${sprite}#icon-ph_user`}></use>
                  </TaskImagePlug>
                )}
                <TaskButtonPriority priority={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </TaskButtonPriority>
                <ContainerIcons>
                  <IconTask
                    id="togglePopUp"
                    onClick={() => toggleShowPopUpReplace(_id)}
                  >
                    <use
                      id="togglePopUp"
                      xlinkHref={sprite + '#icon-arrow-circle-broken-right'}
                    />
                  </IconTask>
                  <IconTask onClick={() => onEdit(task)}>
                    <use xlinkHref={sprite + '#icon-pencil'} />
                  </IconTask>
                  <IconTask onClick={() => onDelete(_id)}>
                    <use xlinkHref={sprite + '#icon-trash'} />
                  </IconTask>
                </ContainerIcons>
              </ContainerButtonsTask>
              {isFormOpen && (
                <TaskModal
                  isOpen={isFormOpen}
                  onClose={closeForm}
                  category={category}
                  task={taskForForm}
                />
              )}
            </Task>
            {isShowPopUpReplace === _id && (
              <PopUpReplace
                type={type}
                tasks={tasks}
                setTasks={setTasks}
                setIsShowPopUpReplace={setIsShowPopUpReplace}
                _id={_id}
              ></PopUpReplace>
            )}
          </TaskContainer>
        );
      })}
    </ListTasks>
  );
};

export default Tasks;
