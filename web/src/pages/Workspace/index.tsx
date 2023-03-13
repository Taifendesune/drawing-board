import DrawingSpace from '@/components/DrawingSpace';
import styled from 'styled-components';

const WorkspaceContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

const Workspace = () => {
  return (
    <WorkspaceContainer>
      <DrawingSpace />
    </WorkspaceContainer>
  );
};

export default Workspace;
