
import { Avatar, Button, Card, Dropdown, DropdownItem, FileInput, Label, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AppButton from "../Shared/AppButton/AppButton";

export function ProfileCard() {
    const [openModal, setOpenModal] = useState(false);
    const { register, handleSubmit } = useForm();
    const { userData } = useContext(AuthContext)

    const formdata = new FormData()
    formdata.append("photo", userData?.photo[0])

    const { mutate: uploadPhoto, isPending } = useMutation({
        mutationFn: changeProfilePicture, onSuccess: () => {
            toast.success("Photo uploaded successfully");
            setOpenModal(false);
        }, onError: (error) => {
            toast.error("Error uploading photo:", error);
            console.log(error.response.data.error);
        }
    })

    async function changeProfilePicture(data) {
        return await axios.put(`${import.meta.env.VITE_API_URL}/users/upload-photo`, {
            headers: {
                token: localStorage.getItem("token")
            }
        }, formdata)
    }

    return (
        <Card className="mb-6">

            <div className="flex flex-col items-center pb-10">
                <Avatar className="mb-3 rounded-full shadow-lg size-20 avatar" alt={userData?.name} img={userData?.photo && !userData?.photo.includes("undefined")
                    ? userData?.photo
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYMqESJWWqlDDmwlNN26wRx8kZk2yq3HhGZg&s'}
                    rounded />
                {/* <Avatar className='me-4' alt={name} img={!photo.includes("undefined") ? photo : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYMqESJWWqlDDmwlNN26wRx8kZk2yq3HhGZg&s`} rounded /> */}

                {/* <Image
                    alt="Bonnie image"
                    height="96"
                    src="/images/people/profile-picture-3.jpg"
                    width="96"
                    className="mb-3 rounded-full shadow-lg"
                /> */}
                {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
                <MdModeEdit className="size-8 cursor-pointer rounded" onClick={() => setOpenModal(true)} />

                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData?.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{userData?.email}</span>
                <div className="mt-4 flex space-x-3 lg:mt-6">
                    <Link to="/change-password" className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                        Change Password
                    </Link>
                    {/* <a
                        href="#"
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                        Message
                    </a> */}
                </div>
            </div>


            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader />
                <ModalBody>
                    <form onSubmit={handleSubmit(uploadPhoto)} className="flex flex-col gap-4 w-full items-center justify-center">
                        <Label
                            htmlFor="dropzone-file"
                            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <svg
                                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <FileInput {...register("photo")} id="dropzone-file" className="hidden" />
                        </Label>
                        <AppButton type="submit" className="mt-4">
                            {isPending ? "Uploading..." : "Upload"}
                        </AppButton>
                    </form>
                </ModalBody>
            </Modal>


        </Card>
    );
}
