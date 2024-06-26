import { Radio } from "antd";
import { useStore } from "@/hooks";

const Filter = () => {
  const filter = useStore.use.filter();
  const setFilter = useStore.use.setFilter();
  return (
    <Radio.Group onChange={(e) => setFilter(e.target.value)} value={filter}>
      <Radio value="all">All</Radio>
      <Radio value="completed">Completed</Radio>
      <Radio value="incompleted">Incompleted</Radio>
    </Radio.Group>
  );
};

export default Filter;
