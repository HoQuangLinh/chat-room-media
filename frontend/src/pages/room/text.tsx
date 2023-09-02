// import LoadIcon from '@/images/loading.gif'

// import { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom'

// import MsgDisplay from './MsgDisplay'
// import { useRootSelector } from '../../redux/reducers'
// import { messageService } from '../../services/message.service'

// const Room = () => {
//   const rootSelector = useRootSelector((state) => state)

//   const dispatch = useDispatch()

//   const { roomId } = useParams()
//   const [user, setUser] = useState([])
//   const [text, setText] = useState('')
//   const [media, setMedia] = useState([])
//   const [loadMedia, setLoadMedia] = useState(false)

//   const refDisplay = useRef<any>()
//   const pageEnd = useRef()

//   const [data, setData] = useState([])
//   const [result, setResult] = useState(9)
//   const [page, setPage] = useState(0)
//   const [isLoadMore, setIsLoadMore] = useState(0)

//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!roomId) {
//       return
//     }
//     messageService.getMessageByRoomId(roomId).then((messages) => {
//       console.log(messages)
//     })
//   }, [roomId])

//   // const handleChangeMedia = (e) => {
//   //   const files = [...e.target.files];
//   //   let err = "";
//   //   let newMedia = [];

//   //   files.forEach((file) => {
//   //     if (!file) return (err = "File does not exist.");

//   //     if (file.size > 1024 * 1024 * 5) {
//   //       return (err = "The image/video largest is 5mb.");
//   //     }

//   //     return newMedia.push(file);
//   //   });

//   //   if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
//   //   setMedia([...media, ...newMedia]);
//   // };

//   // const handleDeleteMedia = (index) => {
//   //   const newArr = [...media];
//   //   newArr.splice(index, 1);
//   //   setMedia(newArr);
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!text.trim() && media.length === 0) return
//     setText('')
//     setMedia([])
//     setLoadMedia(true)

//     let newArr = []
//     //if (media.length > 0) newArr = await imageUpload(media)

//     // const msg = {
//     //   sender: auth.user._id,
//     //   recipient: id,
//     //   text,
//     //   media: newArr,
//     //   createdAt: new Date().toISOString()
//     // }

//     setLoadMedia(false)
//     await dispatch(addMessage({ msg, auth, socket }))
//     if (refDisplay.current) {
//       refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
//     }
//   }

//   useEffect(() => {
//     const getMessagesData = async () => {
//       if (message.data.every((item) => item._id !== id)) {
//         await dispatch(getMessages({ auth, id }))
//         setTimeout(() => {
//           if (refDisplay.current) {
//             refDisplay.current.scrollIntoView({
//               behavior: 'smooth',
//               block: 'end'
//             })
//           }
//         }, 50)
//       }
//     }
//     getMessagesData()
//   }, [id, dispatch, auth, message.data])

//   useEffect(() => {
//     if (isLoadMore > 1) {
//       if (result >= page * 9) {
//         dispatch(loadMoreMessages({ auth, id, page: page + 1 }))
//         setIsLoadMore(1)
//       }
//     }
//   }, [isLoadMore])

//   const handleDeleteConversation = () => {
//     if (window.confirm('Do you want to delete?')) {
//       dispatch(deleteConversation({ auth, id }))
//       return navigate('/message')
//     }
//   }

//   // Call
//   const caller = ({ video }) => {
//     const { _id, avatar, username, fullname } = user

//     const msg = {
//       sender: auth.user._id,
//       recipient: _id,
//       avatar,
//       username,
//       fullname,
//       video
//     }
//     dispatch({ type: GLOBALTYPES.CALL, payload: msg })
//   }

//   const callUser = ({ video }) => {
//     const { _id, avatar, username, fullname } = auth.user

//     const msg = {
//       sender: _id,
//       recipient: user._id,
//       avatar,
//       username,
//       fullname,
//       video
//     }

//     if (peer.open) msg.peerId = peer._id

//     socket.emit('callUser', msg)
//   }

//   const handleAudioCall = () => {
//     caller({ video: false })
//     callUser({ video: false })
//   }

//   const handleVideoCall = () => {
//     caller({ video: true })
//     callUser({ video: true })
//   }

//   return (
//     <>
//       <div
//         className='message_header'
//         style={{
//           cursor: 'pointer',
//           boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
//         }}
//       >
//         {user.length !== 0 && (
//           <UserCard user={user}>
//             <div className='flex'>
//               <i className='fas fa-phone-alt' onClick={handleAudioCall} />

//               <i className='fas fa-video mx-3' onClick={handleVideoCall} />
//               <i
//                 className='fas fa-trash'
//                 style={{ color: 'var(--danger-bg)' }}
//                 onClick={handleDeleteConversation}
//               />
//             </div>
//           </UserCard>
//         )}
//       </div>

//       <div
//         className='chat_container'
//         style={{ height: media.length > 0 ? 'calc(100% - 180px)' : '' }}
//       >
//         <div className='chat_display' ref={refDisplay}>
//           <button style={{ marginTop: '-25px', opacity: 0 }} ref={pageEnd}>
//             Load more
//           </button>

//           {data.map((msg, index) => (
//             <div key={index}>
//               {msg.sender !== auth.user._id && (
//                 <div className='chat_row other_message'>
//                   <MsgDisplay user={user} msg={msg} theme={theme} />
//                 </div>
//               )}

//               {msg.sender === auth.user._id && (
//                 <div className='chat_row you_message'>
//                   <MsgDisplay
//                     user={auth.user}
//                     msg={msg}
//                     theme={theme}
//                     data={data}
//                   />
//                 </div>
//               )}
//             </div>
//           ))}

//           {loadMedia && (
//             <div className='chat_row you_message'>
//               <img src={LoadIcon} alt='loading' />
//             </div>
//           )}
//         </div>
//       </div>

//       <div
//         className='show_media'
//         style={{ display: media.length > 0 ? 'grid' : 'none' }}
//       >
//         {media.map((item, index) => (
//           <div key={index} id='file_media'>
//             {item.type.match(/video/i)
//               ? videoShow(URL.createObjectURL(item), theme)
//               : imageShow(URL.createObjectURL(item), theme)}
//             <span onClick={() => handleDeleteMedia(index)}>&times;</span>
//           </div>
//         ))}
//       </div>

//       <form className='chat_input' onSubmit={handleSubmit}>
//         <input
//           type='text'
//           placeholder='Nhập tin nhắn...'
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />

//         <div className='file_upload'>
//           <i className='fas fa-image text-red-500' />
//           <input
//             type='file'
//             name='file'
//             id='file'
//             multiple
//             accept='image/*'
//             onChange={handleChangeMedia}
//           />
//         </div>

//         <button
//           type='submit'
//           className='material-icons'
//           disabled={text || media.length > 0 ? false : true}
//         >
//           send
//         </button>
//       </form>
//     </>
//   )
// }

// export default Room

import React from 'react'

const text = () => {
  return <div>text</div>
}

export default text
