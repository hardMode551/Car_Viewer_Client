import React from 'react';

import { useSelector } from 'react-redux';

import { Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { fetchCars } from '../store/slices/cars/asyncActions';
import { setCurrentPage, setMarkCounts, setSelectedMark, setSelectedModels } from '../store/slices/sort/sortSlice';
import { RootState, useAppDispatch } from '../store/store';

import styles from '../styles/TableBlock.module.scss';

const TableBlock = () => {
  const { data } = useSelector((state: RootState) => state.cars);
  const { selectedMark, selectedModels, markCounts, currentPage } = useSelector((state: RootState) => state.sort);
  const dispatch = useAppDispatch();

  // Запрос для получения списка марок автомобилей
  React.useEffect(() => {
    dispatch(fetchCars());
  }, []);

  // Колонки таблицы
  const columns: ColumnsType<(typeof data)[0]> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Марка/Модель',
      dataIndex: 'mark',
      key: 'mark',
      render: (_, record) => `${record.mark} / ${record.model}`,
    },
    {
      title: 'Модификация',
      dataIndex: 'modification',
      key: 'modification',

      render: (_, record) =>
        `${record.engine.volume} ${record.engine.transmission} (${record.engine.power} л.с) ${record.drive}`,

    },
    {
      title: 'Комплектация',
      dataIndex: 'equipmentName',
      key: 'equipment',
    },
    {
      title: 'Стоимость',
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => `${text.toLocaleString()} Р`,
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => {
        const formattedDate = new Date(text).toLocaleString('ru-RU', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });
        return formattedDate;
      },
    },
  ];

  React.useEffect(() => {
    // Вычисляем количество автомобилей для каждой марки
    const counts: Record<string, number> = {};
    data.forEach((item) => {
      counts[item.mark] = (counts[item.mark] || 0) + 1;
    });
    dispatch(setMarkCounts(counts));
  }, [data]);


  // Функция обработки изменения выбранных марок автомобилей
  const handleMarkChange = (value: string) => {
    const updatedBrands = selectedMark.includes(value)
      ? selectedMark.filter((brand: string) => brand !== value)
      : [...selectedMark, value];

    // Обновляем выбранные марки и модели в хранилище и устанавливаем текущую страницу на 1
    dispatch(setSelectedMark(updatedBrands));
    dispatch(setSelectedModels(updatedBrands));
    dispatch(setCurrentPage(1));
  };

  const handleModelChange = (selectedValues: string[]) => {
    dispatch(setSelectedMark(selectedValues));
    dispatch(setSelectedModels(selectedValues));
    dispatch(setCurrentPage(1));
  };



  // Функция обработки изменения номера текущей страницы
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Определяем функцию для сортировки данных по выбранным маркам автомобилей
  const sortDataByMark = (data, selectedMark: string[]) => {
    if (!selectedMark.length) {
      return data; // Если ни одна марка не выбрана, возвращаем исходные данные
    }

    return data.filter((item: { mark: string; }) => selectedMark.includes(item.mark));
  };

  const pageSize = 20;

  // Получаем уникальные марки автомобилей
  const uniqueMarks = Array.from(new Set(data.map((item) => item.mark)));

  // Сортируем данные по выбранным маркам автомобилей
  const sortedData = sortDataByMark(data, selectedMark);








  return (
    <div className={styles.root}>
      {uniqueMarks.map((mark, index) => (
        <div className={styles.uniqueMarks} key={index}>
          <a
            style={{ fontWeight: selectedMark.includes(mark) ? 'bold' : 'normal' }}
            key={mark}
            onClick={() => handleMarkChange(mark)}
          >
            {mark}
          </a>
          <p className={styles.count} style={{ marginRight: '10px' }}>{markCounts[mark]}</p>
        </div>

      ))}

      {selectedMark && (
        <div className={styles.selectedMark}>
          <div>
            <label>Модель:</label>
          </div>
          <Select
            mode="multiple"
            style={{ margin: '10px 0' }}
            value={selectedModels}
            onChange={handleModelChange}
          />
        </div>
      )}

      <Table
        dataSource={sortedData}
        columns={columns}
        bordered={true}
        pagination={{
          pageSize,
          total: data.length,
          showSizeChanger: true,
          current: currentPage,
          onChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default TableBlock;
