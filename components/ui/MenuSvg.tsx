'use client';
import { useTheme } from "next-themes";

const MenuSvg = ({ openNavigation }: {
  openNavigation: boolean
}) => {
  const { theme } = useTheme();
  let fill = '';

  if (window.matchMedia('(prefers-color-scheme: dark)')) {
    fill = 'white';
  } else {
    fill = 'black';
  }
  return (
    <svg
      className="overflow-visible"
      width="20"
      height="12"
      viewBox="0 0 20 12"
    >
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "0"}
        width="20"
        height="2"
        rx="1"
        fill={`${theme === 'dark' ? 'white' : (theme === 'system' ? fill : 'black')}`}
        transform={`rotate(${openNavigation ? "45" : "0"})`}
      />
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "10"}
        width="20"
        height="2"
        rx="1"
        fill={`${theme === 'dark' ? 'white' : (theme === 'system' ? fill : 'black')}`}
        transform={`rotate(${openNavigation ? "-45" : "0"})`}
      />
    </svg>
  );
};

export default MenuSvg;
