import { DraggableNode } from './draggableNode';
import { toolbarNodes } from './nodes/nodeRegistry';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar-card">
      <div className="toolbar-copy">
        <p className="section-kicker">Node Library</p>
        <h2>Build pipelines by dragging nodes onto the canvas.</h2>
        <p>
          The shared abstraction now powers every node here, including five extra demo
          nodes.
        </p>
      </div>

      <div className="toolbar-grid">
        {toolbarNodes.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            category={node.category}
            accent={node.accent}
          />
        ))}
      </div>
    </div>
  );
};
