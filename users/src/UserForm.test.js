import { render, screen } from "@testing-library/react";
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
