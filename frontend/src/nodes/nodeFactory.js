import { useEffect, useMemo, useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const renderField = (field, value, onChange) => {
  if (field.type === 'select') {
    return (
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        value={value}
        rows={field.rows || 4}
        placeholder={field.placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  return (
    <input
      type={field.type || 'text'}
      value={value}
      placeholder={field.placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export const createNodeComponent = ({
  title,
  subtitle,
  accent,
  width,
  minHeight,
  getInitialData = ({ data }) => data || {},
  getHandles = ({ id }) => [],
  getFields = () => [],
  getFooter,
}) => {
  return function ConfigurableNode({ id, data }) {
    const updateNodeField = useStore((state) => state.updateNodeField);

    const initialData = useMemo(() => getInitialData({ id, data }), [id, data]);
    const [localData, setLocalData] = useState(initialData);

    useEffect(() => {
      setLocalData(initialData);
    }, [initialData]);

    const setFieldValue = (fieldName, value) => {
      setLocalData((current) => ({ ...current, [fieldName]: value }));
      updateNodeField(id, fieldName, value);
    };

    const fields = getFields({ id, data: localData, setFieldValue });
    const handles = getHandles({ id, data: localData });

    return (
      <BaseNode
        title={title}
        subtitle={subtitle}
        accent={accent}
        width={width}
        minHeight={minHeight}
        handles={handles}
        footer={getFooter ? getFooter({ id, data: localData }) : null}
      >
        {fields.map((field) => (
          <label key={field.key} className="node-field">
            <span>{field.label}</span>
            {renderField(field, localData[field.key] ?? '', (value) =>
              setFieldValue(field.key, value)
            )}
          </label>
        ))}
      </BaseNode>
    );
  };
};
