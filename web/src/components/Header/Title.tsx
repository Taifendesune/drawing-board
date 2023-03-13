import styled from 'styled-components';
import { Input } from 'antd';
import React, { useState } from 'react';

const TitleContent = styled.div`
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  color: ${({ theme }) => theme.normal.main};
  &:hover {
    color: ${({ theme }) => theme.highlight.main};
  }
`;

interface TitleProps {
  defaultTitle?: string;
  onChange: (title: string) => void;
}

const Title = ({ defaultTitle, onChange }: TitleProps) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(() => defaultTitle || '未命名');

  const handleSave = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    if (value) {
      setTitle(e.currentTarget.value);
      onChange(e.currentTarget.value);
    }
    setEditing(false);
  };

  return editing ? (
    <Input
      defaultValue={title}
      onBlur={handleSave}
      onPressEnter={handleSave}
      // bordered={false}
      autoFocus
      allowClear
      size="large"
    />
  ) : (
    <TitleContent onClick={() => setEditing(true)}>{title}</TitleContent>
  );
};

export default Title;
