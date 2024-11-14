'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

type FilterStatus = 'All' | 'Pending' | 'Completed';

interface TaskFilterContextType {
  filter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
  taskData: {
    completed: number;
    pending: number;
    all: number;
  };
  setTaskData: (data: { completed: number; pending: number; all: number }) => void;
}

const TaskFilterContext = createContext<TaskFilterContextType | undefined>(undefined);

export const TaskFilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<FilterStatus>('All'); 
  const [taskData, setTaskData] = useState({
    completed: 0,
    pending: 0,
    all: 0,
  });
  return (
    <TaskFilterContext.Provider value={{ filter, setFilter, taskData, setTaskData }}>
      {children}
    </TaskFilterContext.Provider>
  );
};

export const useTaskFilter = () => {
  const context = useContext(TaskFilterContext);
  if (!context) {
    throw new Error('useTaskFilter must be used within a TaskFilterProvider');
  }
  return context;
};
