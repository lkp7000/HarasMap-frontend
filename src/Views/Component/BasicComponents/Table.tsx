import React, { useEffect, useState } from 'react';
import Layout1 from '../Layout1/Layout1';
import { Link } from 'react-router-dom';
import { getallMapData } from '../../../services/api';
import { useTranslation } from "react-i18next";

const Table = () => {
  const { t } = useTranslation();

  const handleRatioChange = (event: React.ChangeEvent<HTMLInputElement>, date: string) => {
    console.log(`Selected Ratio for ${date}:`, event.target.value);
  };

  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchYear = async () => {
      try {
        const apiResponse = await getallMapData();
        setData(apiResponse.data);

      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };
    fetchYear();
  }, []);

  return (
    <Layout1>
    <div className='py-4 px-6 text-center font-bold text-xl'>{t('Report')}</div>
    <table className=" bg-white border border-gray-500 table-auto shadow-lg mt-4">
      <thead className="whitespace-nowrap px-2 py-4 font-medium text-gray-900 text-left">
        <tr>
          <th className="py-2 px-4 border-b">{t('Type')}</th>
          <th className="py-2 px-4 border-b">{t('Description')}</th>
          <th className="py-2 px-4 border-b">{t('Location')}</th>
          <th className="py-2 px-4 border-b">{t('Categories')}</th>
        </tr>
      </thead>
      <tbody>
        {data?.reportInterventionDTOS?.map((event: any) => (
          <tr key={event.date}>
            <td className="py-2 px-4 border-b">{event.date}</td>
            <td className="py-2 px-4 border-b">{event.type}</td>
            <td className="py-2 px-4 border-b">{event.description}</td>
            <td className="py-2 px-4 border-b">{event.location}</td>
            <td className="py-2 px-4 border-b">{event.categories}</td>
          </tr>
        ))}
        {data?.allDomesticDTOList?.map((event: any) => (
          <tr key={event.date}>
            <td className="py-2 px-4 border-b">{event.date}</td>
            <td className="py-2 px-4 border-b">{event.type}</td>
            <td className="py-2 px-4 border-b">{event.description}</td>
            <td className="py-2 px-4 border-b">{event.location}</td>
            <td className="py-2 px-4 border-b">{event.categories}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className='h-10 flex mx-10 my-8 pr-10 flex-row-reverse'>
      <Link to="/table/readmore" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        {t('Read More')}
      </Link>
    </div>
  </Layout1>
  
  );
};

export default Table;
