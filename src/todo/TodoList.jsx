import axios from "axios";
import { useEffect, useState } from "react";

const url =
	"https://api.elchocrud.pro/api/v1/38456a49282bf876e64eb80c81c40eda/todo";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [todosHit, setTodosHit] = useState("");
	const [newTodo, setNewTodo] = useState({
		title: "",
		image: "",
		description: "",
	});
	const [newTodoHit, setNewTodoHit] = useState("");
	const [editingId, setEditingId] = useState("");
	const [editingIdHit, setEditingIdHit] = useState("");

	const handleAdd = async () => {
		const newData = {
			title:todos.title,
			image: newTodo.image,
			description: editingId.description,
		};
		const response = await axios.post(url, newData);
		setTodos(response.data);
		console.log(response.data);
		setNewTodo({
			title: "",
			image: "",
			description: "",
		});
	};

	const getTodos = async () => {
		const response = await axios.get(url);
		setTodos(response.data);
	};

	const deleteTodo = async (id) => {
		const response = await axios.delete(`${url}/${id}`);
		setTodos(response.data);
	};

	const updateTodo = async (id) => {
		const updatedData = {
			title: todosHit.title,
			image: newTodoHit.image,
			description: editingIdHit.description,
		};
		const response = await axios.put(`${url}/${id}`, updatedData);
		setTodos(response.data);
		setEditingId(null);
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div>
			<h1>TodoList</h1>
			<input
				type="text"
				placeholder="title"
				value={newTodo.title}
				onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
			/>
			<input
				type="text"
				placeholder="image"
				value={newTodo.image}
				onChange={(e) => setNewTodo({ ...newTodo, image: e.target.value })}
			/>
			<input
				type="text"
				placeholder="description"
				value={newTodo.description}
				onChange={(e) =>
					setNewTodo({ ...newTodo, description: e.target.value })
				}
			/>
			<button onClick={handleAdd}>ADD</button>

			{todos.map((item) => (
				<div key={item._id}>
					{editingId === item._id ? (
						<>
							<input
								type="text"
								value={todosHit.title}
								onChange={(e) =>
									setTodosHit({ ...todosHit, title: e.target.value })
								}
							/>
							<input
								type="text"
								value={newTodoHit.image}
								onChange={(e) =>
									setNewTodoHit({ ...newTodoHit, image: e.target.value })
								}
							/>
							<input
								type="text"
								value={editingIdHit.description}
								onChange={(e) =>
									setEditingIdHit({
										...editingIdHit,
										description: e.target.value,
									})
								}
							/>
							<button onClick={() => updateTodo(item._id)}>UPDATE</button>
						</>
					) : (
						<>
							<h1>{item.title}</h1>
							<img src={item.image} alt={item.title} />
							<p>{item.description}</p>
							<button onClick={() => deleteTodo(item._id)}>DELETE</button>
							<button onClick={() => setEditingId(item._id)}>EDIT</button>
						</>
					)}
				</div>
			))}
		</div>
	);
};

export default TodoList;
