import { ApiNode } from './apiNode';
import { ConditionNode } from './conditionNode';
import { DatabaseNode } from './databaseNode';
import { InputNode } from './inputNode';
import { LLMNode } from './llmNode';
import { OutputNode } from './outputNode';
import { PromptNode } from './promptNode';
import { TextNode } from './textNode';
import { TransformNode } from './transformNode';

export const NODE_DEFINITIONS = {
  customInput: {
    type: 'customInput',
    label: 'Input',
    category: 'Core',
    accent: '#22c55e',
    component: InputNode,
    createInitialData: (id) => ({
      inputName: id.replace('customInput-', 'input_'),
      inputType: 'Text',
    }),
  },
  llm: {
    type: 'llm',
    label: 'LLM',
    category: 'Core',
    accent: '#8b5cf6',
    component: LLMNode,
    createInitialData: () => ({
      provider: 'gpt-4.1-mini',
      temperature: '0.2',
    }),
  },
  customOutput: {
    type: 'customOutput',
    label: 'Output',
    category: 'Core',
    accent: '#f97316',
    component: OutputNode,
    createInitialData: (id) => ({
      outputName: id.replace('customOutput-', 'output_'),
      outputType: 'Text',
    }),
  },
  text: {
    type: 'text',
    label: 'Text',
    category: 'Core',
    accent: '#06b6d4',
    component: TextNode,
    createInitialData: () => ({
      text: '{{input}}',
      variables: ['input'],
    }),
  },
  prompt: {
    type: 'prompt',
    label: 'Prompt',
    category: 'Demo',
    accent: '#14b8a6',
    component: PromptNode,
    createInitialData: () => ({
      style: 'Helpful',
      audience: 'Internal team',
    }),
  },
  transform: {
    type: 'transform',
    label: 'Transform',
    category: 'Demo',
    accent: '#0ea5e9',
    component: TransformNode,
    createInitialData: () => ({
      operation: 'Summarize',
    }),
  },
  condition: {
    type: 'condition',
    label: 'Condition',
    category: 'Demo',
    accent: '#f59e0b',
    component: ConditionNode,
    createInitialData: () => ({
      operator: 'contains',
      value: 'approved',
    }),
  },
  api: {
    type: 'api',
    label: 'API',
    category: 'Demo',
    accent: '#ef4444',
    component: ApiNode,
    createInitialData: () => ({
      method: 'POST',
      path: '/v1/search',
    }),
  },
  database: {
    type: 'database',
    label: 'Database',
    category: 'Demo',
    accent: '#a855f7',
    component: DatabaseNode,
    createInitialData: () => ({
      mode: 'Read',
      table: 'customers',
    }),
  },
};

export const nodeTypes = Object.fromEntries(
  Object.entries(NODE_DEFINITIONS).map(([type, definition]) => [type, definition.component])
);

export const toolbarNodes = Object.values(NODE_DEFINITIONS);

export const createNodeData = (type, id) => {
  const definition = NODE_DEFINITIONS[type];

  return {
    id,
    nodeType: type,
    ...(definition?.createInitialData ? definition.createInitialData(id) : {}),
  };
};
