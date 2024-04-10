import { render, screen } from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
  const users = [{ name: "udev", email: "jstrfaheem065@gmail.com" }];
  const renderResults = render(<UserList users={users} />);

  return { users, renderResults };
}

test("render one row pre user", () => {
  // Render the component
  const { renderResults } = renderComponent();
  const { container } = renderResults;
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

test("render the email and name of each user", () => {
  const { users } = renderComponent();
  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
