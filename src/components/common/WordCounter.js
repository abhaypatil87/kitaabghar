import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";

const RADIUS = "9";
const STROKE_WIDTH = "2";

const useStyles = makeStyles((theme) => ({
  svgWrapper: {
    transform: "rotate(-90deg)",
    overflow: "visible",
    width: "30px",
    height: "30px",
  },
  text: {
    transform: "rotate(90deg)",
    textAnchor: "middle",
    fontSize: "9px",
    fontWeight: "normal",
  },
}));
const WordCounter = (props) => {
  const classes = useStyles();
  const strokeDasharray = RADIUS * 2 * Math.PI;
  let percentage = (props.current / props.maximum) * 100;
  const [strokeDashoffset, setStrokeDashoffset] = useState(
    strokeDasharray - (percentage / 100) * strokeDasharray
  );
  let remainingChars = props.maximum - props.current;
  let meterVisibility = remainingChars <= 0 ? "hidden" : "visible";
  const circleStyle = {
    strokeDasharray: strokeDasharray,
    strokeDashoffset: `${strokeDashoffset}`,
    stroke:
      remainingChars <= 20
        ? remainingChars <= 0
          ? "#E0245E"
          : "#FFAD1F"
        : "#1DA1F2",
  };

  const testStyle = {
    transform: "rotate(90deg)",
    textAnchor: "middle",
    fontSize: "9px",
    fontWeight: "normal",
    fill: remainingChars <= 0 ? "#E0245E" : "#1D1D1D",
  };

  const ariaTextStyle = {
    border: "0",
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px",
    display: remainingChars <= 20 ? "block" : "none",
  };

  useEffect(() => {
    if (remainingChars <= 0) {
      setStrokeDashoffset(0);
    } else {
      setStrokeDashoffset(
        strokeDasharray - (percentage / 100) * strokeDasharray
      );
    }
  }, [strokeDasharray, percentage, remainingChars]);

  return (
    <div
      aria-valuemax={props.maximum}
      aria-valuemin="0"
      aria-valuenow={props.current}
      role="progressbar"
    >
      <div
        dir="auto"
        aria-atomic="true"
        aria-live="polite"
        style={ariaTextStyle}
      >
        {`${remainingChars <= 0 ? 0 : remainingChars} characters remaining`}
      </div>
      <svg viewBox="0 0 20 20" className={classes.svgWrapper}>
        <circle
          visibility={meterVisibility}
          cx="50%"
          cy="50%"
          fill="none"
          strokeWidth={STROKE_WIDTH}
          r={RADIUS}
          stroke="#EFF3F4"
        />
        <circle
          visibility={meterVisibility}
          cx="50%"
          cy="50%"
          fill="none"
          strokeWidth={STROKE_WIDTH}
          r={RADIUS}
          strokeLinecap={"round"}
          style={circleStyle}
        />
        {remainingChars <= 20 && (
          <text style={testStyle} x="50%" y="-50%" fill="black" dy=".3em">
            {remainingChars}
          </text>
        )}
      </svg>
    </div>
  );
};

export default WordCounter;
