import { render, screen } from "@testing-library/react";
import App from "./App";
import user from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

test("can receive a new user and show it on a list", () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i }); // i to make it case insensitive
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  user.click(nameInput);
  act(() => {
    user.keyboard("udev");
    user.click(emailInput);
    user.keyboard("jstrfaheem065@gmail.com");
    user.click(button);
  });
  const name = screen.getByRole("cell", { name: "udev" });
  const email = screen.getByRole("cell", {
    name: "jstrfaheem065@gmail.com",
  });
  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  // screen.debug();
});
