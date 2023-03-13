import { ReactComponent as More } from './svgs/icon-more.svg';
import { ReactComponent as Pencil } from './svgs/pencil.svg';
import styled from 'styled-components';

const IconSpan = styled.span.attrs({ role: 'img' })`
  line-height: 0;
  display: inline-flex;
  align-items: center;
`;

const CreateIcon = (
  SvgComponent: React.FC<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >
) => {
  const Icon = () => {
    return (
      <IconSpan>
        <SvgComponent />
      </IconSpan>
    );
  };
  return Icon;
};

export const IconMore = CreateIcon(More);
export const IconPencil = CreateIcon(Pencil);
