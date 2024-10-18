// pages/components/WorkerDiagram.js
import React from "react";

const WorkerDiagram = ({ totalWorkers, lineWorkers }) => {
  const SCALE_FACTOR = 50;
  const MARGIN_SIZE = 5;

  const solidBoxHeight = totalWorkers / SCALE_FACTOR;
  const stripedBoxHeight = lineWorkers / SCALE_FACTOR;

  return (
    <div
      style={{
        position: "relative",
        width: "150px",
        height: `${solidBoxHeight}px`,
        backgroundColor: "rgba(70, 130, 180, 0.8)",
        border: "1px solid #A9B0C1",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: `${MARGIN_SIZE}px`,
          left: `${MARGIN_SIZE}px`,
          width: `calc(100% - ${2 * MARGIN_SIZE}px)`,
          height: `${stripedBoxHeight - MARGIN_SIZE}px`,
          backgroundImage:
            "repeating-linear-gradient(90deg, #fff, #fff 5px, #A9B0C1 5px, #A9B0C1 6px)",
          backgroundColor: "rgba(70, 130, 180, 0.6)",
          border: "1px solid #A9B0C1",
        }}
      />
    </div>
  );
};

export default WorkerDiagram;
