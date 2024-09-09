import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminDashboardLayout from '../AdminDashboard/AdminDashBoardLayout';
import { getAgentByID, updateAgent } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";



interface Agent {
    agentName: string;
    email: string;
    password: string;
}

const UpdateAgent: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const { id }: any = useParams();
    const [formData, setFormData] = useState<Agent>({
        agentName: "",
        email: "",
        password: "",
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const response = await getAgentByID(token, id);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching agent:", error);
            }
        };
        fetchAgent();
    }, [id]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            await updateAgent(id, token, formData);
            console.log("Agent updated successfully");
            navigate('/AgentView'); // Navigate upon successful update
        } catch (error) {
            console.error("Error updating agent:", error);
        }
        setLoading(false); // Stop loading
    };

    return (
        <AdminDashboardLayout>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Update Agent
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="agentName"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Agent Name
                                    </label>
                                    <input
                                        type="text"
                                        name="agentName"
                                        id="agentName"
                                        value={formData.agentName}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Agent Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@gmail.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>


                                </div>
                                <button
                                    className="w-full text-black bg-[#91cedb] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover-bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    <span className='p-5'>  {('Update')}   </span>
                                    {loading && <CircularProgress color='inherit' thickness={8} size={16} />}

                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </AdminDashboardLayout>
    );
};

export default UpdateAgent;
