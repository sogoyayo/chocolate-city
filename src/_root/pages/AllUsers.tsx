import { useToast } from "@/components/ui/use-toast";
import { Loader, UserCard } from "@/components/shared";
import { useArtists } from "@/lib/react-query/queries";

const AllUsers = () => {
  const { toast } = useToast();

  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isErrorUsers,
  } = useArtists();

  if (isErrorUsers) {
    toast({ title: "Something went wrong." });
    
    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isUsersLoading && !users ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {users?.map((user) => (
              <li key={user?.id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard artist={user} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
