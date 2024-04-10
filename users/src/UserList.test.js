import { render } from "@testing-library/react";
import UserList from "./UserList";

test("render one row pre user", () => {
  // Render the component
  const users = [{ name: "udev", email: "jstrfaheem065@gmail.com" }];
  const { container } = render(<UserList users={users} />);
  // screen.logTestingPlaygroundURL(); // To see the render
  // Find all the rows in the table
  // Problem
  // const rows = screen.getAllByRole("row");
  // Fix 1
  // const rows = within(screen.getByTestId("users")).getAllByRole("row");
  // Fix 2
  const rows = container.querySelectorAll("tbody tr");
  // Assert
  expect(rows).toHaveLength(1);
});

test("render the email and name of each user", () => {});
