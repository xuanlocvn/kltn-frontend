import { useEffect, useState } from "react"

function useNow() {
  const [now, setNow] = useState(() => Date.now() / 1000)

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now() / 1000)
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return { now }
}

export default useNow
