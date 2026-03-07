import { createNodeComponent } from './nodeFactory';

export const DatabaseNode = createNodeComponent({
  title: 'Database',
  subtitle: 'Persist or retrieve records from storage.',
  accent: '#a855f7',
  getInitialData: ({ data }) => ({
    mode: data?.mode || 'Read',
    table: data?.table || 'customers',
  }),
  getHandles: ({ id }) => [
    { id: `${id}-query`, type: 'target', side: 'left' },
    { id: `${id}-records`, type: 'source', side: 'right' },
  ],
  getFields: () => [
    {
      key: 'mode',
      label: 'Mode',
      type: 'select',
      options: [
        { label: 'Read', value: 'Read' },
        { label: 'Upsert', value: 'Upsert' },
        { label: 'Delete', value: 'Delete' },
      ],
    },
    {
      key: 'table',
      label: 'Table',
      placeholder: 'customers',
    },
  ],
});
