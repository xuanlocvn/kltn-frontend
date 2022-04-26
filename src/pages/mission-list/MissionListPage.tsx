import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from 'src/components/shared/Pagination/Pagination';
import './MissionListPage.scss';

function MissionListPage() {
  const [totalPage, setTotalPage] = useState(null);
  const [page, setPage] = useState(null);
  const [missionList, setMissionList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    const MissionList = [
      {
        name: 'Thăm viếng nghĩa trang liệt sĩ - MS212356',
        amount: 45,
        joinedAmount: 20,
        status: 'Đang mở',
        joined: true,
      },
      {
        name: 'Thăm viếng nghĩa trang liệt sĩ - MS212356',
        amount: 45,
        joinedAmount: 20,
        status: 'Đang đóng',
        joined: false,
      },
      {
        name: 'Thăm viếng nghĩa trang liệt sĩ - MS212356',
        amount: 45,
        joinedAmount: 20,
        status: 'Đang đóng',
        joined: true,
      },
      {
        name: 'Thăm viếng nghĩa trang liệt sĩ - MS212356',
        amount: 45,
        joinedAmount: 20,
        status: 'Đang mở',
        joined: false,
      },
      {
        name: 'Thăm viếng nghĩa trang liệt sĩ - MS212356',
        amount: 45,
        joinedAmount: 20,
        status: 'Đang đóng',
        joined: false,
      },
      {
        name: 'Thăm viếng nghĩa trang liệt sĩ - MS212356',
        amount: 45,
        joinedAmount: 20,
        status: 'Đang mở',
        joined: true,
      },
      {
        name: 'Thăm viếng nghĩa trang liệt sĩ - MS212356',
        amount: 45,
        joinedAmount: 20,
        status: 'Đang mở',
        joined: true,
      },
      {
        name: 'Thăm viếng nghĩa trang liệt sĩ - MS212356',
        amount: 45,
        joinedAmount: 20,
        status: 'Đang mở',
        joined: true,
      },
      {
        name: 'Thăm viếng nghĩa trang liệt sĩ - MS212356',
        amount: 45,
        joinedAmount: 20,
        status: 'Đang mở',
        joined: true,
      },
      {
        name: 'Thăm viếng nghĩa trang liệt sĩ - MS212356',
        amount: 45,
        joinedAmount: 20,
        status: 'Đang mở',
        joined: true,
      },
      {
        name: 'Thăm viếng nghĩa trang liệt sĩ - MS212356',
        amount: 45,
        joinedAmount: 20,
        status: 'Đang mở',
        joined: true,
      },
      {
        name: 'Thăm viếng nghĩa trang liệt sĩ - MS212356',
        amount: 45,
        joinedAmount: 20,
        status: 'Đang mở',
        joined: true,
      },
      {
        name: 'Thăm viếng nghĩa trang liệt sĩ - MS212356',
        amount: 45,
        joinedAmount: 20,
        status: 'Đang mở',
        joined: true,
      },
    ];
    setMissionList(MissionList);
  }, []);

  useEffect(() => {
    const filter = searchParams.get('filter')
      ? searchParams.get('filter')
      : 'all';
    const p = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const getListByFilter = (filter: string) => {
      if (filter == 'joined') {
        const joinedMissionList = missionList.filter(
          (mission) => mission.joined == true,
        );
        return joinedMissionList;
      } else if (filter == 'notjoin') {
        const notJoinedMissionList = missionList.filter(
          (mission) => mission.joined == false,
        );
        return notJoinedMissionList;
      }
      return missionList;
    };

    const getListByPage = (list: any[], page: number) => {
      const ttp = Math.ceil(list.length / 9);
      if (page > ttp) {
        page = ttp;
      }
      const indexFrom = (page - 1) * 9;
      const indexTo = page * 9 - 1;
      return list.filter(
        (element, index) => index >= indexFrom && index <= indexTo,
      );
    };

    const list = getListByFilter(filter);
    setTotalPage(Math.ceil(list.length / 9));
    const listByPage = getListByPage(list, p);
    setRenderList(listByPage);
    if (page > Math.ceil(list.length / 9)) {
      setSearchParams({ page: Math.ceil(list.length / 9).toString() });
    } else {
      if (p <= 0) {
        setPage(1);
        setSearchParams({ page: '1' });
      } else setPage(p);
    }
  }, [page]);

  useEffect(() => {
    console.log('render: ', renderList);
  }, [renderList]);

  const onPaginate = (page: number) => {
    if (page > totalPage) page = totalPage;
    setSearchParams({ page: page.toString() });
    setPage(page);
  };

  return (
    <div className="list mt-5">
      <div className="mb-3">
        <h2>Danh Sách Nhiệm Vụ</h2>
      </div>
      <div className="list_filter">
        <button
          className="filter_btn active"
          onClick={() => setSearchParams({ filter: 'all' })}
        >
          Tất cả
        </button>
        <button
          className="filter_btn"
          onClick={() => setSearchParams({ filter: 'joined' })}
        >
          Đã tham gia
        </button>
        <button
          className="filter_btn"
          onClick={() => setSearchParams({ filter: 'notjoin' })}
        >
          Chưa tham gia
        </button>
      </div>
      <div style={{ height: '552px' }}>
        <div className="mission mt-4 d-flex flex-wrap">
          {renderList.map((mission, index) => (
            <div
              key={index}
              className="mission_element col-4"
              onClick={() => console.log('Hello')}
              style={{ height: '164px' }}
            >
              <h5>
                <strong>{mission.name}</strong>
              </h5>
              <p>
                <b>Số lượng:</b> {mission.joinedAmount}/{mission.amount}
              </p>
              <p className="element_status">{mission.status}</p>
              {mission.joined ? (
                <button className="join_btn">Tham gia</button>
              ) : (
                <button className="join_btn">Hủy</button>
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

export default MissionListPage;
