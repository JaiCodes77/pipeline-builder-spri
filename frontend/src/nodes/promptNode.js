import { createNodeComponent } from './nodeFactory';

export const PromptNode = createNodeComponent({
  title: 'Prompt',
  subtitle: 'Build a reusable prompt template before generation.',
  accent: '#14b8a6',
  getInitialData: ({ data }) => ({
    style: data?.style || 'Helpful',
    audience: data?.audience || 'Internal team',
  }),
  getHandles: ({ id }) => [
    { id: `${id}-topic`, type: 'target', side: 'left', offset: '34%' },
    { id: `${id}-context`, type: 'target', side: 'left', offset: '68%' },
    { id: `${id}-prompt`, type: 'source', side: 'right' },
  ],
  getFields: () => [
    {
      key: 'style',
      label: 'Style',
      type: 'select',
      options: [
        { label: 'Helpful', value: 'Helpful' },
        { label: 'Concise', value: 'Concise' },
        { label: 'Persuasive', value: 'Persuasive' },
      ],
    },
    {
      key: 'audience',
      label: 'Audience',
      placeholder: 'Decision makers',
    },
  ],
});
