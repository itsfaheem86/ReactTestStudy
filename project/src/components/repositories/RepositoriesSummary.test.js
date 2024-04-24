import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("display information about the repository", () => {
  const repository = {
    language: "Javascript",
    stargazers_count: 5,
    open_issues: 1,
    forks: 30,
  };
  render(<RepositoriesSummary repository={repository} />);

  Object.values(repository).forEach((value) => {
    const valueText = screen.getByText(new RegExp(value)); // If we don't give regex, it will try to get exact value
    expect(valueText).toBeInTheDocument();
  });
});
