// import { useToast } from "@/components/ui/use-toast";
import { Loader, PostCard, UserCard } from "@/components/shared";
import { useArtists, useTweets } from "@/lib/react-query/queries";
import { Tweet } from "@/types";

const Home = () => {
  // const { toast } = useToast();

  const {
    data: tweets,
    isLoading: isTweetsLoading,
    isError: isErrorTweets,
  } = useTweets();
  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isErrorUsers,
  } = useArtists();

  if (isErrorTweets || isErrorUsers) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isTweetsLoading && !tweets ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {tweets?.map((tweet) => (
                <li key={tweet.id} className="flex justify-center w-full">
                  <PostCard tweet={tweet} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Artsits</h3>
        {isUsersLoading && !users ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {users?.map((user) => (
              <li key={user?.id}>
                <UserCard artist={user} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
