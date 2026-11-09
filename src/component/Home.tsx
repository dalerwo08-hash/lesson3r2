import { useEffect, useState } from "react";
import { useTodo } from "../store/todo";

const Home = () => {
    const {
        data,
        getData,
        deleteData,
        addData,
        editData,
    } = useTodo();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        getData();
    }, []);

    const handleAdd = async () => {
        if (!name || !description) return;

        await addData({
            name,
            description,
        });

        setName("");
        setDescription("");
    };

    const handleEdit = async () => {
        if (editId === null) return;

        await editData({
            id: editId,
            name,
            description,
        });

        setName("");
        setDescription("");
        setEditId(null);
    };

    const startEdit = (todo: {
        id: number;
        name: string;
        description: string;
    }) => {
        setEditId(todo.id);
        setName(todo.name);
        setDescription(todo.description);
    };

    const cancelEdit = () => {
        setEditId(null);
        setName("");
        setDescription("");
    };

    return (
        <div>

            <div>
                <input
                    type="text"
                    placeholder="Todo name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {editId === null ? (
                    <button onClick={handleAdd}>
                        Add Todo
                    </button>
                ) : (
                    <>
                        <button onClick={handleEdit}>
                            Edit Todo
                        </button>

                        <button onClick={cancelEdit}>
                            Cancel
                        </button>
                    </>
                )}
            </div>

            {data.map((e) => (
                <div key={e.id}>
                    <h2>{e.name}</h2>
                    <p>{e.description}</p>

                    <button onClick={() => startEdit(e)}>
                        Edit
                    </button>

                    <button onClick={() => deleteData(e.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Home;