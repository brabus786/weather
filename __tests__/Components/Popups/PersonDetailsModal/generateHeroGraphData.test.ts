import { Person, Film, Starship } from "../../../../src/types/type";
import { generateHeroGraphData } from "../../../../src/Components/Popups/PersonDetailsPopup";
import { getFilmByIds, getStarshipByIds } from "../../../../src/api/starWars";

jest.mock("../../../../src/api/starWars", () => ({
  getFilmByIds: jest.fn(),
  getStarshipByIds: jest.fn(),
}));

const mockPerson: Person = {
  id: 1,
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hairColor: "blond",
  skinColor: "fair",
  eyeColor: "blue",
  birthYear: "19BBY",
  gender: "male",
  homeworld: 1,
  films: [1, 2, 3],
  species: [],
  vehicles: [14, 30],
  starships: [12, 22],
  created: new Date(),
  edited: new Date(),
  url: "https://sw-api.starnavi.io/api/people/1/",
};

const mockFilms: Film[] = [
  {
    id: 1,
    title: "A New Hope",
    director: "George Lucas",
    producer: "Gary Kurtz, Rick McCallum",
    releaseDate: "1977-05-25",
    characters: [1, 2, 3],
    planets: [1, 2, 3],
    starships: [12, 22],
    vehicles: [14, 30],
    species: [1, 2],
    created: "2014-12-10T14:23:31.880000Z",
    edited: "2014-12-20T19:49:45.256000Z",
    episode_id: 4,
    openingCrawl: "It is a period of civil war...",
    url: "https://sw-api.starnavi.io/api/films/1/",
  },
  {
    id: 2,
    title: "The Empire Strikes Back",
    director: "Irvin Kershner",
    producer: "Gary Kurtz, Rick McCallum",
    releaseDate: "1980-05-17",
    characters: [1, 2, 3],
    planets: [4, 5, 6],
    starships: [15, 23],
    vehicles: [8, 16],
    species: [1, 2],
    created: "2014-12-12T11:26:24.656000Z",
    edited: "2014-12-15T13:07:53.386000Z",
    episode_id: 5,
    openingCrawl: "It is a dark time for the Rebellion...",
    url: "https://sw-api.starnavi.io/api/films/2/",
  },
];

const mockStarships: Starship[] = [
  {
    id: 12,
    name: "X-wing",
    model: "T-65 X-wing",
    manufacturer: "Incom Corporation",
    costInCredits: "149999",
    length: "12.5",
    maxAtmospheringSpeed: "1050",
    crew: "1",
    passengers: "0",
    cargoCapacity: "110",
    consumables: "1 week",
    hyperdriveRating: "1.0",
    MGLT: "100",
    starshipClass: "Starfighter",
    pilots: [1, 9, 18, 19],
    films: [1, 2, 3],
    created: "2014-12-12T11:19:05.340000Z",
    edited: "2014-12-20T21:23:49.886000Z",
    url: "https://sw-api.starnavi.io/api/starships/12/",
  },
  {
    id: 22,
    name: "Imperial shuttle",
    model: "Lambda-class T-4a shuttle",
    manufacturer: "Sienar Fleet Systems",
    costInCredits: "240000",
    length: "20",
    maxAtmospheringSpeed: "850",
    crew: "6",
    passengers: "20",
    cargoCapacity: "80000",
    consumables: "2 months",
    hyperdriveRating: "1.0",
    MGLT: "50",
    starshipClass: "Armed government transport",
    pilots: [1, 13, 14],
    films: [2, 3],
    created: "2014-12-15T13:04:47.235000Z",
    edited: "2014-12-20T21:23:49.900000Z",
    url: "https://sw-api.starnavi.io/api/starships/22/",
  },
];

