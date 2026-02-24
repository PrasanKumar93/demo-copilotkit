import { traceable } from "langsmith/traceable";

export type FunctionType = (...args: any[]) => any;

const traceAllNodes = <T extends Record<string, FunctionType>>(
  nodes: T,
): { [K in keyof T]: FunctionType } => {
  const traced = {} as { [K in keyof T]: FunctionType };
  for (const [name, fn] of Object.entries(nodes)) {
    (traced as Record<string, FunctionType>)[name] = traceable(fn, { name });
  }
  return traced;
};

export { traceAllNodes };
