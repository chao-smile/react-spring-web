import { useStore } from "@/hooks";

const NestedObjectTest = () => {
  const updateNestedObject = useStore.use.updateNestedObject();
  const nestedObject = useStore.use.nestedObject();
  console.info("nestedObject:触发");
  return (
    <div>
      <div>
        deep{`=>`}count:{nestedObject.deep.nested.obj.count}
      </div>
      <div>nestedObject:{JSON.stringify(nestedObject)}</div>
      <button onClick={updateNestedObject}>add nestedObject</button>
    </div>
  );
};

export default NestedObjectTest;
