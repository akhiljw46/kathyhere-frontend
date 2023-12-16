import ChatContainer from './components/chat/ChatContainer';
import InputContainer from './components/input/InputContainer';
import Header from './components/layout/Header';

import classes from './App.module.css';
import Footer from './components/layout/Footer';
import MessageProvider from './components/utils/MessageProvider';

function App() {
  return (
    <div className={classes.app}>
      <Header />
      <MessageProvider>
        <ChatContainer />
        <InputContainer />
      </MessageProvider>
      <Footer />
    </div>
  );
}

export default App;
