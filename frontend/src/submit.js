import { useState } from 'react';
import { useStore } from './store';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error('The backend was unable to parse the pipeline.');
      }

      const result = await response.json();

      window.alert(
        [
          'Pipeline analysis complete.',
          `Nodes: ${result.num_nodes}`,
          `Edges: ${result.num_edges}`,
          `Is DAG: ${result.is_dag ? 'Yes' : 'No'}`,
        ].join('\n')
      );
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : 'Something went wrong while submitting the pipeline.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button className="submit-button" type="button" onClick={handleSubmit} disabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : 'Submit Pipeline'}
    </button>
  );
};
