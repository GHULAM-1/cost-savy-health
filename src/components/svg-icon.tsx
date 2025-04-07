import React from "react";

interface IconProps {
  name: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  alt = "Icon",
  width = 64,
  height = 64,
  className = "",
}) => {
  return (
    <img
      src={`/Icons/${name}.svg`}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Icon;
