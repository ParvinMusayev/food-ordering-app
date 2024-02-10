import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <label>{name}</label>
      {props?.length > 0 &&
        props.map((size, index) => (
          <div className="flex items-end gap-2">
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Size name"
                value={size.name}
                onChange={(ev) => editProp(ev, index, "name")}
              />
            </div>

            <div>
              <label>Extra price</label>
              <input
                type="text"
                placeholder="Extra price"
                value={size.price}
                onChange={(ev) => editProp(ev, index, "price")}
              />
            </div>
            <div>
              <button
                onClick={() => removeProp(index)}
                type="button"
                className="bg-white mb-2 px-2"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      <button type="button" onClick={addProp} className="bg-white items-center">
        <Plus className="w-4 h-4" />
        <span>{addLabel}</span>
      </button>
    </div>
  );
}
