import { create } from "zustand";
import axios from "axios";

type Todo = {
    id: number;
    name: string;
    description: string;
};

type TodoState = {
    data: Todo[];

    getData: () => Promise<void>;
    addData: (todo: Omit<Todo, "id">) => Promise<void>;
    deleteData: (id: number) => Promise<void>;
    editData: (todo: Todo) => Promise<void>;
};

const api = "https://to-dos-api.softclub.tj/api/to-dos";

export const useTodo = create<TodoState>((set, get) => ({
    data: [],

    getData: async () => {
        try {
            const res = await axios.get(api);

            set({
                data: res.data.data,
            });
        } catch (error) {
            console.error(error);
        }
    },

    addData: async (todo) => {
        try {
            await axios.post(api, todo);

            get().getData();
        } catch (error) {
            console.error(error);
        }
    },

    deleteData: async (id) => {
        try {
            await axios.delete(`${api}?id=${id}`);

            get().getData();
        } catch (error) {
            console.error(error);
        }
    },

    editData: async (todo) => {
        try {
            await axios.put(api, todo);

            get().getData();
        } catch (error) {
            console.error(error);
        }
    },
}));