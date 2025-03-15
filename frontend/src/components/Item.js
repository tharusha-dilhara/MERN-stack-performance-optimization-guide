import React, { useState } from 'react';

const Item = ({ key, name, description, onUpdateDelete , iid }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDesc, setEditedDesc] = useState(description);

  const handleUpdate = async () => {
    console.log('Updating item:', iid);
    try {
      const response = await fetch(`/api/items/${iid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editedName,
          description: editedDesc
        })
      });
      if (!response.ok) throw new Error('Update failed');
      setEditMode(false);
      onUpdateDelete(); // Refresh parent component's results
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDelete = async () => {
    console.log('Deleting item:', iid);
    if (!window.confirm('Delete this item?')) return;
    try {
      const response = await fetch(`/api/items/${iid}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Delete failed');
      onUpdateDelete(); // Refresh parent component's results
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  console.log('Rendering Item component:');
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      {editMode ? (
        <div>
          <input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            value={editedDesc}
            onChange={(e) => setEditedDesc(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{iid}</p>
          <h3>{name}</h3>
          <p>{description}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Item;