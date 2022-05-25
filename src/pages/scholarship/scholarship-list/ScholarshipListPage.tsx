import React from 'react';
import Pagination from 'src/components/shared/Pagination/Pagination';
import { Link } from 'react-router-dom';
import useList from 'src/hooks/useList';
import './ScholarshipListPage.scss';

const SubjectList = [
  {
    subjectId: 1,
    name: 'Học bổng khuyến khích học tập 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
    contractAddress: '0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B',
  },
  {
    subjectId: 2,
    name: 'Học bổng khuyến khích học tập 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang đóng',
    joined: false,
    contractAddress: '0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B',
  },
  {
    subjectId: 3,
    name: 'Học bổng khuyến khích học tập 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang đóng',
    joined: true,
    contractAddress: '0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B',
  },
  {
    subjectId: 4,
    name: 'Học bổng khuyến khích học tập 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: false,
    contractAddress: '0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B',
  },
  {
    subjectId: 5,
    name: 'Học bổng khuyến khích học tập 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang đóng',
    joined: false,
    contractAddress: '0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B',
  },
  {
    subjectId: 6,
    name: 'Học bổng khuyến khích học tập 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
    contractAddress: '0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B',
  },
  {
    subjectId: 7,
    name: 'Học bổng khuyến khích học tập 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
    contractAddress: '0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B',
  },
  {
    subjectId: 8,
    name: 'Học bổng khuyến khích học tập 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
    contractAddress: '0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B',
  },
  {
    subjectId: 9,
    name: 'Học bổng khuyến khích học tập 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
    contractAddress: '0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B',
  },
  {
    subjectId: 10,
    name: 'Học bổng khuyến khích học tập 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
    contractAddress: '0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B',
  },
  {
    subjectId: 11,
    name: 'Học bổng khuyến khích học tập 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
    contractAddress: '0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B',
  },
  {
    subjectId: 12,
    name: 'Học bổng khuyến khích học tập 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
    contractAddress: '0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B',
  },
  {
    subjectId: 13,
    name: 'Học bổng khuyến khích học tập 2021-2022',
    amount: 45,
    joinedAmount: 20,
    status: 'Đang mở',
    joined: true,
    contractAddress: '0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B',
  },
];

function ScholarshipListPage() {
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
              <Link to={'/scholarships/' + subject.subjectId}>
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
                <button className="join_btn join">Đăng ký</button>
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

export default ScholarshipListPage;
