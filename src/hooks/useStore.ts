import { create } from "zustand";

export type Filter = "all" | "completed" | "incompleted";

export type ToDo = {
  title: string;
  completed: boolean;
  id: number;
};

export type StorePropsType = {
  filter: Filter;
  todos: ToDo[];
  setFilter: (filter: Filter) => void;
  setTodos: (fn: (todos: ToDo[]) => ToDo[]) => void;
};

export const useStore = create<StorePropsType>((set) => ({
  filter: "all",
  todos: [],
  setFilter(filter) {
    set({ filter });
  },
  setTodos(fn) {
    set((prev) => ({ todos: fn(prev.todos) }));
  },
}));
