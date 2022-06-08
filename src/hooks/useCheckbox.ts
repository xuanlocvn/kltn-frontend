import { useState } from "react"

function useCheckbox() {
  const [selectList, setSelectList] = useState([])

  const handleChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setSelectList([...selectList, value])
    } else {
      setSelectList(selectList.filter((e) => e !== value))
    }
  }
  return {
    selectList,
    handleChange,
  }
}

export default useCheckbox
