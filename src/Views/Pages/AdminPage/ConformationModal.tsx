import React from 'react';
import { useTranslation } from 'react-i18next';

const ConfirmationModal = ({ isOpen, onCancel, onConfirm }:any) => {
    const {t} = useTranslation();
    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen">
                <div className="modal-overlay fixed inset-0 bg-black opacity-30"></div>

                <div className="modal-container bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <div className="modal-header bg-gray-800 text-white py-2 px-4 flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{t('Confirm Deletion')}</h3>
                        <button onClick={onCancel} className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200">×</button>
                    </div>

                    <div className="modal-body p-4">
                        <p className="text-gray-700">{t('Are you sure you want to delete this agent')}?</p>
                    </div>

                    <div className="modal-footer bg-gray-100 py-4 px-4 flex justify-end">
                        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 mr-2 focus:outline-none">{t('Cancel')}</button>
                        <button onClick={onConfirm} className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded focus:outline-none">{t('Delete')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
