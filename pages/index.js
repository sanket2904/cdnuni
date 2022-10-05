import TopNav from "../components/topnav"
import { useState } from "react"
import React from "react"
import { useRouter } from "next/router"
import style from "../styles/main.module.scss"
import $ from "jquery"
import axios from "axios"
export default function Home() {
  // const [loader, setLoader] = useState(false)
  const router = new useRouter()
  const [showUpload,setUpload] = useState(false);
  const [file,setFile] = useState([]);
  const [event,setEvent] = useState("");
  const [options,setOptions] = useState(false)
  let host = "https://api.uploadly.dev"
  let [account,setAccount] = useState({
    files:[]
  })
  let [loader,setLoader] = useState(true)
  React.useEffect(() => {
    if (!window.ssn) {
      window.ssn = JSON.parse(window.localStorage.getItem('session'))
      if (window.ssn == null) {
        router.push("/login")
        return
      }

      
    }
    
      
    if (window.ssn.active) {
      axios.get(host + "/api/account/"+ window.ssn.accountId,{
        headers: {
          "Authorization": "Bearer " + window.ssn.token
        }

      }).then((res) => {
        if (res.status == 200) {
          setLoader(false)
          setAccount(res.data)
        }
        else if (res.status == 401) {
          router.push("/login")
        }

      }).catch(err => {
        window.localStorage.removeItem("session")
        console.log(err)
        
      })
      try {

        if (!window.ssn.active) {
          router.push('/login')
        }
      } catch (error) {
        router.push('/login')
      }
    }
    
   
  }, [])
  const uploadFiles = () => {
    let formData = new FormData()
    for(var f of file) {
      formData.append("recFile",f)
    }
    axios.post(host + "/api/files",formData,{
      headers: {
        "Authorization": "Bearer " + window.ssn.token
      }
    }).then((res) => {
      
      
      if (res.status == 200) {
        
        setUpload(false)
        axios.get(host + "/api/account/" + window.ssn.accountId, {
          headers: {
            "Authorization": "Bearer " + window.ssn.token
          }

        }).then((res) => {
          if (res.status == 200) {
            setAccount(res.data)
          }
          else if (res.status == 401) {
            router.push("/login")
          }

        }).catch(err => {
          console.log(err)

        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const handleChange = (e) => {
    let init = []
    for(var f of e.target.files){
      init.push(f)
    }

    setFile([...file, ...init])
  };
  
  if (loader) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    )

  }
  else {
    return (

      <>
        <div className={` ${showUpload ? "blur-lg" : ""}  flex bg-primary flex-wrap overflow-hidden `}>
          <div className="top w-full h-14  flex items-center justify-end mx-auto pt-2">

            <div onClick={() => setOptions(!options)} className="avatar w-10 h-10 rounded-lg bg-white justify-self-end mr-4">
            </div>
            {
              options ? (

                <div style={{ border: "1px solid #616161" }} className="h-48 top-14 absolute rounded  w-40 right-4 bg-secondary z-20 shadow-xl ">
                  <div className="p-5 flex border-b-2">
                    <div className="signout cursor-pointer" onClick={() => {
                      window.localStorage.removeItem("session")
                      location.reload()
                    }}>
                      <p>Sign out</p>
                    </div>
                  </div>
                </div>

              ) : ""

            }
          </div>

          <div style={{ borderBottom: "1px solid #333" }} className="w-full flex justify-center">
            <div className="w-full h-14 flex pl-5 pr-5 max-w-6xl">
              <div className="mainHeader h-full flex items-center ">
                <a className="h-full flex pt-4 pb-4 border-b-2 border-white mr-6">Overview</a>
                <a style={{ color: "#888888", zIndex: "3" }} className="h-full flex pt-4 pb-4">Settings</a>
              </div>
            </div>
          </div>


          <div className="p-6 w-full bg-secondary  h-full justify-center flex flex-wrap">



            <div className="w-full max-w-6xl h-8 flex justify-end  overflow-hidden">
              <button onClick={() => setUpload(true)} className="bg-white pl-2 w-24 pr-2 text-md font-semibold rounded-md text-black flex items-center gap-1"> <ion-icon name="add-circle-outline"></ion-icon> <span style={{ fontSize: "14px" }} className="text-sm">Upload</span></button>
            </div>

            <div className=" overflow-x-auto w-full h-full flex justify-center">
              {(account.files.length > 0) ? <table className="h-full w-full rounded-md max-w-6xl mt-5 font-thin" >
                <thead >
                  <tr style={{ backgroundColor: "#222222", borderRadius: "5px", borderCollapse: "separate !important" }} className="rounded-sm h-16 font-thin" >
                    <th style={{ minWidth: "150px", fontSize: "14px", color: "#888888" }} className=" p-2 text-left w-1/4">
                      <span className="pl-2">Filename</span>
                    </th>
                    <th style={{ minWidth: "150px", fontSize: "14px", color: "#888888" }} className="p-2 text-left w-1/4">
                      <span className="pl-2">Filelink</span>
                    </th>
                    <th style={{ minWidth: "135px", fontSize: "14px", color: "#888888" }} className="p-2 text-left w-2/3">
                      <span className="pl-2" >Uploaded at</span>
                    </th>
                    <th style={{ minWidth: "100px", fontSize: "14px", color: "#888888" }} className="p-2 text-left w-2/3">
                      <span className="pl-2" >Size</span>
                    </th>
                    <th style={{ minWidth: "100px", fontSize: "14px", color: "#888888" }} className="p-2 text-left w-2/3">
                      <span className="pl-2" >Operations</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    account.files ? account.files.map((file) => {
                      return (
                        <tr key={file._id} style={{ borderRadius: "5px", borderBottom: "1px solid #333333" }} className="rounded-sm h-16">
                          <td style={{ minWidth: "150px", fontSize: "14px", color: "#888888" }} scope="col" className="p-2 text-left w-1/4">
                            <span className="pl-2">{file.fileName}</span>
                          </td>
                          <td style={{ minWidth: "150px", fontSize: "14px", color: "#888888" }} className="p-2 text-left w-1/4">
                            <span className="pl-2">{file.file_link}</span>
                          </td>

                          <td style={{ minWidth: "135px", fontSize: "14px", color: "#888888" }} className="p-2 text-left w-2/3">
                            <span className="pl-2" >{file.uploaded_at}</span>
                          </td>
                          <td style={{ minWidth: "100px", fontSize: "14px", color: "#888888" }} className="p-2 text-left w-2/3">
                            <span className="pl-2" >{file.fileSize}</span>
                          </td>
                          <td style={{ minWidth: "120px", fontSize: "18px", color: "#888888" }} className="p-2 text-left w-2/3">
                            <span className="pl-2" ><ion-icon name="clipboard-outline"></ion-icon> <ion-icon onClick={() => {
                              axios.delete(host + "/api/files/" + file._id, {
                                headers: {
                                  "Authorization": "Bearer " + window.ssn.token
                                }
                              }).then(res => {
                                if (res.status == 200) {

                                  axios.get(host + "/api/files", {
                                    headers: {
                                      "Authorization": "Bearer " + window.ssn.token
                                    }

                                  }).then(res => {
                                    if (res.status == 200) {
                                      setEvent("File deleted")
                                      account.files = res.data.files
                                      setAccount({ ...account })
                                      setTimeout(() => {
                                        setEvent("")
                                      }, 2000);
                                    }


                                  })
                                }
                              })
                            }} name="trash-outline"></ion-icon></span>
                          </td>
                        </tr>

                      )
                    }) : ""

                  }

                </tbody>
              </table> : <div>
                <p className="text-white text-center mt-3 ">No files uploaded</p>
              </div>}
            </div>

          </div>




        </div>
        {
          showUpload && <div className="main w-80 h-80 sm:w-1/2 sm:1/2 box-border overflow-hidden left-1/2 -ml-40 top-1/2 -mt-40  rounded-md p-5 absolute max-w-2xl bg-primary z-20">
            <div className="flex justify-end text-2xl">
              <ion-icon onClick={() => setUpload(false)} name="close-circle-outline"></ion-icon>
            </div>
            <div style={{ border: "2px dashed #fff" }} className=" w-full h-4/5 flex bg-secondary justify-center items-center p-2 flex-1 mt-5 flex-col gap-3 rounded-sm ">



              {(file.length !== 0) && <>

                {file.map((item, index) => {


                  console.log(file)
                  return <Bar key={index} file={item} fstate={file} setFile={setFile} />

                })}


                <div className="button w-3/5 h-8">
                  <input type="file" name="file" id="file" onChange={handleChange} multiple className={`w-full h-6 ${style.mainFilebutton} `} />
                </div>
              </>
              }

              {(file.length === 0) && <input type="file" name="file" id="file" onChange={handleChange} multiple className={`w-full h-full ${style.mainFile} `} />}

              {(file.length !== 0) && <button onClick={uploadFiles} className="h-6 w-3/5 bg-white rounded text-black">
                Upload
              </button>}

            </div>


          </div>

        }

        {
          event && <div className="absolute bottom-25 w-32 h-8  left-1/2 -ml-16 bg-white">
            <p className="text-black text-center pt-1 pb-1">
              {event}
            </p>
          </div>
        }
      </>
    )
  }
}





class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick () {
    this.setState({show: false})
    this.props.fstate.splice(this.props.fstate.indexOf(this.props.file), 1)
    this.props.setFile(this.props.fstate)
  }

  render() {
    if (this.state.show) {
      return (

      <div className="section flex  h-8 w-full bg-primary items-center justify-between pl-3 pr-3">
        <p>{this.props.file.name}</p><ion-icon onClick={this.handleClick} name="close-circle-outline"></ion-icon>
      </div>
    )
  }
  else {
    return null
  }
  }
}


function Loader(params) {
  return (
    <svg className="sm:max-w-sm" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100" enableBackground="new 0 0 0 0">
      <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite" />
      </path>
    </svg>
  )
}