import { createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";


export const ChatContext = createContext();


export const ChatProvider = ()=> {

    const [messages, setMessages] = useState([]);   //messages of a user
    const [users, setUsers] = useState([]); //all users?
    const [selectedUser, setSelectedUser] = useState(null); //store Id of user to check
    const [unseenMessages, setUnseenMessages] = useState({}); //Store id (key) against no.of unseen messages (value)

    const {socket, axios} = useContext(AuthContext);

    //function to get all users for sidebars
    const getUsers = async()=> {
        try{
           const {data} = await axios.get("/api/messages/users");
           if(data.success){
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages)
           }
        }catch(error){
            toast.error(error.message);
        }
    }

    // function to get messages of selected user
    const getMessages = async(userId)=>{
        try{
            const {data} = await axios.get(`api/messages/${userId}`);
            if(data.success){
                setMessages(data.messages);
            }
        }catch(error){
            toast.error(error.message);
        }
    }

    // Function to send message to selected user
    const sendMessage = async(messageData) => {
        try{
            const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);

            if(data.success){
                setMessages((prevMessages)=> [...prevMessages, data.newMessage])
            }else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error(error.message);
        }
    }

    // Function to subscribe to messages for selected user (get real time messages from selected user)
    const subscribeToMessages = async ()=> {
        if(!socket) return; //if our user is not online then return
        
        socket.on("newMessage", (newMessage)=> {
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                setMessages((prevMessages)=> [...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }else{  //if user gets a message not from selected user but from other user...
                setUnseenMessages((prevUnseenMessages)=> ({
                    ...prevUnseenMessages, [newMessage.senderId] : prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
                }));
            }
        })
    }

    // Function to unsubscribe from messages
    const unsubscribeFromMessages = () => {
        if(socket) socket.off("newMessage");
    }

    useEffect(()=> {
        subscribeToMessages();
        return ()=> unsubscribeFromMessages();
    }, [socket, selectedUser])

    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages
    }

    return (
    <ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>
    )
}