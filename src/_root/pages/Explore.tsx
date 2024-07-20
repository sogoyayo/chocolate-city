import { GridAlbumList, Loader } from "@/components/shared";
import { useAlbums } from "@/lib/react-query/queries";

const Explore = () => {

  const { 
    data: albums,
    // isLoading: isAlbumsLoading,
    // isError: isErrorAlbums,
  } = useAlbums();

  if (!albums)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="explore-container">
      <div className="flex-between w-full max-w-5xl mb-7">
        <h3 className="body-bold md:h3-bold">All Albums</h3>

      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        <GridAlbumList albums={albums} />
      </div>

    </div>
  );
};

export default Explore;
