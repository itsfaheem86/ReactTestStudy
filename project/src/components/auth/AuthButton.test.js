import { render, screen } from "@testing-library/react";
import { createServer } from "../../test/server";
import { MemoryRouter } from "react-router";
import AuthButtons from "./AuthButtons";
import { SWRConfig } from "swr";

async function renderComponent() {
  render(
    // Resetting cache between each test cases
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );
  const links = await screen.findAllByRole("link");
  return { links };
}

// Test nesting
describe("when user is not signed in", () => {
  // createServer() -> GET 'api/user' -> { user: null }
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: null };
      },
    },
  ]);
  test("sign in and sign up are visible", async () => {
    await renderComponent();
    const signInLink = screen.getByRole("link", { name: /sign in/i });
    const signUpLink = screen.getByRole("link", { name: /sign up/i });

    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute("href", "/signin");
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute("href", "/signup");
  });

  test("sign out is not visible", async () => {
    await renderComponent();
    const signOutLink = screen.queryByRole("link", { name: /sign out/i });
    expect(signOutLink).not.toBeInTheDocument();
  });
});

// describe.only, test.only
describe("when user is signed in", () => {
  // createServer() -> GET '/api/user' -> { user: { id: 3, email: "jstrfaheem065@gmail.com"} }
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: { id: 3, email: "jstrfaheem065@gmail.com" } };
      },
    },
  ]);
  test("sign in and sign up are not visible", async () => {
    debugger;
    await renderComponent();
    const signInLink = screen.queryByRole("link", { name: /sign in/i });
    const signUpLink = screen.queryByRole("link", { name: /sign up/i });

    expect(signInLink).not.toBeInTheDocument();
    expect(signUpLink).not.toBeInTheDocument();
  });

  test("sign out is visible", async () => {
    debugger;
    await renderComponent();
    const signOutLink = screen.queryByRole("link", { name: /sign out/i });
    expect(signOutLink).toBeInTheDocument();
  });
});
