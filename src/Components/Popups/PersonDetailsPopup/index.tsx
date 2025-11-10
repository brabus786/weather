import { getFilmById, getStarshipById } from "@/api";
import { useAppDispatch } from "@/store/hooks";
import { removePopup } from "@/store/popups/popupsSlice";
import { GraphEdge, GraphNode, Person, PopupData } from "@/types/type";
import CloseIcon from "@mui/icons-material/Close";
import { FC, useCallback, useEffect, useMemo } from "react";
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
  NodeTypes,
  useEdgesState,
  useNodesState,
} from "reactflow";
import PopupWrapper from "../PopupWrapper";
import FilmNode from "./CustomNodes/FilmNode";
import HeroNode from "./CustomNodes/HeroNode";
import StarshipNode from "./CustomNodes/StarshipNode";
import styles from "./styles.module.scss";

// Function to load all film data by a list of their IDs
const getFilmsFromPerson = async (ids: number[]) => {
  const filmPromises = ids.map((id) => getFilmById(id));
  return Promise.all(filmPromises);
};

// Function to load all starship data by a list of their IDs
const getStarshipsFromPerson = async (ids: number[]) => {
  const starshipPromises = ids.map((id) => getStarshipById(id));
  return Promise.all(starshipPromises);
};

// Main function to generate hero graph data: nodes and edges
export const generateHeroGraphData = async (person: Person) => {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // Load films and starships of the hero
  const films = await getFilmsFromPerson(person.films);
  const starships = await getStarshipsFromPerson(person.starships);

  // Add hero node (central node)
  nodes.push({
    id: "hero-1",
    position: { x: 0, y: 0 },
    data: person,
    type: "heroNode",
  });

  // For each film create a node and connections with hero and starships
  films.forEach((film, filmIndex) => {
    if (!film) return;
    const filmId = `film-${film.id}`;
    const filmY = filmIndex * 150;

    // Check if the hero has starships in this film
    const isStarship = film.starships.some((starshipId) =>
      person.starships.includes(starshipId)
    );

    // Add film node
    nodes.push({
      id: filmId,
      position: { x: 300, y: filmY },
      data: { film, isStarship },
      type: "filmNode",
    });

    // Edge between hero and film
    edges.push({
      id: `e-hero-film-${film.id}`,
      source: "hero-1",
      target: filmId,
      animated: true,
    });

    // Add starship nodes that hero owns and that appear in this film
    const heroStarshipsInFilm = film.starships.filter((starshipId) =>
      person.starships.includes(starshipId)
    );

    heroStarshipsInFilm.forEach((starshipId, shipIndex) => {
      if (!starshipId) return;
      const starship = starships.find((s) => s?.id === starshipId);
      if (!starship) return;

      const starshipNodeId = `starship-${starship.id}`;

      // Add starship node if it is not already in the graph
      if (!nodes.find((n) => n.id === starshipNodeId)) {
        nodes.push({
          id: starshipNodeId,
          position: { x: 650, y: filmY + shipIndex * 100 },
          data: starship,
          type: "starshipNode",
        });
      }

      // Edge between film and starship
      edges.push({
        id: `e-film-starship-${film.id}-${starship.id}`,
        source: filmId,
        target: starshipNodeId,
        animated: false,
      });
    });
  });

  return { nodes, edges };
};

const PersonDetailsPopup: FC<PopupData> = ({ popupData, queue }) => {
  const person = popupData as Person;
  const dispatch = useAppDispatch();

  // State for graph nodes and edges
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  // Handler for adding new edges via ReactFlow UI
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Define node types for ReactFlow
  const nodeTypes: NodeTypes = useMemo(
    () => ({
      heroNode: HeroNode,
      filmNode: FilmNode,
      starshipNode: StarshipNode,
    }),
    []
  );

  // Close popup - remove from store
  const closePopup = () => {
    dispatch(removePopup("person_details"));
  };

  // Load data and set nodes/edges on mount and when person changes
  useEffect(() => {
    generateHeroGraphData(person).then(({ nodes, edges }) => {
      setNodes(nodes);
      setEdges(edges);
    });
  }, [person, setNodes, setEdges]);

  return (
    <PopupWrapper onClick={closePopup} queue={queue}>
      <div className={styles.container}>
        <CloseIcon className={styles.closeIcon} onClick={closePopup} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        />
      </div>
    </PopupWrapper>
  );
};

export default PersonDetailsPopup;
