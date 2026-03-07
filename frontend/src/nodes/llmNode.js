import { createNodeComponent } from './nodeFactory';

export const LLMNode = createNodeComponent({
  title: 'LLM',
  subtitle: 'Generate a response from system and user prompts.',
  accent: '#8b5cf6',
  getInitialData: ({ data }) => ({
    provider: data?.provider || 'gpt-4.1-mini',
    temperature: data?.temperature || '0.2',
  }),
  getHandles: ({ id }) => [
    { id: `${id}-system`, type: 'target', side: 'left', offset: '34%' },
    { id: `${id}-prompt`, type: 'target', side: 'left', offset: '68%' },
    { id: `${id}-response`, type: 'source', side: 'right' },
  ],
  getFields: () => [
    {
      key: 'provider',
      label: 'Model',
      type: 'select',
      options: [
        { label: 'GPT-4.1 Mini', value: 'gpt-4.1-mini' },
        { label: 'Claude Sonnet', value: 'claude-sonnet' },
        { label: 'Llama 3.1', value: 'llama-3.1' },
      ],
    },
    {
      key: 'temperature',
      label: 'Temperature',
      type: 'select',
      options: [
        { label: '0.0', value: '0.0' },
        { label: '0.2', value: '0.2' },
        { label: '0.7', value: '0.7' },
      ],
    },
  ],
  getFooter: ({ data }) => `Responds with ${data.provider} at temperature ${data.temperature}.`,
});
