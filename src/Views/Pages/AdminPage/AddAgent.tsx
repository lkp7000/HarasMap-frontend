import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '../AdminDashboard/AdminDashBoardLayout';
import { addAgent } from '../../../services/api';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';


const AddAgent = () => {
    const [formData, setFormData] = useState({
        agentName: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await addAgent(formData, token);
            if (response) {
                navigate('/AgentView');
            } else {
                setMessage('Account creation failed');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred while creating the account');
        }
    };

    return (
        <AdminDashboardLayout>
            <section className="bg-[#e2e8f0] rounded-lg dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                {t('Create an account')}
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="fullName"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >

                                        {t('Agent Name')}
                                    </label>
                                    <input
                                        type="text"
                                        name="agentName"
                                        id="agentName"
                                        value={formData.agentName}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder={t('Full Name')}
                                        required />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        {t('Your Email')}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder={t('Your email address')}
                                        required />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        {t('Password')}
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder={t('Your password')}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required />
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            aria-describedby="terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="terms"
                                            className="font-light text-gray-500 dark:text-gray-300"
                                        >
                                            {t('I accept the')}{' '}
                                            <a
                                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                                href="#"
                                            >
                                                {t('Terms and Conditions')}
                                            </a>
                                        </label>
                                    </div>
                                </div>
                                <button
                                    className="w-full text-black bg-[#91cedb] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover-bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    <span className='p-5'>                                     {t('Create Account')}
                                    </span>
                                    {loading && <CircularProgress color='inherit' thickness={8} size={16} />}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    {t('Already have an account?')}{' '}
                                    <a
                                        href="/Login"
                                        className="font-medium text-primary-600 hover:underline hover:font-blue dark:text-primary-500"
                                    >
                                        {t('Login here')}
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                {message && (
                    <div className="mt-4 text-sm text-red-600 dark:text-red-400">
                        {message}
                    </div>
                )}
            </section>
        </AdminDashboardLayout >
    );
}

export default AddAgent;
