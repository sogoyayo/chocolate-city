import { useParams } from "react-router-dom";

import { Loader } from "@/components/shared";
import PostForm from "@/components/forms/PostForm";
import { useGetTweetById } from "@/lib/react-query/queries";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading } = useGetTweetById(id as string);


  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        {isLoading ? <Loader /> : <PostForm action="Update" post={post} />}
      </div>
    </div>
  );
};

export default EditPost;
