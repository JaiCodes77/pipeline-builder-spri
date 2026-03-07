export const DraggableNode = ({ type, label, category, accent }) => {
  const onDragStart = (event, nodeType) => {
    event.currentTarget.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="toolbar-node"
      style={{ '--node-accent': accent }}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => {
        event.currentTarget.style.cursor = 'grab';
      }}
      draggable
    >
      <span className="toolbar-node-category">{category}</span>
      <strong>{label}</strong>
    </div>
  );
};