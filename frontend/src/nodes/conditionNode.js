import { createNodeComponent } from './nodeFactory';

export const ConditionNode = createNodeComponent({
  title: 'Condition',
  subtitle: 'Route the pipeline based on a simple rule.',
  accent: '#f59e0b',
  getInitialData: ({ data }) => ({
    operator: data?.operator || 'contains',
    value: data?.value || 'approved',
  }),
  getHandles: ({ id }) => [
    { id: `${id}-value`, type: 'target', side: 'left' },
    { id: `${id}-true`, type: 'source', side: 'right', offset: '34%' },
    { id: `${id}-false`, type: 'source', side: 'right', offset: '68%' },
  ],
  getFields: () => [
    {
      key: 'operator',
      label: 'Rule',
      type: 'select',
      options: [
        { label: 'contains', value: 'contains' },
        { label: 'equals', value: 'equals' },
        { label: 'starts with', value: 'starts with' },
      ],
    },
    {
      key: 'value',
      label: 'Value',
      placeholder: 'approved',
    },
  ],
});
