import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashBoardLayout from '../AdminDashboard/AdminDashBoardLayout';
import { deleteAgent, getallagent, updateAgent } from '../../../services/api';
import ConfirmationModal from './ConformationModal';
import { useTranslation } from 'react-i18next';


interface Agent {
  agentID: string;
  agentName: string;
  email: string;
  password: string;
  role: string;
}

const AgentView: React.FC = () => {
  const [data, setData] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const pageSize = 10; // Items per page
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getallagent(token);

        setData(response.data);
        setTotalPages(Math.ceil(response.data.length / pageSize)); // Calculate total pages
        setLoading(false);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, []);

  const handleEdit = async (agentID: string) => {
    try {
      navigate(`/updateagent/${agentID}`);
    } catch (error) {
      console.error('Error updating agent:', error);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState(null);

  const handleDelete = async (agentID:any) => {
      try {
          const token = localStorage.getItem('token');
          await deleteAgent(agentID, token);
          setData(prevData => prevData.filter(agent => agent.agentID !== agentID));
          setIsModalOpen(false); // Close the modal after deletion
      } catch (error) {
          console.error('Error deleting agent:', error);
      }
  };

  const confirmDelete = (agentID:any) => {
      setAgentToDelete(agentID);
      setIsModalOpen(true);
  };

  const handleConfirm = () => {
      if (agentToDelete) {
          handleDelete(agentToDelete);
      }
  };

  const handleCancel = () => {
      setIsModalOpen(false);
      setAgentToDelete(null);
  };
  // const handleDelete = async (agentID: any) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     await deleteAgent(agentID, token);
  //     setData(prevData => prevData.filter(agent => agent.agentID !== agentID));
  //   } catch (error) {
  //     console.error('Error deleting agent:', error);
  //   }
  // };

  const nextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const gotoPage = (page: number) => {
    setCurrentPage(page);
  };

  const offset = (currentPage - 1) * pageSize;
  const currentPageData = data.slice(offset, offset + pageSize);

  return (
    <div>
      <AdminDashBoardLayout>
      <h2 className="text-2xl font-bold text-center mb-4">{t('Agent List')}</h2>

<div className="overflow-x-auto">
  <table className="min-w-full divide-gray-200 bg-white text-sm border border-gray-300 rounded-lg overflow-hidden">
    <thead className="bg-gray-100 text-gray-800">
      <tr>
        <th className="py-2 px-4 border-b font-bold">{t('Sr. No.')}</th>
        <th className="py-2 px-4 border-b font-bold">{t('Name')}</th>
        <th className="py-2 px-4 border-b font-bold">{t('Email')}</th>
        <th className="py-2 px-4 border-b font-bold">{t('Password')}</th>
        <th className="py-2 px-4 border-b font-bold">{t('Role')}</th>
        <th className="py-2 px-4 border-b font-bold">{t('Actions')}</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {currentPageData.map((agent, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
          <td className="py-3 px-4 border">{offset + index + 1}</td>
          <td className="py-3 px-4 border">{agent.agentName}</td>
          <td className="py-3 px-4 border">{agent.email}</td>
          <td className="py-3 px-4 border">{agent.password}</td>
          <td className="py-3 px-4 border">{agent.role}</td>
          <td className="py-3 px-4 border">
            <button className="text-blue-600 hover:text-blue-900 font-bold" onClick={() => handleEdit(agent.agentID)}>✏️</button>
            <button className="ml-2 text-red-600 hover:text-red-900 font-bold" onClick={() => confirmDelete(agent.agentID)}>🗑️</button>
            <ConfirmationModal isOpen={isModalOpen} onCancel={handleCancel} onConfirm={handleConfirm} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="flex justify-center mt-4">
    <button
      className={`border border-gray-300 bg-white py-2 px-4 rounded-l font-bold ${
        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={prevPage}
      disabled={currentPage === 1}
    >
      {t('Previous')}
    </button>
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        className={`border-t border-b border-gray-300 bg-white py-2 px-4 font-bold ${
          currentPage === index + 1 ? 'bg-gray-200' : ''
        }`}
        onClick={() => gotoPage(index + 1)}
      >
        {index + 1}
      </button>
    ))}
    <button
      className={`border border-gray-300 bg-white py-2 px-4 rounded-r font-bold ${
        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={nextPage}
      disabled={currentPage === totalPages}
    >
      {t('Next')}
    </button>
  </div>
</div>

      </AdminDashBoardLayout>
    </div>
  );
};

export default AgentView;

