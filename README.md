# Pipeline Builder

## What this project is

This project is a small visual pipeline builder.

It lets a user drag different kinds of nodes onto a canvas, connect them together, and build a simple workflow. After building the workflow, the user can click **Submit Pipeline** to send the pipeline to the backend.

The backend does a basic check on the pipeline and returns:

- how many nodes are in it
- how many connections are in it
- whether the pipeline is a valid DAG (Directed Acyclic Graph)

In simple terms, a **DAG** means the flow does not loop back into itself.

## What purpose it serves

This project looks like a demo or assessment project that shows three main ideas:

- how to build a node-based editor in React using `reactflow`
- how to create reusable node components instead of writing every node from scratch
- how to send the pipeline structure to a backend for validation

It is important to know that this project is **not** a full workflow engine.
It does not actually execute the pipeline logic.
It mainly helps users **design** a pipeline visually and then **analyze** its structure.

## How the app works

Here is the flow in simple language:

1. The left sidebar shows available node types like Input, Text, LLM, Output, API, Database, and Condition.
2. The user drags a node onto the canvas.
3. The frontend creates a new node object and stores it in app state.
4. The user connects nodes with edges.
5. The frontend stores those edges too.
6. When the user clicks **Submit Pipeline**, the frontend sends the `nodes` and `edges` to the backend.
7. The backend counts them and checks whether the graph has a cycle.
8. The result is shown back to the user in an alert box.

## Project structure

The project has two main parts:

### `frontend/`

This is the user interface.

- `src/App.js`
  The main page layout. It brings together the toolbar, canvas, and submit button.
- `src/ui.js`
  The React Flow canvas. This is where drag-and-drop, connecting nodes, and rendering the graph happen.
- `src/toolbar.js`
  The left sidebar that shows the available node types.
- `src/draggableNode.js`
  The draggable card used in the toolbar.
- `src/store.js`
  Global app state using `zustand`. It stores nodes, edges, and helper functions for updating them.
- `src/submit.js`
  Sends the pipeline to the backend and shows the response.
- `src/nodes/`
  The most important folder if you want to understand or extend the pipeline system.

### `backend/`

This is the API layer.

- `main.py`
  Defines the FastAPI app, allows frontend requests with CORS, accepts pipeline data, and checks whether the graph is a DAG.

## Best way to navigate the project

If you are new to the codebase, follow this order:

1. Start with `frontend/src/App.js`
   This shows the main screen layout.
2. Open `frontend/src/toolbar.js`
   This explains where the draggable node list comes from.
3. Open `frontend/src/ui.js`
   This is the heart of the frontend. It handles dropping nodes onto the canvas and rendering the graph.
4. Open `frontend/src/store.js`
   This shows how nodes and edges are stored and updated.
5. Open `frontend/src/submit.js`
   This shows how the frontend talks to the backend.
6. Open `backend/main.py`
   This shows what the backend actually does with the submitted pipeline.
7. Then explore `frontend/src/nodes/`
   This is where the reusable node system lives.

## Understanding the `nodes/` folder

This folder is the key to the project design.

### Core idea

Instead of building each node completely from scratch, the project uses a reusable pattern:

- `BaseNode.js`
  The shared visual shell for nodes. It handles the common layout and connection handles.
- `nodeFactory.js`
  A helper that creates configurable node components from a shared pattern.
- `nodeRegistry.js`
  The central registry of all node types. It defines:
  - which node types exist
  - which React component each type uses
  - what default data each node starts with
  - what appears in the toolbar

Then each file like `inputNode.js`, `textNode.js`, `llmNode.js`, or `outputNode.js` defines a specific node.

### Special node to notice

`textNode.js` is especially interesting because it looks for variables written like `{{input}}`.

When the user types those variables:

- the node extracts the variable names
- the node creates matching input handles automatically
- the node resizes itself based on the text content

So this node is more dynamic than the others.

## Main frontend concepts

### 1. State management

`frontend/src/store.js` stores:

- all nodes
- all edges
- helper functions like adding nodes, connecting nodes, and updating fields

This is the shared state for the whole pipeline editor.

### 2. Drag and drop

`frontend/src/draggableNode.js` puts the node type into drag data.

`frontend/src/ui.js` reads that drag data when the user drops onto the canvas, creates a new node ID, and adds the node to state.

### 3. Rendering nodes

`reactflow` is used to show the visual graph.

`nodeTypes` from `nodeRegistry.js` tells React Flow which React component should render each node type.

### 4. Submitting the pipeline

`frontend/src/submit.js` sends this shape to the backend:

```json
{
  "nodes": [...],
  "edges": [...]
}
```

The backend responds with summary information instead of running the pipeline.

## Main backend concepts

The backend in `backend/main.py` is very small and focused.

It does three things:

- receives the pipeline payload
- validates whether the edges reference real nodes
- checks whether the graph contains a cycle

The cycle check uses a standard graph approach based on node in-degrees and a queue.
If all nodes can be visited without getting stuck, the graph is acyclic.

## If you want to change something

Here is the easiest place to make common changes:

- Add a new node type:
  Start in `frontend/src/nodes/nodeRegistry.js`, then add a new node component in `frontend/src/nodes/`.
- Change how nodes look:
  Start in `frontend/src/nodes/BaseNode.js` and `frontend/src/index.css`.
- Change drag/drop or canvas behavior:
  Start in `frontend/src/ui.js`.
- Change state behavior:
  Start in `frontend/src/store.js`.
- Change what happens on submit:
  Start in `frontend/src/submit.js` and `backend/main.py`.
- Change backend validation:
  Start in `backend/main.py`.

## Running the project

### Frontend

From `frontend/`:

```bash
npm install
npm start
```

This starts the React app on `http://localhost:3000`.

### Backend

From `backend/`, install FastAPI and Uvicorn if needed, then run:

```bash
uvicorn main:app --reload
```

This starts the API on `http://127.0.0.1:8000`.

The frontend expects the backend at:

`http://127.0.0.1:8000`

You can override that with `REACT_APP_API_BASE_URL`.

## Short summary

In one sentence:

This project is a visual workflow builder that lets users draw pipelines with nodes and connections, then sends that graph to a backend that checks whether the structure is valid.

Another simple way to think about it:

- `frontend/` = build the pipeline visually
- `backend/` = inspect the pipeline structure

