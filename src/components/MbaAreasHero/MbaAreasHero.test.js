// 測試 MbaAreasHero 元件
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MbaAreasHero from "./MbaAreasHero";

describe("MbaAreasHero", () => {
  // 測試：預設 title 渲染
  it("renders with default title", () => {
    render(<MbaAreasHero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "UIC Business"
    );
  });

  // 測試：自訂 title 渲染
  it("renders with custom title", () => {
    render(<MbaAreasHero title="MSU MSF" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "MSU MSF"
    );
  });

  // 測試：空白 title 會使用預設值
  it("uses default title when title is empty", () => {
    render(<MbaAreasHero title="   " />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "UIC Business"
    );
  });

  // 測試：非字串 title 會使用預設值
  it("uses default title when title is not a string", () => {
    render(<MbaAreasHero title={null} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "UIC Business"
    );
  });

  // 測試：className 正確傳遞
  it("applies custom className", () => {
    const { container } = render(<MbaAreasHero className="test-class" />);
    expect(container.firstChild).toHaveClass("test-class");
  });

  // 測試：元件正確渲染結構
  it("renders correct structure", () => {
    render(<MbaAreasHero title="Test Title" />);

    // 檢查是否有 heading 元素
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Test Title");

    // 檢查父容器是否存在
    expect(heading.parentElement).toBeInTheDocument();
  });
});
