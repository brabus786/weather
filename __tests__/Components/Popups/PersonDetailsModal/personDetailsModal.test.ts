import { Person } from "../../../../src/types/type";
import { generateHeroGraphData } from "../../../../src/Components/Popups/PersonDetailsPopup";
import { getFilmByIds, getStarshipByIds } from "../../../../src/api/starWars";

jest.mock("../../../../src/api/starWars", () => ({
  getFilmByIds: jest.fn(),
  getStarshipByIds: jest.fn(),
}));

test("generateHeroGraphData works without real API calls", async () => {
  const person = {
    id: 1,
    name: "Luke",
    films: [1],
    starships: [10, 11],
  } as Person;

  (getFilmByIds as jest.Mock).mockResolvedValue({
    results: [
      {
        id: 1,
        title: "A New Hope",
        starships: [10, 11],
      },
    ],
  });

  (getStarshipByIds as jest.Mock).mockResolvedValue({
    results: [
      { id: 10, name: "Starship-10" },
      { id: 11, name: "Starship-11" },
    ],
  });

  const { nodes, edges } = await generateHeroGraphData(person);

  expect(nodes.length).toBe(4);
  expect(edges.length).toBe(3);
});
