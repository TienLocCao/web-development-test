import React from "react";

let lastRangeChanged: ((args: { endIndex: number }) => void) | null = null;

const Virtuoso = ({ data, itemContent, components, rangeChanged }: any) => {
  lastRangeChanged = rangeChanged;

  const rendered = data.map((post: any, idx: number) =>
    React.cloneElement(itemContent(idx, post), { key: `${post.id}-${idx}` })
  );

  return (
    <div>
      {rendered}
      {components?.Footer && <div data-testid="footer">{components.Footer()}</div>}
    </div>
  );
};

// 👉 export all on 1 object, avoid being "merged declaration"
const triggerRangeChanged = (endIndex: number) => {
  if (lastRangeChanged) {
    lastRangeChanged({ endIndex });
  }
};

export { Virtuoso, triggerRangeChanged };
export default Virtuoso;
