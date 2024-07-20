import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui'
import { useAlbumPhotos } from '@/lib/react-query/queries';
import { Loader } from '@/components/shared';

const AlbumDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    

    const {
        data: AlbumPhotos,
        isLoading,
        isError
    } = useAlbumPhotos(parseInt(id as string));


    return (
        <div className="post_details-container">
            <div className="hidden md:flex max-w-5xl w-full">
                <Button
                    onClick={() => navigate(-1)}
                    variant="ghost"
                    className="shad-button_ghost">
                <img
                    src={"/assets/icons/back.svg"}
                    alt="back"
                    width={24}
                    height={24}
                />
                    <p className="small-medium lg:base-medium">Back</p>
                </Button>
            </div>

            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className='pt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        {AlbumPhotos?.map((photos) => {
                            const { id, title, url, thumbnailUrl } = photos;
                            return (
                                <Link
                                    key={id}
                                    to={``}
                                    className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
                                >
                                    <img
                                        src={thumbnailUrl || url}
                                        alt={title}
                                        className='rounded-xl h-64 md:h-48 w-full object-cover'
                                    />
                                    <div className='mt-3'>
                                        <p className='font-medium text-xs'>
                                            {title}
                                        </p>
                                    </div>
                                    
                                </Link>
                            );
                        })}
                    </div>
                )
            }
            


        </div>
    )
}

export default AlbumDetails