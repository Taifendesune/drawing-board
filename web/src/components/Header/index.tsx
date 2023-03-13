import styled from 'styled-components';
import Title from './Title';
import { Button } from '@components/common';
import { IconMore } from '@components/icons';
import { Tooltip } from 'antd';

const HeaderDOM = styled.header`
  position: fixed;
  top: 12px;
  right: 12px;
  height: 48px;
  padding: 8px 8px 8px 16px;
  display: flex;
  background: #ffffff;
  border-radius: 4px 8px 8px 12px;
  box-shadow: 0 0 4px ${({ theme }) => theme.normal.shadow};
`;

const Header = () => {
  const handleTitleChange = (title: string) => {
    console.log(title);
  };
  return (
    <HeaderDOM>
      <Title defaultTitle="" onChange={handleTitleChange} />
      <Tooltip title="菜单">
        <Button>
          <IconMore />
        </Button>
      </Tooltip>
    </HeaderDOM>
  );
};

export default Header;
