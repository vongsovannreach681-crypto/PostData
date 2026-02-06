import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form"
import z from "zod";

export default function FormComponent() {
    const [userData, setUserData] = useState();
    // define hook (react hook form )

    // 1. Add Form Validation using zod 
    const formValidate = z.object({
        // username, email, password
        username: z.string().min(2, "The username at least from 2 character"),
        email: z.email({pattern: z.regexes.email}),
        password: z.string().min(8).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must have at least one Capital leter, one special character and at least has 8 characters")
    })
    
    const {
        handleSubmit, // function which logic of performance the form
        register, //connect with input
        formState: {errors}
    } = useForm({
        resolver: zodResolver(formValidate)
    });

    //implement logic of form performance
    const onSubmitFormData = async (data) => {
        // e.preventDefault(); 
        console.log("the data of form: ", data)
        // logic to request to api (post method)
        try {
            const res = await fetch("https://fakestoreapi.com/users", {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "username": data?.username,
                    "email": data?.email,
                    "password": data?.password
                })
            })

            if (res?.ok) {
                const userData = await res.json();
                setUserData(userData);
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            {
                <h1>Username: {userData?.id}</h1>
            }
            <div className="w-full flex items-center justify-center">

                <div className="w-3/4 max-w-md p-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-blue-600 mb-6">Sign up</h2>
                    {/* form input of register */}

                    <form onSubmit={handleSubmit(onSubmitFormData)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2 text-left">Username</label>
                            <input
                                {...register("username")}  // input of username value will be store
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.username && <p style={{ color: "red", margin: "5px 0" }}>{errors.username.message}</p>}

                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2 text-left">Email</label>
                            <input
                                {...register("email")}
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                             {errors.email && <p style={{ color: "red", margin: "5px 0" }}>{errors.email.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2 text-left">Password</label>
                            <input
                                {...register("password")}
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                             {errors.password && <p style={{ color: "red", margin: "5px 0" }}>{errors.password.message}</p>}
                        </div>

                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                            Sign up
                        </button>
                    </form>
                    <button className="w-full mt-4 border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google"
                            className="w-5 h-5 mr-2"
                        />
                        Sign-up with Google
                    </button>
                    <p className="mt-6 text-sm text-center text-gray-600">
                        Already have an account?
                        <a href="/signin" className="text-blue-600 hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
