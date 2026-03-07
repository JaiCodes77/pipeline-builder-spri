import { createNodeComponent } from './nodeFactory';

export const ApiNode = createNodeComponent({
  title: 'API',
  subtitle: 'Call an external service as part of the flow.',
  accent: '#ef4444',
  getInitialData: ({ data }) => ({
    method: data?.method || 'POST',
    path: data?.path || '/v1/search',
  }),
  getHandles: ({ id }) => [
    { id: `${id}-payload`, type: 'target', side: 'left' },
    { id: `${id}-response`, type: 'source', side: 'right' },
  ],
  getFields: () => [
    {
      key: 'method',
      label: 'Method',
      type: 'select',
      options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
      ],
    },
    {
      key: 'path',
      label: 'Path',
      placeholder: '/v1/search',
    },
  ],
});
