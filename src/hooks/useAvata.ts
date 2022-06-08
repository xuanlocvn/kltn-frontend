import { useState } from "react"
import { AddImgToIPFS, ipfsBaseURL } from "src/ipfs/ipfsClient"

function useAvata() {
  const [defaultAvt, setDefaultAvt] = useState(
    "https://pic.onlinewebfonts.com/svg/img_212908.png",
  )

  async function onChangeAvt(e) {
    const file = e.target.files[0]
    const hash = await AddImgToIPFS(file)
    const url = `${ipfsBaseURL}${hash}`
    console.log(url)
    setDefaultAvt(url)
  }
  return {
    onChangeAvt,
    defaultAvt,
    setDefaultAvt,
  }
}

export default useAvata
