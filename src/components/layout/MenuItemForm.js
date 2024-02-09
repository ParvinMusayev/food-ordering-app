"use client";

import { useState } from "react";
import EditableImage from "./EditableImage";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState([]);

  function addSizes() {
    setSizes((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  }

  function editSize(ev, index, prop){
    const newValue = ev.target.value
    setSizes(prevSizes => {
      const newSizes = [...prevSizes]
      newSizes[index][prop] = newValue
      return newSizes
    })
  }

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
        })
      }
      className="mt-8 max-w-2xl mx-auto "
    >
      <div
        style={{ gridTemplateColumns: ".3fr .7fr" }}
        className="gird items-start gap-4"
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            type="text"
          />
          <label>Description</label>
          <input
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            type="text"
          />
          <label>Base price</label>
          <input
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
            type="text"
          />
          <div className="bg-gray-200 p-2 rounded-md mb-2">
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
                    <button type="button" className="bg-white mb-2">x</button>
                  </div>
                </div>
              ))}
            <button type="button" onClick={addSizes} className="bg-white">
              Add item size
            </button>
          </div>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
