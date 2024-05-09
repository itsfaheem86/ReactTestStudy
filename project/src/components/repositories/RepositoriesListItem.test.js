import { render, screen, act } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router-dom";

// Method 2: I don't want to render FileIcon, So I am mocking it
// jest.mock("../tree/FileIcon", () => {
//   return () => {
//     return "FileIcon alternative component!";
//   };
// });

// act is written in pure jest but react uses it under the hood which means
// we need to use waitFor, screen.finBy/findAllBy, user.keyboard, user.click
function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    description: "A js library",
    owner: {
      login: "facebook",
    },
    name: "react",
    language: "Javascript",
    stargazers_count: 5,
    open_issues: 1,
    forks: 30,
    html_url: "https://github.com/facebook/react",
  };
  render(
    // <BrowserRouter></BrowserRouter> // For testing it's better to use in memory router context
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test("show a link to the github homepage for this repository", async () => {
  const { repository } = renderComponent();

  // Method : 3
  // Wait for 100ms and continue testing
  // await act(ms);

  // Method : 1 wait for FileIcon to render
  // screen.debug();
  // await ms();
  // screen.debug();
  // We should wait for FileIcon to render the image with aria label language and the class
  await screen.findByRole("img", { name: repository.language });

  const link = screen.getByRole("link", { name: /Github repository/ });
  expect(link).toHaveAttribute("href", repository.html_url);
});

test("shows a file icon with the appropriate icon", async () => {
  const { repository } = renderComponent();
  const icon = await screen.findByRole("img", { name: repository.language });
  expect(icon).toHaveClass("js-icon");
});

test("shows a link to the code editor page", async () => {
  const { repository } = renderComponent();
  await screen.findByRole("img", { name: repository.language });
  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });
  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});

// To simulates a delay
const ms = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
};
