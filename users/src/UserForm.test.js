import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  // Render the component
  render(<UserForm />);
  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");
  // Assertion
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", () => {
  // Not the best implementation
  // const argList = [];
  // const callback = (...args) => {
  //   argList.push(args);
  // };
  const mock = jest.fn();

  // Render the component
  render(<UserForm onUserAdd={/*callback*/ mock} />);

  // Find two inputs
  const [nameInput, emailInput] = screen.getAllByRole("textbox");

  // Simulate name and email input
  user.click(nameInput); // To focus on this input
  user.keyboard("udev");
  user.click(emailInput);
  user.keyboard("jstrfaheem065@gmail.com");

  // Find the button in the form
  const button = screen.getByRole("button");
  // Click button
  user.click(button);

  // Assert
  // expect(argList).toHaveLength(1);
  // expect(argList[0][0]).toEqual({
  //   name: "udev",
  //   email: "jstrfaheem065@gmail.com",
  // });
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: "udev",
    email: "jstrfaheem065@gmail.com",
  });
});
