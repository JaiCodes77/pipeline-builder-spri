import { useEffect, useMemo, useState } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const VARIABLE_PATTERN = /{{\s*([A-Za-z_$][\w$]*)\s*}}/g;

const extractVariables = (text) => {
  const seen = new Set();
  const variables = [];

  for (const match of text.matchAll(VARIABLE_PATTERN)) {
    const variableName = match[1];

    if (!seen.has(variableName)) {
      seen.add(variableName);
      variables.push(variableName);
    }
  }

  return variables;
};

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();
  const [text, setText] = useState(data?.text || '{{input}}');

  useEffect(() => {
    setText(data?.text || '{{input}}');
  }, [data?.text]);

  const variables = useMemo(() => extractVariables(text), [text]);

  useEffect(() => {
    updateNodeField(id, 'text', text);
    updateNodeField(id, 'variables', variables);
    updateNodeInternals(id);
  }, [id, text, updateNodeField, updateNodeInternals, variables]);

  const lines = text.split('\n');
  const longestLineLength = lines.reduce(
    (currentLongest, line) => Math.max(currentLongest, line.length),
    0
  );
  const width = clamp(280 + longestLineLength * 6, 280, 560);
  const minHeight = clamp(190 + Math.max(lines.length - 1, 0) * 24, 190, 420);

  const handles = [
    ...variables.map((variableName, index) => ({
      id: `${id}-var-${variableName}`,
      type: 'target',
      side: 'left',
      offset: `${((index + 1) * 100) / (variables.length + 1)}%`,
      style: { background: '#38bdf8' },
    })),
    {
      id: `${id}-output`,
      type: 'source',
      side: 'right',
      style: { background: '#c084fc' },
    },
  ];

  return (
    <BaseNode
      title="Text"
      subtitle="Compose prompt text with inline variables like {{input}}."
      accent="#06b6d4"
      width={width}
      minHeight={minHeight}
      handles={handles}
      footer={
        variables.length
          ? `Variables: ${variables.join(', ')}`
          : 'Add variables with double curly braces to create inputs.'
      }
    >
      <label className="node-field">
        <span>Text</span>
        <textarea
          className="node-textarea"
          rows={Math.min(Math.max(lines.length, 4), 12)}
          value={text}
          placeholder="Summarize {{input}} in a friendly tone."
          onChange={(event) => setText(event.target.value)}
        />
      </label>
    </BaseNode>
  );
};
