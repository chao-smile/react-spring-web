import { create } from "zustand";
import { createSelectors } from "@/utils";
import { produce } from "immer";

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

  testLoading: boolean;
  testData: ToDo[];
  fetchTest: () => Promise<void>;

  nestedObject: {
    deep: {
      nested: {
        obj: {
          count: number;
        };
      };
    };
  };
  updateNestedObject: () => void;

  without: number;
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

  testLoading: false,
  testData: [],
  fetchTest: async () => {
    try {
      set({ testLoading: true });
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      const testData = await res.json();
      set({ testLoading: false });
      set({ testData });
    } catch {
      set({ testLoading: false });
    }
  },

  nestedObject: {
    deep: {
      nested: {
        obj: {
          count: 0,
        },
      },
    },
  },
  updateNestedObject() {
    set(
      produce((state) => {
        ++state.nestedObject.deep.nested.obj.count;
      }),
    );
  },

  // 在存储外部的模块级别定义操作
  without: 0,
}));

export const setWithout = () => useStoreBase.setState((state) => ({ without: state.without + 1 }));

export const useStore = createSelectors(useStoreBase);

// 替换使用 createSelectors 函数
// 避免每个地方使用 const todos = useStore((state) => state.todos) 的复杂方式去处理 re-render
// 新获取
// const todos = useStore.use.todos()
// const setTodos = useStore.use.setTodos()

// 对于 re-render 问题，官方还推荐了一种方式，便是使用 useShallow 官方主推，但写着不如 createSelectors 方便

// 在存储外部的模块级别定义操作 => 有助于代码拆分 使用 create 实例以及 setState 实现
// export const useBoundStore = create(() => ({
//   count: 0,
//   text: 'hello',
// }))

// export const inc = () =>
//   useBoundStore.setState((state) => ({ count: state.count + 1 }))

// export const setText = (text) => useBoundStore.setState({ text })

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
