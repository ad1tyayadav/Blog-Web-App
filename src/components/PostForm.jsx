import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, RTE, Select } from "./index";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            slug: post?.$id || '',
            status: post?.status || 'active'
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

        if (post) {
            if (file) {
                appwriteService.deleteFile(post.image);
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                image: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            if (file) {
                const fileId = file.$id;
                data.image = fileId;
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
        return "";
    });

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 w-full"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 w-full"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                    className="w-full mb-4"
                />
            </div>
            <div className="w-full md:w-1/3 px-2">
                <Input
                    label="Image :"
                    type="file"
                    className="mb-4 w-full"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.image)}
                            alt={post.title}
                            className="rounded-lg w-full h-auto"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 w-full"
                    {...register("status", { required: true })}
                />
                <Button
                    type='submit'
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full font-bold rounded-2xl hover:bg-[#007029]"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
