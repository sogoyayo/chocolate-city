import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Textarea,
} from "@/components/ui";
import { PostValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components/shared";
import { useCreateTweet, useCurrentUser, useUpdateTweet } from "@/lib/react-query/queries";
import { Tweet } from "@/types";
import { getFirstStringBeforeAt } from "@/lib/utils";

type PostFormProps = {
  post?: Tweet;
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const { data: currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      body: post && action === "Update" ? post?.body : "",
      postId: post && action === "Update" ? post.postId : 0,
      name: post && action === "Update" ? post.name : getFirstStringBeforeAt(currentUser?.email || ""),
      email: post && action === "Update" ? post.email : currentUser?.email || "",
    },
  });

  // Query
  const { mutateAsync: createPost, isLoading: isLoadingCreate } =
  useCreateTweet();
  const { mutateAsync: updatePost, isLoading: isLoadingUpdate } =
  useUpdateTweet();


  // Handler
  const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
    try {
      // ACTION = UPDATE
      if (post && action === "Update") {
        const updatedPost = await updatePost({
          tweetId: post.id,
          tweet: {
            ...value,
          },
        });

        if (!updatedPost) {
          toast({
            title: `${action} post failed. Please try again.`,
          });
        } else {
          toast({ title: 'Post updated successfully' });
          navigate(`/`);
        }
      } else {
        // ACTION = CREATE
        const newPost = await createPost({
          ...value,
        });

        if (!newPost) {
          toast({
            title: `${action} post failed. Please try again.`,
          });
        } else {
          toast({ title: 'Post created successfully' });
          navigate("/");
        }
      }
    } catch (error) {
      toast({
        title: `${action} post failed. Please try again.`,
      });
      console.error("Error during post creation:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full  max-w-5xl">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Email</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Post ID</FormLabel>
              <FormControl>
                <Input type="number" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        /> */}

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}>
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
