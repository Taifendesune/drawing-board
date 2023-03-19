import DrawingSpace from '@/components/DrawingSpace';
import styled from 'styled-components';
import AppProvider from './AppProvider';

const WorkspaceContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

const Workspace = () => {
  return (
    <WorkspaceContainer>
      <AppProvider>
        <DrawingSpace />
      </AppProvider>
    </WorkspaceContainer>
  );
};

export default Workspace;
