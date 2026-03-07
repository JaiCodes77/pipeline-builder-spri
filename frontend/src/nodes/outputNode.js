import { createNodeComponent } from './nodeFactory';

export const OutputNode = createNodeComponent({
  title: 'Output',
  subtitle: 'Expose the final result of the pipeline.',
  accent: '#f97316',
  getInitialData: ({ id, data }) => ({
    outputName: data?.outputName || id.replace('customOutput-', 'output_'),
    outputType: data?.outputType || 'Text',
  }),
  getHandles: ({ id }) => [
    { id: `${id}-value`, type: 'target', side: 'left' },
  ],
  getFields: () => [
    {
      key: 'outputName',
      label: 'Name',
      placeholder: 'final_answer',
    },
    {
      key: 'outputType',
      label: 'Type',
      type: 'select',
      options: [
        { label: 'Text', value: 'Text' },
        { label: 'Image', value: 'Image' },
      ],
    },
  ],
});
