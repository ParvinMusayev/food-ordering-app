import EditableImage from "./EditableImage";

export default function MenuItemForm() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");

  return (
    <form onSubmit={handleFormSubmit} className="mt-8 max-w-2xl mx-auto ">
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
