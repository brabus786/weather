import SkeletonLoader from "@/Components/SkeletonLoader";
import { useProcessWatcher } from "@/hooks/useProcessWatcher";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addPopup } from "@/store/popups/popupsSlice";
import { Pagination, Typography } from "@mui/material";
import { FC, useContext, useRef } from "react";
import styles from "./styles.module.scss";
import { StarWarsContext } from "@/contexts/StarWarsContext";

const StarWarsTemplate: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useProcessWatcher("get_persons");
  const listRef = useRef<HTMLDivElement | null>(null);

  // Select persons and pagination from Redux store
  const { persons, pagination } = useAppSelector(
    (state) => state.starWarsSlice
  );

  const context = useContext(StarWarsContext);
  if (!context) return null;

  const { query, paginationHandler } = context;

  const count = pagination ? Math.ceil(pagination.count / 10) : 0;

  return (
    <div className={styles.container}>
      <Typography variant="h5">Star Wars Characters</Typography>
      <div ref={listRef} className={styles.container__list}>
        {persons.length > 0 ? (
          <>
            {persons.map((person) => (
              <div
                onClick={() =>
                  dispatch(
                    addPopup({
                      name: "person_details",
                      popupData: person,
                    })
                  )
                }
                className={styles.person}
                key={person.id}
              >
                <SkeletonLoader
                  isLoading={isLoading}
                  height={24}
                  width={"100%"}
                  variant="text"
                >
                  <Typography variant="body1">{person.name}</Typography>
                </SkeletonLoader>
              </div>
            ))}
          </>
        ) : (
          <>
            {[...Array(10)].map((_, index) => (
              <SkeletonLoader
                className={styles.personLoader}
                key={index}
                isLoading
                height={68}
                width={`100%`}
                variant="rectangular"
              />
            ))}
          </>
        )}
      </div>

      <Pagination
        count={count}
        page={query.page ? Number(query.page) : 1}
        onChange={(_e, page) => {
          paginationHandler(page);
          if (listRef.current) {
            listRef.current.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        color="primary"
      />
    </div>
  );
};
export default StarWarsTemplate;
