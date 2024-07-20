import { Link } from "react-router-dom";

import { Album } from "@/services";

type GridAlbumListProps = {
  albums: Album[];
};

const GridAlbumList = ({
  albums,
}: GridAlbumListProps) => {

  return (
    <>
      <ul className="grid-container">
        {albums.map((album) => (
          <div key={album.id}>
            <li className="relative min-w-80 h-80">
              {/* <Link to={`/posts/${post.$id}`} className="grid-post_link"> */}
              <Link to={`/albums/${album.id}/photos`} className="grid-post_link">
                <img
                  src="/assets/icons/profile-placeholder.svg"
                  alt="album"
                  className="h-full w-full object-cover"
                />
              </Link>
            </li>
            <p className="mt-3 base-medium lg:body-bold text-light-1">{album.title}</p>
          </div>
        ))}
      </ul>
  
    </>
  );
};

export default GridAlbumList;
