import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import HomeRoute from "./HomeRoute";
import { MemoryRouter } from "react-router";

const getItems = (language) => {
  const items = [
    {
      id: 1,
      full_name: `${language}_1`,
    },
    {
      id: 2,
      full_name: `${language}_2`,
    },
  ];
  return items;
};
const handlers = [
  rest.get("/api/repositories", (req, res, ctx) => {
    const language = req.url.searchParams.get("q").split("language:")?.[1];
    return res(
      ctx.json({
        items: getItems(language),
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

test("renders links for each language", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );
  const languages = [
    "javascript",
    "typescript",
    "rust",
    "go",
    "python",
    "java",
  ];
  // await ms();
  // screen.debug();
  // Loop over each language
  for (let language of languages) {
    const items = getItems(language);
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`),
    });
    // For each language, make sure we see links
    expect(links).toHaveLength(items.length);
    let i = 0;
    for (let link of links) {
      expect(link).toHaveTextContent(items[i].full_name);
      expect(link).toHaveAttribute(
        "href",
        `/repositories/${items[i].full_name}`
      );
      i++;
    }
    // Assert that the links have the appropriate full_name
  }
});

const ms = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};