describe("generateHeroGraphData - Extended Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should handle person with no films or starships", async () => {
    const personWithoutFilms: Person = {
      ...mockPerson,
      films: [],
      starships: [],
    };

    (getFilmByIds as jest.Mock).mockResolvedValue({ results: [] });
    (getStarshipByIds as jest.Mock).mockResolvedValue({ results: [] });

    const { nodes, edges } = await generateHeroGraphData(personWithoutFilms);

    expect(nodes).toHaveLength(1); // Only hero node
    expect(nodes[0].type).toBe("heroNode");
    expect(edges).toHaveLength(0); // No connections
  });

  test("should handle films without matching starships", async () => {
    const filmWithoutHeroStarships: Film = {
      ...mockFilms[0],
      starships: [99, 100], // Starships not owned by hero
    };

    (getFilmByIds as jest.Mock).mockResolvedValue({
      results: [filmWithoutHeroStarships],
    });
    (getStarshipByIds as jest.Mock).mockResolvedValue({
      results: mockStarships,
    });

    const { nodes, edges } = await generateHeroGraphData(mockPerson);

    expect(nodes).toHaveLength(2); // Hero + Film
    expect(nodes.some((n) => n.type === "starshipNode")).toBe(false);
    expect(edges).toHaveLength(1); // Only hero-film connection
  });

  test("should create correct node positions and types", async () => {
    (getFilmByIds as jest.Mock).mockResolvedValue({
      results: [mockFilms[0]],
    });
    (getStarshipByIds as jest.Mock).mockResolvedValue({
      results: [mockStarships[0]],
    });

    const { nodes } = await generateHeroGraphData(mockPerson);

    const heroNode = nodes.find((n) => n.type === "heroNode");
    const filmNode = nodes.find((n) => n.type === "filmNode");
    const starshipNode = nodes.find((n) => n.type === "starshipNode");

    expect(heroNode?.position).toEqual({ x: 0, y: 0 });
    expect(filmNode?.position).toEqual({ x: 300, y: 0 });
    expect(starshipNode?.position).toEqual({ x: 650, y: 0 });
  });

  test("should handle multiple films with starships correctly", async () => {
    (getFilmByIds as jest.Mock).mockResolvedValue({
      results: mockFilms,
    });
    (getStarshipByIds as jest.Mock).mockResolvedValue({
      results: mockStarships,
    });

    const { nodes, edges } = await generateHeroGraphData(mockPerson);

    const filmNodes = nodes.filter((n) => n.type === "filmNode");
    const starshipNodes = nodes.filter((n) => n.type === "starshipNode");

    expect(filmNodes).toHaveLength(2);
    expect(starshipNodes).toHaveLength(2);

    // Check that film nodes have different Y positions
    expect(filmNodes[0].position.y).not.toBe(filmNodes[1].position.y);
    expect(Math.abs(filmNodes[0].position.y - filmNodes[1].position.y)).toBe(
      150
    );
  });

  test("should not duplicate starship nodes", async () => {
    const filmWithSharedStarship: Film = {
      ...mockFilms[0],
      starships: [12], // Same starship in multiple films
    };

    const secondFilmWithSharedStarship: Film = {
      ...mockFilms[1],
      starships: [12], // Same starship again
    };

    (getFilmByIds as jest.Mock).mockResolvedValue({
      results: [filmWithSharedStarship, secondFilmWithSharedStarship],
    });
    (getStarshipByIds as jest.Mock).mockResolvedValue({
      results: [mockStarships[0]],
    });

    const { nodes, edges } = await generateHeroGraphData(mockPerson);

    const starshipNodes = nodes.filter((n) => n.type === "starshipNode");
    expect(starshipNodes).toHaveLength(1); // Only one unique starship node

    // Should have edges from both films to the same starship
    const starshipEdges = edges.filter((e) => e.target === "starship-12");
    expect(starshipEdges).toHaveLength(2);
  });

  test("should create animated edges between hero and films", async () => {
    (getFilmByIds as jest.Mock).mockResolvedValue({
      results: [mockFilms[0]],
    });
    (getStarshipByIds as jest.Mock).mockResolvedValue({
      results: [mockStarships[0]],
    });

    const { edges } = await generateHeroGraphData(mockPerson);

    const heroFilmEdge = edges.find((e) => e.source === "hero-1");
    expect(heroFilmEdge?.animated).toBe(true);

    const filmStarshipEdge = edges.find((e) => e.source.startsWith("film-"));
    expect(filmStarshipEdge?.animated).toBe(false);
  });

  test("should handle API errors gracefully", async () => {
    (getFilmByIds as jest.Mock).mockResolvedValue(null);
    (getStarshipByIds as jest.Mock).mockResolvedValue(null);

    const { nodes, edges } = await generateHeroGraphData(mockPerson);

    expect(nodes).toHaveLength(1); // Only hero node
    expect(edges).toHaveLength(0);
  });
});
