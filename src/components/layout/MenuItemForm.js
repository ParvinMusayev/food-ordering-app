"use client";

import { useState } from "react";
import EditableImage from "./EditableImage";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");

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
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
