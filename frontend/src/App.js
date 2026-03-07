import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="section-kicker">VectorShift Assessment</p>
          <h1>Pipeline Builder</h1>
          <p className="app-description">
            A styled React Flow workspace with reusable nodes, dynamic text variables,
            and backend validation.
          </p>
        </div>
        <SubmitButton />
      </header>

      <main className="app-main">
        <aside className="app-sidebar">
          <PipelineToolbar />
        </aside>
        <section className="app-workspace">
          <PipelineUI />
        </section>
      </main>
    </div>
  );
}

export default App;
