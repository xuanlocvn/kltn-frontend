import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

function useList<T>() {
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("all")
  const [totalList, setTotalList] = useState([])
  const [renderList, setRenderList] = useState<T[]>([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setRenderList(totalList)
  }, [totalList])

  useEffect(() => {
    const filter = searchParams.get("filter")
      ? searchParams.get("filter")
      : "all"
    const p = searchParams.get("page") ? Number(searchParams.get("page")) : 1
    const getListByFilter = (filter: string) => {
      if (filter == "joined") {
        const joinedSubjectList = totalList.filter(
          (subject) => subject.isJoined == true,
        )
        return joinedSubjectList
      } else if (filter == "notjoin") {
        const notJoinedSubjectList = totalList.filter(
          (subject) => subject.isJoined == false,
        )
        return notJoinedSubjectList
      }
      return totalList
    }

    const getListByPage = (list: any[], page: number) => {
      const ttp = Math.ceil(list.length / 9)
      if (page > ttp) {
        page = ttp
      }
      const indexFrom = (page - 1) * 9
      const indexTo = page * 9 - 1
      return list.filter(
        (element, index) => index >= indexFrom && index <= indexTo,
      )
    }

    const list = getListByFilter(filter)
    const _totalPage = Math.ceil(list.length / 9)
    setTotalPage(_totalPage)
    const listByPage = getListByPage(list, p)
    setRenderList(listByPage)
    if (page > _totalPage) {
      setSearchParams({
        filter,
        page: _totalPage > 0 ? _totalPage.toString() : "1",
      })
    } else {
      if (p <= 0) {
        setPage(1)
        setSearchParams({ filter, page: "1" })
      } else setPage(p)
    }
  }, [page, filter])

  return {
    searchParams,
    setSearchParams,
    page,
    setPage,
    totalPage,
    filter,
    setFilter,
    renderList,
    setTotalList,
  }
}

export default useList
