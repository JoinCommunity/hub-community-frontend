import React from "react";

type ContentTitleProps = {
  children: React.ReactNode;
};

export default function ContentTitle({ children }: ContentTitleProps) {
  return <h2 className="text-[32px] font-medium">{children}</h2>;
}
