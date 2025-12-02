import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const new_query = query(
        collection(db, "items"), 
        orderBy("name"),
        limit(5))

      const snapshot = ((await getDocs(new_query)));
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(docs);
    };

    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (newItem.trim() === "") return;

    const docRef = await addDoc(collection(db, "items"), {
      name: newItem
    });

    setItems(prev => [...prev, { id: docRef.id, name: newItem }]);

    setNewItem("");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "items", id));

    setItems(prev => prev.filter(item => item.id !== id));
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditText(item.name);
  };

  const handleSaveEdit = async (id) => {
    await updateDoc(doc(db, "items", id), {
      name: editText
    });

    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, name: editText } : item
      )
    );

    setEditingId(null);
    setEditText("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Firebase Foods</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter a food name"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Food</button>
      </div>

      <ul>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: "10px" }}>
            {editingId === item.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(item.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {item.name}
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => startEditing(item)}
                >
                  Edit
                </button>
                <button
                  style={{ marginLeft: "5px", color: "red" }}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;