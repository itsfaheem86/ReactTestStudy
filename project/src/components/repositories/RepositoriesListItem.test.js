import { render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router-dom";

// Method 2: I don't want to render FileIcon, So I am mocking it
jest.mock("../tree/FileIcon", () => {
  return () => {
    return "FileIcon alternative component!";
  };
});

// act is written in pure jest but react uses it under the hood which means
// we need to use waitFor, screen.finBy/findAllBy, user.keyboard, user.click
function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    description: "A js library",
    owner: "facebook",
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

  // Method : 1 wait for FileIcon to render
  // screen.debug();
  // await pause();
  // screen.debug();
  // We should wait for FileIcon to render the image with aria label language and the class
  // await screen.findByRole("img", { name: repository.language });
});

// To simulates a delay
const pause = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
};
