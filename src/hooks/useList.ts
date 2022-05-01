import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function useList(props) {
  const SubjectList = props;
  console.log(SubjectList);
  console.log(props);
  const [totalPage, setTotalPage] = useState(null);
  const [page, setPage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [subjectList, setSubjectList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    setSubjectList(SubjectList);
  }, []);

  useEffect(() => {
    const filter = searchParams.get('filter')
      ? searchParams.get('filter')
      : 'all';
    const p = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const getListByFilter = (filter: string) => {
      if (filter == 'joined') {
        const joinedSubjectList = subjectList.filter(
          (subject) => subject.joined == true,
        );
        return joinedSubjectList;
      } else if (filter == 'notjoin') {
        const notJoinedSubjectList = subjectList.filter(
          (subject) => subject.joined == false,
        );
        return notJoinedSubjectList;
      }
      return subjectList;
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
      setSearchParams({ filter, page: Math.ceil(list.length / 9).toString() });
    } else {
      if (p <= 0) {
        setPage(1);
        setSearchParams({ filter, page: '1' });
      } else setPage(p);
    }
  }, [page, filter]);

  useEffect(() => {
    console.log('render: ', renderList);
  }, [renderList]);

  return {
    searchParams,
    setSearchParams,
    page,
    setPage,
    totalPage,
    filter,
    setFilter,
    renderList,
  };
}

export default useList;
