import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import {useState} from "react";

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  return <div className="bg-gray-200 p-2 rounded-md mb-2">
  <label>Sizes</label>
  {sizes?.length > 0 &&
    sizes.map((size, index) => (
      <div className="flex items-end gap-2">
        <div>
          <label>Size name</label>
          <input
            type="text"
            placeholder="Size name"
            value={size.name}
            onChange={(ev) => editSize(ev, index, "name")}
          />
        </div>

        <div>
          <label>Extra price</label>
          <input
            type="text"
            placeholder="Extra price"
            value={size.price}
            onChange={(ev) => editSize(ev, index, "price")}
          />
        </div>
        <div>
          <button
            onClick={() => removeSize(index)}
            type="button"
            className="bg-white mb-2 px-2"
          >
            <Trash />
          </button>
        </div>
      </div>
    ))}
  <button
    type="button"
    onClick={addSizes}
    className="bg-white items-center"
  >
    <Plus className="w-4 h-4" />
    <span>Add item size</span>
  </button>
</div>
}
