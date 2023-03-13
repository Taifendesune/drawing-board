import styled from 'styled-components';
import { Button, Tooltip } from '@components/common';
import { ToolEnum } from '@/app/enums';
import toolMeta from './meta';

const ToolbarContainer = styled.div`
  padding: 2px;
  border-radius: 2px;
  box-shadow: 0 0 4px ${({ theme }) => theme.normal.shadow};
  position: absolute;
  left: 12px;
  top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ToolbarItem = styled(Button).attrs({ size: 's' })`
  font-size: 20px;
`;

const Toolbar = () => {
  const pickTool = (tool: ToolEnum) => {
    console.log(`${tool} picked!`);
  };

  return (
    <ToolbarContainer>
      {toolMeta.map(({ type, Icon, name }) => (
        <Tooltip key={type} title={name} placement="right">
          <ToolbarItem onClick={() => pickTool(type)}>
            <Icon />
          </ToolbarItem>
        </Tooltip>
      ))}
    </ToolbarContainer>
  );
};

export default Toolbar;
