import './styles.css';
import React, { useRef } from 'react';
import {
  Paper,
  Autocomplete,
  Box,
  Typography,
  Checkbox,
  TextField,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  Conversation,
  ConversationList,
  Sidebar,
  MessageSeparator,
} from '@chatscope/chat-ui-kit-react';
import { getUserConversations } from '../../apis/Message/getUserConversations';
import { getConversationsById } from '../../apis/Message/getConversationById';
import { sendMessageAuthenticated } from '../../apis/Message/sendMessageAuthenticated';
import { createConversationByAuthenticated } from '../../apis/Message/createConverstationByAuthenticate';
import { getAllUserApi1 } from './../../apis/User/getAllUser';
import SearchField from '../../Components/TextField/SearchField';
import { useForm } from 'react-hook-form';
const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

const ChatPage = (props) => {
  const [allUser, setAllUser] = React.useState([]);
  const [managerChoice, setManagerChoice] = React.useState();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [searchTerm, setSearchTerm] = React.useState('');
  const [messageInputValue, setMessageInputValue] = React.useState('');
  const avatarIco =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEUOHCyclYufmI0AECZvbGkAACCjm5AIGCoxOUIAEycAFSgLGisNHCwEFykDFyljY2N9enUlLjkACCKWkIc+Q0lmZmWIhH0bJjN/e3YVIjGSjYRAREpbXF0tND54dXGEgHpKTVFTVVcfARIMAAADVklEQVR4nO3ciXaiMABA0ZA4lhBEcV+r/v9PTtA6FUVGLXOyzLtf4DtktVghAAAAAAAAAAAAAAAAAAAAAABAuIwej9XAuP4Y/4xR5XY+6U11pI1GL4ZrmSQyGaXZIHf9cTqXa7Gt+ipSfqZ64PoTdcuoYjj56js3jtJxRM/RqMUwueo7Ny6nqohjPtr1Zbi+6Ts1JqNpFsGak2eLxr5z4zItAp+PRtfn313jaT66/pTvM2p1N//uGvv7YOdjNf/ant/VWJ3qABsv+/szzmtOWHtHrldP950a7XwM6QxglJk9Mz7rjcvpOJCxWs2/v60vzY37qc78b7R9s1fGZ60xWW58PwMYu7+/Oj5vGr0+A9yer99qrM4AheuSZnZ/n8kf9p0a7RnAyzVHly+vnw8bq/no3faYbd5dX5obe749xNy8s0G0NW6166a6bNttYJJMxq6b6lSv68L+L9dNdRRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FL5Oxl4oR8p1U13XhXJdevb6ZbeFUo5K396E7rJQyvlBfLguutVdoUyWB+PfO9BdFUopZztV+NfXUaHs749KebbCXHTwFrScfKbGs5e7r5iy/7M8uR7ulNe/0Bt//uTHQNXq6evwvMjz+buJMumlYw9Xz1sfi7cS7ePbikB+XJntXk+Uk9FmpT0fnt+K3frFxzeZpdrLze+RbPdKX39+XKmPkPqsLJ0825d82tUlmOH5LZs+k2gf37DMwlhd7mSbJx7f/mBXl8CG5x+5PvzlcCP3UxXi8Pymju17xjys1bOJaj2Ey6O/h+tnGT1s+38taaArzLU8m7Ukpt59P/GGvO0+HEWhMC13qTgKRV48TIykUBgxepAYS6Ew+b45MZpCu2k0XxfjKRRm1ZgYUaEoyqbEmArtjbjhv4FEVdh46Y+rsCkxskKhN7eX/tgKhTrEXmgTZeSFuap/rxFf4e33GjEW1i/9MRbWL/1RFopc9/pxF15/rxFpoR2ol0t/rIX2Rvx16Y+20F4Xz5f+eAvtUzxdFyMuFKaw10Xp2zuHnRqU8/5chf53mVaDxSHqRyiqgRp5IAAAAAAAAAAAAAAAAAAAAAAA/4Hf0gU2cK/EibwAAAAASUVORK5CYII=';
  const [userConversation, setUserConversation] = React.useState([]);
  const [conversationById, setConversationById] = React.useState([]);
  const [conversationId, setConversationId] = React.useState();
  // const [ip, setIP] = React.useState('');
  const [msgInputValue, setMsgInputValue] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [filesImage, setFilesImage] = React.useState([]);
  const [selectedImages, setSelectedImage] = React.useState([]);
  const fileInput = useRef();

  // const [value, setValue] = React.useState('');
  // const getData = async () => {
  //   const res = await axios.get('https://geolocation-db.com/json/');
  //   setIP(res.data.IPv4);
  // };

  // React.useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   getData();
  // }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(valideSchema),
  });
  const handleChangeFile = (e) => {
    setFilesImage(e.target.files);

    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImage((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  React.useEffect(() => {
    (async () => {
      try {
        const listAllConversation = await getUserConversations();
        setUserConversation(listAllConversation.data);
      } catch (error) {
        console.log('Không có dữ liệu của tin nhắn!!');
      }
      try {
        const listAllUser = await getAllUserApi1(0, 200, 'createdAt', false);
        setAllUser(listAllUser.data);
      } catch (error) {
        console.log('Không thể lấy danh sách người dùng');
      }
    })();
    if (conversationId) {
      (async () => {
        try {
          const listConversationById = await getConversationsById(
            conversationId,
            0,
            200,
            'messageId',
            true
          );
          setConversationById(listConversationById.data);
        } catch (error) {
          console.log('Không có dữ liệu của tin nhắn!!');
        }
      })();
    }
  }, [conversationId]);
  const handleGetConversationById = async (conversationId) => {
    try {
      const listConversationById = await getConversationsById(
        conversationId,
        0,
        200,
        'messageId',
        true
      );
      if (listConversationById.data.length > 0) {
        setManagerChoice(undefined);
      }
      setConversationById(listConversationById.data);
      setConversationId(conversationId);
    } catch (error) {
      console.log('Không có dữ liệu của tin nhắn!!');
    }
  };
  console.log(managerChoice);
  const handleSend = (message) => {
    if (conversationId) {
      handleSendMessage(conversationId, message);
      setMsgInputValue('');
    } else {
      handleSendMessage(managerChoice.userId, message);
    }

    // dispatchAction(
    //   getAllMessagesActions.getAllMessages(chatRoomId, page, perPage)
    // );
  };
  const handleSelectUser = async (options) => {
    setManagerChoice(options);
    const listConversationById = await getConversationsById(
      conversationId,
      0,
      200,
      'messageId',
      true
    );
    console.log(listConversationById.data);
    if (listConversationById.data.length > 0) {
      setConversationById(listConversationById.data);
      setConversationId(conversationId);
    } else {
    }
  };
  const handleSendMessage = async (conversationId, message) => {
    try {
      await sendMessageAuthenticated(conversationId, message);

      await handleGetConversationById(conversationId);
    } catch (error) {
      try {
        await createConversationByAuthenticated(conversationId, message);
        await handleGetConversationById(conversationId);
      } catch (error) {
        console.log(error);
      }
    }
  };
  // const handleCreateConversationForAuthenticated = async (
  //   targetUserId,
  //   message
  // ) => {
  //   try {

  //   } catch (error) {}
  // };

  return (
    <Paper
      style={{
        position: 'absolute',
        top: '92px',
        bottom: '32px',
        right: '32px',
        left: '92px',
      }}
      elevation={0}
    >
      <input
        {...register('files')}
        type="file"
        hidden
        ref={fileInput}
        id="files"
        multiple
        onChange={handleChangeFile}
      />
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Autocomplete
            options={allUser}
            disableCloseOnSelect
            getOptionLabel={(option) => option.fullName}
            onChange={(e, option) => handleSelectUser(option)}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  // icon={icon}
                  // checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.fullName}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Tìm kiếm.."
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
          <Box sx={{ padding: '10px' }}>{/* <SearchField /> */}</Box>
          <ConversationList>
            {!managerChoice ? (
              userConversation.length > 0 ? (
                userConversation.map((userConver, index) => (
                  <Conversation
                    name={userConver.name}
                    lastSenderName={userConver.name}
                    info={userConver.lastMessage}
                    onClick={() =>
                      handleGetConversationById(userConver.conversationId)
                    }
                  >
                    <Avatar src={userConver.avatar} />
                  </Conversation>
                ))
              ) : (
                <></>
              )
            ) : (
              <Conversation
                name={managerChoice.username}
                lastSenderName={managerChoice.username}
                info={managerChoice.lastMessage}
                onClick={() => handleGetConversationById(managerChoice.userId)}
              >
                <Avatar src="#" />
              </Conversation>
            )}
          </ConversationList>
        </Sidebar>
        <ChatContainer>
          <MessageList>
            {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
            {!managerChoice || conversationById.length !== 0 ? (
              conversationById.length > 0 ? (
                conversationById.map((m) => (
                  <Message
                    key={m.senderId}
                    model={{
                      message: m.message,
                      sentTime: '15 mins ago',
                      // sender: 'Zoe',
                      direction:
                        m.senderId === userInfor.id ? 'outgoing' : 'incoming',
                    }}
                  ></Message>
                ))
              ) : (
                <div>Bắt đầu cuộc trò chuyện với </div>
              )
            ) : (
              <div>Bắt đầu cuộc trò chuyện với </div>
            )}
          </MessageList>
          {/* <div
            as={MessageInput}
            style={{
              display: 'flex',
              flexDirection: 'row',
              borderTop: '1px dashed #d1dbe4',
            }}
          > */}
          <MessageInput
            placeholder="Nhập tin nhắn của bạn.."
            onSend={handleSend}
            onChange={setMsgInputValue}
            value={msgInputValue}
            onAttachClick={() => {
              fileInput.current.click();
            }}
          />
          <input
            {...register('files')}
            type="file"
            hidden
            ref={fileInput}
            id="files"
            multiple
            onChange={handleChangeFile}
          />
          <div className="label-holder">
            <label htmlFor="file" className="img-upload"></label>
          </div>
          {/* </div> */}
        </ChatContainer>
      </MainContainer>
    </Paper>
  );
};
export default ChatPage;
