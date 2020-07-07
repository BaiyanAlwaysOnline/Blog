import React from "react";
import Button from "./button";
import { render, fireEvent } from "@testing-library/react";
import { ButtonPropsType } from "./button";

const defaultProps: ButtonPropsType = {
  onClick: jest.fn(),
};

const disabledProps: ButtonPropsType = {
  disabled: true,
  onClick: jest.fn(),
};

const diffProps: ButtonPropsType = {
  btnType: "primary",
  size: "sm",
};

const linkProps: ButtonPropsType = {
  btnType: "link",
  href: "http://baidu.com",
};

describe("test Button component", () => {
  it("should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>Click</Button>);
    const element = wrapper.getByText("Click");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("alex-btn alex-btn-default");
    expect(element.tagName).toEqual("BUTTON");
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("should render disabled button when disabled set to true", () => {
    const wrapper = render(<Button {...disabledProps}>disabled button</Button>);
    const element = wrapper.getByText("disabled button") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
  it("should render the correct component based on different props", () => {
    const wrapper = render(
      <Button {...diffProps}>small Primary button</Button>
    );
    const element = wrapper.getByText("small Primary button");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("alex-btn-sm alex-btn alex-btn-primary");
  });
  it("should render a link when btnType equals link and href is provided", () => {
    const wrapper = render(<Button {...linkProps}>link</Button>);
    const element = wrapper.getByText("link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
  });
});
