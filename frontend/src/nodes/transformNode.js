import { createNodeComponent } from './nodeFactory';

export const TransformNode = createNodeComponent({
  title: 'Transform',
  subtitle: 'Clean or reshape data before the next step.',
  accent: '#0ea5e9',
  getInitialData: ({ data }) => ({
    operation: data?.operation || 'Summarize',
  }),
  getHandles: ({ id }) => [
    { id: `${id}-input`, type: 'target', side: 'left' },
    { id: `${id}-output`, type: 'source', side: 'right' },
  ],
  getFields: () => [
    {
      key: 'operation',
      label: 'Operation',
      type: 'select',
      options: [
        { label: 'Summarize', value: 'Summarize' },
        { label: 'Extract keywords', value: 'Extract keywords' },
        { label: 'Translate', value: 'Translate' },
      ],
    },
  ],
});
