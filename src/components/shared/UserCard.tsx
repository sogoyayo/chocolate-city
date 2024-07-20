import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { Artist } from "@/types";


interface UserCardProps {
  artist: Artist;
}

const UserCard = ({ artist } : UserCardProps) => {
  return (
    <Link to={``} className="user-card">
      <img
        src={"/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {artist.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{artist.email}
        </p>
      </div>

      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
