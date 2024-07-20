import { Link } from "react-router-dom";

// import { PostStats } from "@/components/shared";
import { multiFormatDateString } from "@/lib/utils";
import { Tweet } from "@/types";
// import { useCurrentUser } from "@/lib/react-query/queries";


interface PostCardProps {
  tweet: Tweet;
}

const PostCard = ({ tweet } : PostCardProps) => {
  // const { data: user, isLoading } = useCurrentUser();

  if (!tweet.name) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={``}>
            <img
              src={
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {tweet.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString((new Date).toLocaleString())}
              </p>
              •
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${tweet.id}`}
        >
          <img
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={``}>
      {/* <Link to={`/posts/${tweet.id}`}> */}
        <div className="small-medium lg:base-medium py-5">
          <p>{tweet.body}</p>
        </div>

        <img
          src={"/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
        />
      </Link>
    </div>
  );
};

export default PostCard;
