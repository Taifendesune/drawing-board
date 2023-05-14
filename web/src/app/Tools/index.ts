import { ToolEnum } from '../enums';
import Tool from './Tool';

class ToolSet {
  active?: string;
  tools: Map<string, Tool> = new Map();

  constructor(tools: Tool[]) {
    if (tools.length) {
      tools.forEach((tool) => {
        this.tools.set(tool.name, tool);
      });
      this.set(tools[0].name);
    }
  }

  set(active: string) {
    if (this.active !== active) {
      this.tools.get(active)?.setActive(false);
      this.active = active;
      this.tools.get(active)?.setActive(true);
    }
  }
}

export default ToolSet;
