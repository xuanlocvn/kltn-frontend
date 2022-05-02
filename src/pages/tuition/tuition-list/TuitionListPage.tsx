import React from 'react';
import Pagination from 'src/components/shared/Pagination/Pagination';
import { Link } from 'react-router-dom';
import useList from 'src/hooks/useList';
import './TuitionListPage.scss';

const SubjectList = [
  {
    subjectId: 1,
    name: 'Đóng học phí 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
  },
  {
    subjectId: 2,
    name: 'Đóng học phí 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang đóng',
    joined: false,
  },
  {
    subjectId: 3,
    name: 'Đóng học phí 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang đóng',
    joined: true,
  },
  {
    subjectId: 4,
    name: 'Đóng học phí 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: false,
  },
  {
    subjectId: 5,
    name: 'Đóng học phí 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang đóng',
    joined: false,
  },
  {
    subjectId: 6,
    name: 'Đóng học phí 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
  },
  {
    subjectId: 7,
    name: 'Đóng học phí 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
  },
  {
    subjectId: 8,
    name: 'Đóng học phí 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
  },
  {
    subjectId: 9,
    name: 'Đóng học phí 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
  },
  {
    subjectId: 10,
    name: 'Đóng học phí 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
  },
  {
    subjectId: 11,
    name: 'Đóng học phí 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
  },
  {
    subjectId: 12,
    name: 'Đóng học phí 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
  },
  {
    subjectId: 13,
    name: 'Đóng học phí 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
  },
];

function TuitionListPage() {
  const {
    searchParams,
    setSearchParams,
    page,
    setPage,
    totalPage,
    filter,
    setFilter,
    renderList,
  } = useList(SubjectList);

  const onPaginate = (page: number) => {
    const filter = searchParams.get('filter')
      ? searchParams.get('filter')
      : 'all';
    if (page > totalPage) page = totalPage;
    const params = { filter, page: page.toString() };
    setSearchParams(params);
    setPage(page);
  };

  const onFilter = (filter: string) => {
    const page = searchParams.get('page') ? searchParams.get('page') : '1';
    setSearchParams({ filter, page });
    setFilter(filter);
  };

  return (
    <div className="list mt-5">
      <div className="mb-3">
        <h2>Danh Sách Học Bổng</h2>
      </div>
      <div className="list_filter">
        <button
          className={`filter_btn ${filter == 'all' ? 'active' : ''}`}
          onClick={() => onFilter('all')}
        >
          Tất cả
        </button>
        <button
          className={`filter_btn ${filter == 'joined' ? 'active' : ''}`}
          onClick={() => onFilter('joined')}
        >
          Đã tham gia
        </button>
        <button
          className={`filter_btn ${filter == 'notjoin' ? 'active' : ''}`}
          onClick={() => onFilter('notjoin')}
        >
          Chưa tham gia
        </button>
      </div>
      <div style={{ height: '552px' }}>
        <div className="mission mt-4 d-flex flex-wrap">
          {renderList.map((subject, index) => (
            <div
              key={index}
              className="mission_element col-4"
              onClick={() => console.log('Hello')}
              style={{ height: '164px' }}
            >
              <Link to={'/subject/' + subject.subjectId}>
                <h5>
                  <strong>{subject.name}</strong>
                </h5>
                <p>
                  <b>Số lượng:</b> {subject.joinedAmount}/{subject.amount}
                </p>
                <p className="element_status">{subject.status}</p>
              </Link>
              {subject.joined ? (
                <button className="join_btn cancel">Hủy</button>
              ) : (
                <button className="join_btn join">Tham gia</button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalPage={totalPage}
        onPaginate={onPaginate}
      />
    </div>
  );
}

export default TuitionListPage;
