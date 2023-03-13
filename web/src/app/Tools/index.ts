import { ToolEnum } from '../enums';

class Tool {
  type: ToolEnum = ToolEnum.PENCIL;

  set(type: ToolEnum) {
    this.type = type;
  }
}

export default Tool;
