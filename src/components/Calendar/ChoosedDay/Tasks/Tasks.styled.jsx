import styled from '@emotion/styled';
import { desktop, min, tablet } from 'styles/media';

export const ContainerListTasks = styled.div`
  max-height: 280px;
  overflow-y: auto;
  width: 103%;
  ${min(tablet)} {
    max-height: 406px;
  }
  ${min(desktop)} {
    max-height: 424px;
    width: 105%;
  }
  /* width*/
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: var(--task-scrollbar-track);
    border-radius: 12px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--task-scrollbar-thumb);
    border-radius: 12px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: var(--task-scrollbar-thumb-hover);
  }
`;

export const ListTasks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 13px;
  width: 291px;
  ${min(tablet)} {
    width: 299px;
    gap: 18px;
    margin-bottom: 17px;
  }
  ${min(desktop)} {
    width: 281px;
  }
`;

export const Task = styled.li`
  background-color: var(--page-bg-color);
  padding: 14px 14px 18px 14px;
  border: 1px solid var(--calendar-grid-border);

  border-radius: 8px;
`;

export const TaskTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: var(--primary-text-color);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 28px;
`;

export const ContainerButtonsTask = styled.div`
  display: flex;
  align-items: end;
`;

export const TaskImage = styled.img`
  width: 32px;
  height: 32px;
  border: 1.8px solid var(--accent-color);
  border-radius: 50%;
  margin-right: 8px;
`;
export const TaskImagePlug = styled.svg`
  width: 32px;
  height: 32px;
  border: 1.8px solid var(--accent-color);
  border-radius: 50%;
  margin-right: 8px;
  fill: #3e85f32e;
  .dark & {
    fill: #ffffff2e;
  }
`;

export const TaskButtonPriority = styled.button`
  height: 20px;
  font-size: 10px;
  font-weight: 600;
  line-height: 12px;
  color: var(--task-priority-color);
  padding: 4px 12px;
  background-color: ${({ priority }) => {
    switch (priority) {
      case 'low':
        return 'var(--task-priority-low-bg)';
      case 'medium':
        return 'var(--task-priority-medium-bg)';
      case 'high':
        return 'var(--task-priority-high-bg)';

      default:
        return;
    }
  }};
  border: none;
  border-radius: 4px;
`;

export const ContainerIcons = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;

export const IconTask = styled.svg`
  height: 14px;
  width: 14px;
  stroke: var(--primary-text-color);
  cursor: pointer;
  & use {
    fill: transparent;
  }
  ${min(tablet)} {
    height: 16px;
    width: 16px;
  }
`;
