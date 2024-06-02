import { useCallback, useEffect, useState } from 'react';
import Talk from 'talkjs';
import { Session, Inbox, Chatbox } from '@talkjs/react';
import { useParams } from 'react-router';
import customerAPI from '../api/customer';
import { useMutation } from '@tanstack/react-query';
import '../../public/css/index.css';

export function Chat() {
  const [newCustomer, setNewCustomer] = useState({});
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const { isPending: surveyReportLoading, mutate: mutateSurveyId } = useMutation({
    mutationFn: () => customerAPI.getCustomerbyId(id),
    onSuccess: (response) => {
      setNewCustomer(response);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get package list',
      });
    },
  });

  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: user?.id,
        name: user?.fullName,
        email: user?.email,
        photoUrl: user?.avatar ? user?.avatar : 'https://talkjs.com/new-web/avatar-7.jpg',
        welcomeMessage: 'Hi!',
      }),
    []
  );

  const syncConversation = useCallback(
    (session) => {
      const newId = localStorage.getItem('id');
      const name = localStorage.getItem('fullname');
      const email = localStorage.getItem('email');
      const avatar = localStorage.getItem('avatar');
      if (!newCustomer) {
        return; // Exit function if newCustomer is not available
      }
      const other = new Talk.User({
        id: newId,
        name: name,
        email: email,
        photoUrl: avatar ? avatar : 'https://talkjs.com/new-web/avatar-7.jpg',
      });

      const conversation = session.getOrCreateConversation(
        Talk.oneOnOneId('959b6a80-9bb6-4ffb-86ac-0f5221471616', other?.id)
      );

      conversation.setParticipant(session.me);
      conversation.setParticipant(other);

      return conversation;
    },
    [newCustomer]
  );

  useEffect(() => {
    if (id) {
      mutateSurveyId(id);
    }
  }, [id]);

  return (
    <div className="chat-container">
    <Session appId='trYfckWX' syncUser={syncUser}>
      
      <Inbox
        syncConversation={syncConversation}
        style={{ width: '100%', height: '100%' }}
      />
    </Session>
  </div>
  );
}

export default Chat;