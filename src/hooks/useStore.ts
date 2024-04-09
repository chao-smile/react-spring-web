import { create } from "zustand";
import { createSelectors } from "@/utils";

export type Filter = "all" | "completed" | "incompleted";

export type ToDo = {
  title: string;
  completed: boolean;
  id: string;
};

export type StorePropsType = {
  filter: Filter;
  todos: ToDo[];
  setFilter: (filter: Filter) => void;
  setTodos: (fn: (todos: ToDo[]) => ToDo[]) => void;
};

export const useStoreBase = create<StorePropsType>((set) => ({
  filter: "all",
  todos: [],
  setFilter(filter) {
    set({ filter });
  },
  setTodos(fn) {
    set((prev) => ({ todos: fn(prev.todos) }));
  },
}));

export const useStore = createSelectors(useStoreBase);

// 替换使用 createSelectors 函数
// 避免每个地方使用 const todos = useStore((state) => state.todos) 的复杂方式去处理 re-render
// 新获取
// const todos = useStore.use.todos()
// const setTodos = useStore.use.setTodos()

// 对于深层结构的数据，可以使用 immer.js 来处理，避免复杂嵌套
// 示例
// const useStore = create((set) => ({
//     nestedObject,
//     updateState() {
//       set(prevState => ({
//         nestedObject: {
//           ...prevState.nestedObject,
//           deep: {
//             ...prevState.nestedObject.deep,
//             nested: {
//               ...prevState.nestedObject.deep.nested,
//               obj: {
//                 ...prevState.nestedObject.deep.nested.obj,
//                 count: ++prevState.nestedObject.deep.nested.obj.count,
//               },
//             },
//           },
//         },
//       }));
//     },
//   }));
// 优化
// import { produce } from 'immer'
// const useStore = create((set) => ({
//   nestedObject,
//   updateState() {
//     set(produce(state => {
//       ++state.nestedObject.deep.nested.obj.count;
//     });
//   },
// }));
