'use client';

import {
  ExpenseByCategorySummary,
  useGetExpensesByCategoryQuery,
} from '@/state/api';
import { useMemo, useState } from 'react';
import Header from '../(components)/Header';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

/* AggregatedData might look like this
    {
        category1: { name: 'test1', color: '#000' amount: 2 },
        // more categories can be added with the same structure
    }
*/
type AggregatedData = {
  [category: string]: AggregatedDataItem;
};

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedCategory, setSeletedCategory] = useState<string>('All');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();

  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === 'All' || data.category === selectedCategory;

        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);

        // Filter out based on matchesCategory && matchesDate
        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount);

        if (!acc[data.category]) {
          acc[data.category] = { name: data.category, amount: 0 };

          // Set random colors
          acc[data.category].color = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
          acc[data.category].amount += amount;
        }

        return acc;
      }, {});

    console.log(filtered);

    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);

  const classNames = {
    label: 'block text-sm font-medium text-gray-700',
    selectInput:
      'mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md',
  };

  if (isLoading) return <div className="py-4">Loading...</div>;

  if (isError || !expensesData) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch expenses data
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of expenses over time
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className=" text-lg font-semibold mb-4">
            Filter by category and date
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                name="category"
                id="category"
                className={classNames.selectInput}
                defaultValue="All"
                onChange={(e) => setSeletedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>

            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input
                name="start-date"
                type="date"
                id="start-date"
                className={classNames.selectInput}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input
                name="end-date"
                type="date"
                id="end-date"
                className={classNames.selectInput}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                dataKey="amount"
                fill="#8884d8"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map(
                  (entry: AggregatedDataItem, index: number) => {
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === activeIndex ? 'rgb(29,78,216)' : entry.color
                        }
                      />
                    );
                  }
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
