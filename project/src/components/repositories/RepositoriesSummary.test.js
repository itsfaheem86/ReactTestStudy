import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("displays the primary language of the repository", () => {
  const repository = {
    language: "Javascript",
    stargazers_count: 5,
    open_issues: 1,
    forks: 30,
  };
  render(<RepositoriesSummary repository={repository} />);
  const language = screen.getByText(repository.language);
  expect(language).toBeInTheDocument();
});
