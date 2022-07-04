import React, { useEffect, useState } from "react"
import { getProductType } from "src/api/productApi"
import { marketplaceContractService } from "src/contracts/maketplace.service"
import useAvata from "src/hooks/useAvata"
import { AddDataToIPFS } from "src/ipfs/ipfsClient"
import { IProductTypeInstance } from "src/utils/window"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { convertToRaw, EditorState, ContentState } from "draft-js"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"

function CreateNewProduct() {
  const [faculty, setFaculty] = useState("")
  const { onChangeAvt, defaultAvt } = useAvata()
  const [productType, setProductType] = useState<IProductTypeInstance[]>([])
  const [description, SetDescription] = useState("")

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getProductType()
      setProductType(response.data.result)
    }
    fetchApi()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e.target)
    const productInfoForm = {
      img: defaultAvt,
      name: e.target.name.value,
      productId: e.target.productId.value,
      productType:
        e.target.productType.options[e.target.productType.selectedIndex].text,
      amount: e.target.amount.value,
      price: e.target.price.value,
      description: description,
    }
    console.log(productInfoForm)
    const hash = await AddDataToIPFS(productInfoForm)
    console.log(hash)
    await marketplaceContractService.createAndListNFT(
      [hash, productInfoForm.productType === "course"],
      productInfoForm.price,
      productInfoForm.amount,
    )
  }

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    SetDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }
  const [editorState, setEditorState] = useState(() => {
    const html = "<p></p>"
    const contentBlock = htmlToDraft(html)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      )
      const a = EditorState.createWithContent(contentState)
      return a
    }
  })
  const onCancel = () => {
    const html = "<p></p>"
    const contentBlock = htmlToDraft(html)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      )
      const a = EditorState.createWithContent(contentState)
      setEditorState(a)
    }
  }

  return (
    <div className="form_body container">
      <div>
        <h2>Tạo vật phẩm</h2>
      </div>
      <div className="body_form mt-3">
        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="col col-4 img-avt d-flex flex-column align-items-center">
              <label htmlFor="myImage">
                <img src={defaultAvt} alt="" />
                <p>
                  <i>Nhấn để chọn ảnh mới</i>
                </p>
              </label>
              <input
                type="file"
                id="myImage"
                name="myImage"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => onChangeAvt(e)}
              />
            </div>
            <div className="col col-8">
              <div className="d-flex flex-column mb-2">
                <label htmlFor="name">
                  Tên vật phẩm <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Tên vật phẩm"
                  name="name"
                  required
                />
              </div>
              <div className="d-flex flex-column mb-2">
                <label htmlFor="productId">
                  Mã vật phẩm <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Mã vật phẩm"
                  name="productId"
                  required
                />
              </div>
              <div className="d-flex flex-column mb-2">
                <label htmlFor="productType">
                  Loại vật phẩm<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="productType"
                  id="productType"
                  value={faculty}
                  onChange={(e) => {
                    setFaculty(e.target.value)
                  }}
                >
                  {productType &&
                    productType.map((type, index) => (
                      <option key={index} value={type.productTypeAlias}>
                        {type.productTypeName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="d-flex justify-content-between row mb-2">
                <div className="d-flex flex-column col col-6">
                  <label htmlFor="amount">
                    Số lượng vật phẩm
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Số lượng vật phẩm"
                    name="amount"
                    required
                  />
                </div>
                <div className="d-flex flex-column col col-6">
                  <label htmlFor="price">
                    Giá mỗi vật phẩm
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Giá mỗi vật phẩm"
                    name="price"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex flex-column mb-2">
              <label htmlFor="description">
                Mô tả <span style={{ color: "red" }}>*</span>
              </label>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorState={editorState}
                wrapperStyle={{
                  border: "1px solid rgba(0,0,0,0.3)",
                  borderRadius: "20px",
                }}
                onEditorStateChange={onEditorStateChange}
              />
            </div>
            <div className="d-flex flex-row-reverse">
              <button className="submitbtn" type="submit">
                Tạo
              </button>
              <button
                className="submitbtn cancel_btn"
                type="reset"
                onClick={onCancel}
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateNewProduct
