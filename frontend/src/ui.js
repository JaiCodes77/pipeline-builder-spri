import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { createNodeData, nodeTypes } from './nodes/nodeRegistry';

import 'reactflow/dist/style.css';

const gridSize = 20;
const snapGrid = [gridSize, gridSize];
const proOptions = { hideAttribution: true };
const miniMapStyle = { background: '#0f172a' };

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const getNodeID = useStore((state) => state.getNodeID);
  const addNode = useStore((state) => state.addNode);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const rawData = event?.dataTransfer?.getData('application/reactflow');

      if (!rawData || !reactFlowBounds || !reactFlowInstance) {
        return;
      }

      const appData = JSON.parse(rawData);
      const type = appData?.nodeType;

      if (!type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      addNode({
        id: nodeID,
        type,
        position,
        data: createNodeData(type, nodeID),
      });
    },
    [addNode, getNodeID, reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="pipeline-canvas" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={snapGrid}
        connectionLineType="smoothstep"
        fitView
      >
        <Background color="#334155" gap={gridSize} />
        <Controls />
        <MiniMap pannable zoomable style={miniMapStyle} />
      </ReactFlow>
    </div>
  );
};
