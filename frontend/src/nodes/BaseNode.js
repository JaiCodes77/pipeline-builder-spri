import { Handle, Position } from 'reactflow';

const POSITION_BY_SIDE = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

const getHandleOffset = (index, total) => {
  if (total <= 1) {
    return '50%';
  }

  return `${((index + 1) * 100) / (total + 1)}%`;
};

const NodeHandle = ({ handle, index, total }) => {
  const side = handle.side || 'left';
  const isHorizontal = side === 'top' || side === 'bottom';
  const anchorStyle = isHorizontal
    ? { left: handle.offset ?? getHandleOffset(index, total) }
    : { top: handle.offset ?? getHandleOffset(index, total) };

  return (
    <Handle
      id={handle.id}
      type={handle.type}
      position={POSITION_BY_SIDE[side]}
      className={`node-handle node-handle-${side}`}
      style={{
        ...anchorStyle,
        ...handle.style,
      }}
    />
  );
};

export const BaseNode = ({
  title,
  subtitle,
  accent = '#7c3aed',
  handles = [],
  width = 280,
  minHeight = 170,
  children,
  footer,
}) => {
  const leftHandles = handles.filter((handle) => (handle.side || 'left') === 'left');
  const rightHandles = handles.filter((handle) => (handle.side || 'left') === 'right');
  const topHandles = handles.filter((handle) => (handle.side || 'left') === 'top');
  const bottomHandles = handles.filter((handle) => (handle.side || 'left') === 'bottom');

  return (
    <div
      className="node-shell"
      style={{
        width,
        minHeight,
        '--node-accent': accent,
      }}
    >
      {leftHandles.map((handle, index) => (
        <NodeHandle
          key={handle.id}
          handle={handle}
          index={index}
          total={leftHandles.length}
        />
      ))}
      {rightHandles.map((handle, index) => (
        <NodeHandle
          key={handle.id}
          handle={handle}
          index={index}
          total={rightHandles.length}
        />
      ))}
      {topHandles.map((handle, index) => (
        <NodeHandle
          key={handle.id}
          handle={handle}
          index={index}
          total={topHandles.length}
        />
      ))}
      {bottomHandles.map((handle, index) => (
        <NodeHandle
          key={handle.id}
          handle={handle}
          index={index}
          total={bottomHandles.length}
        />
      ))}

      <div className="node-header">
        <div>
          <p className="node-kicker">Pipeline Node</p>
          <h3>{title}</h3>
        </div>
        {subtitle ? <p className="node-subtitle">{subtitle}</p> : null}
      </div>

      <div className="node-body">{children}</div>
      {footer ? <div className="node-footer">{footer}</div> : null}
    </div>
  );
};
