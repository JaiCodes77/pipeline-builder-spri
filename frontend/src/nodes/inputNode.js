import { createNodeComponent } from './nodeFactory';

export const InputNode = createNodeComponent({
  title: 'Input',
  subtitle: 'Bring external data into the workflow.',
  accent: '#22c55e',
  getInitialData: ({ id, data }) => ({
    inputName: data?.inputName || id.replace('customInput-', 'input_'),
    inputType: data?.inputType || 'Text',
  }),
  getHandles: ({ id }) => [
    { id: `${id}-value`, type: 'source', side: 'right' },
  ],
  getFields: () => [
    {
      key: 'inputName',
      label: 'Name',
      placeholder: 'customer_query',
    },
    {
      key: 'inputType',
      label: 'Type',
      type: 'select',
      options: [
        { label: 'Text', value: 'Text' },
        { label: 'File', value: 'File' },
      ],
    },
  ],
});
