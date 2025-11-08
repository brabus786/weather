import { Person } from "../../../../src/types/type";
import { generateHeroGraphData } from "../../../../src/Components/Popups/PersonDetailsModal";
import { getFilmById, getStarshipById } from "../../../../src/api";

jest.mock("../../../../src/api", () => ({
  getFilmById: jest.fn(),
  getStarshipById: jest.fn(),
}));

test("generateHeroGraphData works without real API calls", async () => {
  const person = {
    id: 1,
    name: "Luke",
    films: [1],
    starships: [10, 11],
  } as Person;

  (getFilmById as jest.Mock).mockResolvedValue({
    id: 1,
    title: "A New Hope",
    starships: [10, 11],
  });

  (getStarshipById as jest.Mock).mockImplementation(async (id: number) => {
    return { id, name: `Starship-${id}` };
  });

  const { nodes, edges } = await generateHeroGraphData(person);

  expect(nodes.length).toBe(4);
  expect(edges.length).toBe(3);
});
