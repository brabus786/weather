import { FC, useCallback, useEffect, useMemo } from 'react';
import styles from './styles.module.scss';
import PopupWrapper from '../PopupWrapper';
import { useAppDispatch } from '@/store/hooks';
import { removePopup } from '@/store/popups/popupsSlice';
import { GraphEdge, GraphNode, Person, PopupData } from '@/types/type';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    NodeTypes,
    Edge,
    Connection,
} from 'reactflow';
import HeroNode from './CustomNodes/HeroNode';
import FilmNode from './CustomNodes/FilmNode';
import StarshipNode from './CustomNodes/StarshipNode';
import { getFilmById, getStarshipById } from '@/api';
import CloseIcon from '@mui/icons-material/Close';


const getFilmsFromPerson = async (ids: number[]) => {
    const filmPromises = ids.map(id => getFilmById(id));
    return Promise.all(filmPromises);
};

const getStarshipsFromPerson = async (ids: number[]) => {
    const starshipPromises = ids.map(id => getStarshipById(id));
    return Promise.all(starshipPromises);
};

const generateHeroGraphData = async (person: Person) => {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];

    const films = await getFilmsFromPerson(person.films);
    const starships = await getStarshipsFromPerson(person.starships);

    nodes.push({
        id: 'hero-1',
        position: { x: 0, y: 0 },
        data: person,
        type: 'heroNode',
    });

    films.forEach((film, filmIndex) => {
        const filmId = `film-${film.id}`;
        const filmY = filmIndex * 150;
        const isStarship = film.starships.some(starshipId => person.starships.includes(starshipId));

        nodes.push({
            id: filmId,
            position: { x: 300, y: filmY },
            data: { film, isStarship },
            type: 'filmNode',
        });

        edges.push({
            id: `e-hero-film-${film.id}`,
            source: 'hero-1',
            target: filmId,
            animated: true,
        });

        const heroStarshipsInFilm = film.starships.filter(starshipId =>
            person.starships.includes(starshipId)
        );

        heroStarshipsInFilm.forEach((starshipId, shipIndex) => {
            const starship = starships.find(s => s.id === starshipId);
            if (!starship) return;

            const starshipNodeId = `starship-${starship.id}`;

            if (!nodes.find(n => n.id === starshipNodeId)) {
                nodes.push({
                    id: starshipNodeId,
                    position: { x: 650, y: filmY + shipIndex * 100 },
                    data: starship,
                    type: 'starshipNode',
                });
            }

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


const HeroDetailsModal: FC<PopupData> = ({ popupData, queue }) => {
    const person = popupData as Person;
    const dispatch = useAppDispatch();

    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const nodeTypes: NodeTypes = useMemo(() => ({
        heroNode: HeroNode,
        filmNode: FilmNode,
        starshipNode: StarshipNode,
    }), []);

    const closePopup = () => {
        dispatch(removePopup('hero_details'));
    };

    useEffect(() => {
        generateHeroGraphData(person).then(({ nodes, edges }) => {
            setNodes(nodes);
            setEdges(edges);
        });
    }, [person, setNodes, setEdges]);

    return (
        <PopupWrapper onClick={closePopup} queue={queue}>
            <div className={styles.container}>
                <CloseIcon
                    className={styles.closeIcon}
                    onClick={closePopup}
                />
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

export default HeroDetailsModal;